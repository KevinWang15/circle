import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
export declare class FroalaEditorDirective implements ControlValueAccessor {
    private _opts;
    private _$element;
    private SPECIAL_TAGS;
    private INNER_HTML_ATTR;
    private _hasSpecialTag;
    private _editor;
    private _model;
    private _listeningEvents;
    private _editorInitialized;
    private _oldModel;
    constructor(el: ElementRef);
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(content: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    froalaEditor: any;
    froalaModel: any;
    private updateEditor(content);
    froalaModelChange: EventEmitter<any>;
    froalaInit: EventEmitter<Object>;
    private updateModel();
    private registerEvent(element, eventName, callback);
    private initListeners();
    private registerFroalaEvents();
    private createEditor();
    private setHtml();
    private setContent(firstTime?);
    private destroyEditor();
    private getEditor();
    private generateManualController();
    ngOnInit(): void;
    ngOnDestroy(): void;
}
