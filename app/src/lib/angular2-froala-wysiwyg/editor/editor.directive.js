import { Directive, ElementRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
export var FroalaEditorDirective = (function () {
  function FroalaEditorDirective(el) {
    // editor options
    this._opts = {
      theme: 'gray',
      language: "zh_cn",
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphFormat', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'color', 'underline', '|', 'undo', 'redo', 'align'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'color', 'underline', '|', 'undo', 'redo', 'align'],
      pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'entities', 'file', 'fontSize', 'fullscreen', 'image', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'save', 'table', 'url', 'wordPaste'],
      quickInsertButtons: false,
      immediateAngularModelUpdate: true,
      angularIgnoreAttrs: null,
      imageUploadDomain: "http://psfiles.panopath.com/",
      imageUploadParam: 'file',
      imageUploadURL: 'http://up.qbox.me',
      imageUploadParams: {},
      imageUploadMethod: 'POST',
      imageMaxSize: 25 * 1024 * 1024,
      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'bmp'],
      fileUploadDomain: "http://psfiles.panopath.com/",
      fileUploadParam: 'file',
      fileUploadURL: 'http://up.qbox.me',
      fileUploadParams: {},
      fileUploadMethod: 'POST',
      fileMaxSize: 200 * 1024 * 1024,
      fileAllowedTypes: ['*'],

    };
    this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
    this.INNER_HTML_ATTR = 'innerHTML';
    this._hasSpecialTag = false;
    this._listeningEvents = [];
    this._editorInitialized = false;
    this._oldModel = null;
    // Begin ControlValueAccesor methods.
    this.onChange = function (_) {
    };
    this.onTouched = function () {
    };
    // froalaModel directive as output: update model if editor contentChanged
    this.froalaModelChange = new EventEmitter();
    // froalaInit directive as output: send manual editor initialization
    this.froalaInit = new EventEmitter();
    var element = el.nativeElement;
    // check if the element is a special tag
    if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
      this._hasSpecialTag = true;
    }
    // jquery wrap and store element
    this._$element = $(element);
    element.classList.add("fr-load-pending");
    setTimeout(function () {
      var elements = $('div > a', element);
      $.each(elements, function (_, ele) {
        if (ele.innerHTML == "Unlicensed Froala Editor") {
          ele.parentElement.removeChild(ele);
          element.classList.remove("fr-load-pending");
        }
      });
    });
  }

  // Form model content changed.
  FroalaEditorDirective.prototype.writeValue = function (content) {
    this.updateEditor(content);
  };
  FroalaEditorDirective.prototype.registerOnChange = function (fn) {
    this.onChange = fn;
  };
  FroalaEditorDirective.prototype.registerOnTouched = function (fn) {
    this.onTouched = fn;
  };
  Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
    // End ControlValueAccesor methods.
    // froalaEditor directive as input: store the editor options
    set: function (opts) {
      this._opts = opts || this._opts;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
    // froalaModel directive as input: store initial editor content
    set: function (content) {
      this.updateEditor(content);
    },
    enumerable: true,
    configurable: true,
  });
  // Update editor with model contents.
  FroalaEditorDirective.prototype.updateEditor = function (content) {
    if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
      return;
    }
    this._model = content;
    if (this._editorInitialized) {
      this.setContent();
    }
  };
  // update model if editor contentChanged
  FroalaEditorDirective.prototype.updateModel = function () {
    var modelContent = null;
    if (this._hasSpecialTag) {
      var attributeNodes = this._$element[0].attributes;
      var attrs = {};
      for (var i = 0; i < attributeNodes.length; i++) {
        var attrName = attributeNodes[i].name;
        if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }
      if (this._$element[0].innerHTML) {
        attrs[this.INNER_HTML_ATTR] = this._$element[0].innerHTML;
      }
      modelContent = attrs;
    }
    else {
      var returnedHtml = this._$element.froalaEditor('html.get');
      if (typeof returnedHtml === 'string') {
        modelContent = returnedHtml;
      }
    }
    this._oldModel = modelContent;
    // Update froalaModel.
    this.froalaModelChange.emit(modelContent);
    // Update form model.
    this.onChange(modelContent);
  };
  // register event on jquery element
  FroalaEditorDirective.prototype.registerEvent = function (element, eventName, callback) {
    if (!element || !eventName || !callback) {
      return;
    }
    this._listeningEvents.push(eventName);
    element.on(eventName, callback);
  };
  FroalaEditorDirective.prototype.initListeners = function () {
    var self = this;
    // bind contentChange and keyup event to froalaModel
    this.registerEvent(this._$element, 'froalaEditor.contentChanged', function () {
      setTimeout(function () {
        self.updateModel();
      }, 0);
    });
    if (this._opts.immediateAngularModelUpdate) {
      this.registerEvent(this._editor, 'keyup', function () {
        setTimeout(function () {
          self.updateModel();
        }, 0);
      });
    }
  };
  // register events from editor options
  FroalaEditorDirective.prototype.registerFroalaEvents = function () {
    if (!this._opts.events) {
      return;
    }
    for (var eventName in this._opts.events) {
      if (this._opts.events.hasOwnProperty(eventName)) {
        this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
      }
    }
  };
  FroalaEditorDirective.prototype.createEditor = function () {
    if (this._editorInitialized) {
      return;
    }
    this.setContent(true);
    // Registering events before initializing the editor will bind the initialized event correctly.
    this.registerFroalaEvents();
    // init editor
    this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;
    this.initListeners();
    this._editorInitialized = true;
  };
  FroalaEditorDirective.prototype.setHtml = function () {
    this._$element.froalaEditor('html.set', this._model || '', true);
    //This will reset the undo stack everytime the model changes externally. Can we fix this?
    this._$element.froalaEditor('undo.reset');
    this._$element.froalaEditor('undo.saveStep');
  };
  FroalaEditorDirective.prototype.setContent = function (firstTime) {
    if (firstTime === void 0) {
      firstTime = false;
    }
    var self = this;
    // set initial content
    if (this._model || this._model == '') {
      this._oldModel = this._model;
      if (this._hasSpecialTag) {
        var tags = this._model;
        // add tags on element
        if (tags) {
          for (var attr in tags) {
            if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
              this._$element.attr(attr, tags[attr]);
            }
          }
          if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
            this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
          }
        }
      }
      else {
        if (firstTime) {
          this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
            self.setHtml();
          });
        }
        else {
          self.setHtml();
        }
      }
    }
  };
  FroalaEditorDirective.prototype.destroyEditor = function () {
    if (this._editorInitialized) {
      this._$element.off(this._listeningEvents.join(" "));
      this._editor.off('keyup');
      this._$element.froalaEditor('destroy');
      this._listeningEvents.length = 0;
      this._editorInitialized = false;
    }
  };
  FroalaEditorDirective.prototype.getEditor = function () {
    if (this._$element) {
      return this._$element.froalaEditor.bind(this._$element);
    }
    return null;
  };
  // send manual editor initialization
  FroalaEditorDirective.prototype.generateManualController = function () {
    var self = this;
    var controls = {
      initialize: this.createEditor.bind(this),
      destroy: this.destroyEditor.bind(this),
      getEditor: this.getEditor.bind(this),
    };
    this.froalaInit.emit(controls);
  };
  // TODO not sure if ngOnInit is executed after @inputs
  FroalaEditorDirective.prototype.ngOnInit = function () {
    // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
    if (!this.froalaInit.observers.length) {
      this.createEditor();
    }
    else {
      this.generateManualController();
    }
  };
  FroalaEditorDirective.prototype.ngOnDestroy = function () {
    this.destroyEditor();
  };
  FroalaEditorDirective.decorators = [
    {
      type: Directive, args: [{
      selector: '[froalaEditor]',
      providers: [{
        provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () {
          return FroalaEditorDirective;
        }),
        multi: true,
      }],
    },],
    },
  ];
  /** @nocollapse */
  FroalaEditorDirective.ctorParameters = function () {
    return [
      { type: ElementRef, },
    ];
  };
  FroalaEditorDirective.propDecorators = {
    'froalaEditor': [{ type: Input },],
    'froalaModel': [{ type: Input },],
    'froalaModelChange': [{ type: Output },],
    'froalaInit': [{ type: Output },],
  };
  return FroalaEditorDirective;
}());
//# sourceMappingURL=editor.directive.js.map
