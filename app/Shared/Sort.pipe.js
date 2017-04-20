"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SortComponent = (function () {
    function SortComponent() {
    }
    SortComponent.prototype.transform = function (values) {
        values.sort(function (a, b) {
            a = new Date(a.Registration_date);
            b = new Date(b.Registration_date);
            return a - b;
        });
        return values;
    };
    return SortComponent;
}());
SortComponent = __decorate([
    core_1.Pipe({
        name: 'sort'
    })
], SortComponent);
exports.SortComponent = SortComponent;
//# sourceMappingURL=Sort.pipe.js.map