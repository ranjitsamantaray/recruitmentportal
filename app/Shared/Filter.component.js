"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterComponent = (function () {
    function FilterComponent() {
    }
    FilterComponent.prototype.transform = function (values, args) {
        if (typeof values == 'object') {
            var result = [];
            var temp = [];
        }
        var array = [];
        var candidate = [1];
        if (args[0] == null && args[1] == null && args[2] == "None" && args[3] == "None" &&
            args[4] == "None" && args[5] == "None" && args[6] == "None" && args[7] == "None") {
            return values;
        }
        else {
            for (var i = 0; i < args.length; i++) {
                if (args[i] != 'None')
                    if (args[i] != '' && args[i] != null)
                        array.push(i + 1);
            }
            if (array.length >= 1) {
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    result.push(value);
                }
            }
            for (var i = 0; i < array.length; i++) {
                temp = [];
                if (result != undefined)
                    for (var _a = 0, result_1 = result; _a < result_1.length; _a++) {
                        var res = result_1[_a];
                        if (res.Skill != undefined)
                            switch (array[i]) {
                                case 1:
                                    if (args[0] != null)
                                        if (res.Registration_date.match(args[0])) {
                                            temp.push(res);
                                        }
                                    break;
                                case 2:
                                    if (args[1] != null) {
                                        if (res.Name.toUpperCase().indexOf(args[1].toUpperCase()) != -1) {
                                            temp.push(res);
                                        }
                                    }
                                    break;
                                case 3:
                                    if (args[2] != "None") {
                                        if (args[2] == "< 3 years" && res.Experience <= 3)
                                            temp.push(res);
                                        else if (args[2] == "4-6 years" && (res.Experience >= 4 && res.Experience <= 6))
                                            temp.push(res);
                                        else if (args[2] == "6-10 years" && (res.Experience >= 6 && res.Experience <= 10))
                                            temp.push(res);
                                        else if (args[2] == "10-15 years" && (res.Experience >= 10 && res.Experience <= 15))
                                            temp.push(res);
                                        else if (args[2] == "> 15 Years" && res.Experience >= 15)
                                            temp.push(res);
                                    }
                                    break;
                                case 4:
                                    if (args[3] != "None")
                                        if (res.Skill.match(args[3])) {
                                            temp.push(res);
                                        }
                                    break;
                                case 5:
                                    if (args[4] != "None")
                                        switch (args[4]) {
                                            case 'Evaluate':
                                                if (res.Status == "Test Completed")
                                                    temp.push(res);
                                                break;
                                            case '< 20%':
                                                if ((res.Skill == '.Net' && res.Score != null && res.Score <= 4)
                                                    || ((res.Skill == 'UI' || res.Skill == 'Mainframe') && res.Score != null && res.Score <= 6))
                                                    temp.push(res);
                                                break;
                                            case '20%-50%':
                                                if ((res.Skill == '.Net' && res.Score >= 4 && res.Score <= 10)
                                                    || ((res.Skill == 'UI' || res.Skill == 'Mainframe') && res.Score >= 6 && res.Score <= 15))
                                                    temp.push(res);
                                                break;
                                            case '50%-80%':
                                                if ((res.Skill == '.Net' && res.Score >= 10 && res.Score <= 16)
                                                    || ((res.Skill == 'UI' || res.Skill == 'Mainframe') && res.Score >= 15 && res.Score <= 24))
                                                    temp.push(res);
                                                break;
                                            case '> 80%':
                                                if ((res.Skill == '.Net' && res.Score >= 16)
                                                    || ((res.Skill == 'UI' || res.Skill == 'Mainframe') && res.Score >= 24))
                                                    temp.push(res);
                                                break;
                                        }
                                    break;
                                case 6:
                                    if (args[5] != "None")
                                        if (res.Consultancy.match(args[5])) {
                                            temp.push(res);
                                        }
                                    break;
                                case 7:
                                    if (args[6] != "None")
                                        if (args[6] != "None") {
                                            if (args[6] == "< 50" && res.LogikScore <= 50)
                                                temp.push(res);
                                            else if (args[2] == "50-70" && (res.Experience >= 50 && res.Experience <= 70))
                                                temp.push(res);
                                            else if (args[2] == "> 70" && res.Experience >= 70)
                                                temp.push(res);
                                        }
                                    break;
                                case 8:
                                    if (args[7] != "None")
                                        if (res.Status.match(args[7])) {
                                            temp.push(res);
                                        }
                                    break;
                            }
                    }
                if (temp.length > 0) {
                    result = [];
                    for (var _b = 0, temp_1 = temp; _b < temp_1.length; _b++) {
                        var t = temp_1[_b];
                        result.push(t);
                    }
                }
                else {
                    result = [];
                    result.push(candidate);
                }
                if (i == array.length - 1)
                    return result;
            }
        }
    };
    return FilterComponent;
}());
FilterComponent = __decorate([
    core_1.Pipe({
        name: 'resultFilter'
    })
], FilterComponent);
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=Filter.component.js.map