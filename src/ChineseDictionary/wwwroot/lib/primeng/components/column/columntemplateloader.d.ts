import { ViewContainerRef } from '@angular/core';
export declare class ColumnTemplateLoader {
    private viewContainer;
    column: any;
    rowData: any;
    rowIndex: number;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
