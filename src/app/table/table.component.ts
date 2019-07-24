import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ImGrouping } from '../result.model';

@Component({
	selector: 'og-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableComponent {
	@Input() data: ImGrouping[];

	// calculate the maximum value from the table(rows and subrows) for the progress bar
	maxValue = (): number => {
		return Math.max.apply(
			Math,
			this.data.reduce((total, currentValue) => {
				return total.concat(
					currentValue.imValue.price,
					currentValue.children.reduce((total, currentValue) => {
						return total.concat(currentValue.imValue.price);
					}, [])
				);
			}, [])
		);
	};
}
