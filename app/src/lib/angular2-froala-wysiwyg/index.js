import { NgModule } from '@angular/core';
import { FroalaEditorModule } from './editor';
export { FroalaEditorDirective, FroalaEditorModule } from './editor';
var MODULES = [
    FroalaEditorModule
];
export var FERootModule = (function () {
    function FERootModule() {
    }
    FERootModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FroalaEditorModule.forRoot(),
                    ],
                    exports: MODULES
                },] },
    ];
    /** @nocollapse */
    FERootModule.ctorParameters = function () { return []; };
    return FERootModule;
}());
//# sourceMappingURL=index.js.map
