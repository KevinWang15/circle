import { NgModule } from '@angular/core';
import { FroalaEditorDirective } from './editor.directive';
export var FroalaEditorModule = (function () {
    function FroalaEditorModule() {
    }
    FroalaEditorModule.forRoot = function () {
        return { ngModule: FroalaEditorModule, providers: [] };
    };
    FroalaEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FroalaEditorDirective],
                    exports: [FroalaEditorDirective]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorModule.ctorParameters = function () { return []; };
    return FroalaEditorModule;
}());
//# sourceMappingURL=editor.module.js.map