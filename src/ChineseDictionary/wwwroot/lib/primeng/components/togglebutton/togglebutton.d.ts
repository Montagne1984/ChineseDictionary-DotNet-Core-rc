import { EventEmitter } from 'angular2/core';
export declare class ToggleButton {
    onLabel: string;
    offLabel: string;
    onIcon: string;
    offIcon: string;
    checked: boolean;
    disabled: boolean;
    style: string;
    styleClass: string;
    onChange: EventEmitter<any>;
    checkedChange: EventEmitter<any>;
    private hover;
    getIconClass(): string;
    toggle(event: any): void;
}
