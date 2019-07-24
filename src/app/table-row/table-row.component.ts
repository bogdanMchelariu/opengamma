import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ImGrouping } from '../result.model';

@Component({
	selector: 'og-table-row',
	templateUrl: './table-row.component.html',
	styleUrls: ['./table-row.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableRowComponent {
	@Input() row: ImGrouping;
	@Input() maxValue: number;
	// I am reusing the same progress-bar component for the IM % of Total
	@Input() type: 'row' | 'subrow' = 'row';
	showSubrow = false;
}
