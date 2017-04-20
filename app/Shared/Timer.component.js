"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
//import {TestComponent} from '../test/test.component';
var TimerComponent = (function () {
    function TimerComponent() {
        this.done = new core_1.EventEmitter();
        this.name = 'Angular';
        this.count = 1;
        this.hh = '00';
        this.mm = 59;
        this.mm2 = 60;
        this.ss = 59;
        this.ss2 = 60;
        this.ticks = 0;
    }
    TimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = Rx_1.Observable.timer(0, 1000);
        this.subscription = timer.subscribe(function (t) { _this.send(t); });
        //this.send(this.ticks);
    };
    //this.ss=this.ss-this.ticks;
    TimerComponent.prototype.send = function (n) {
        this.ss = this.ss2 - n;
        if (this.ss == 0) {
            this.count += 1;
            this.ss2 = 60 * this.count;
            if (this.mm == 5 && this.ss == 0)
                alert("you have only 5 minutes left");
            this.mm = this.mm2 - this.count;
            if (this.mm == 0) {
                this.done.next();
                this.ngOnDestroy();
            }
        }
    };
    TimerComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return TimerComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimerComponent.prototype, "done", void 0);
TimerComponent = __decorate([
    core_1.Component({
        selector: 'my-timer',
        template: "\n        {{mm}}:{{ss}}\n             ",
    })
], TimerComponent);
exports.TimerComponent = TimerComponent;
//# sourceMappingURL=Timer.component.js.map