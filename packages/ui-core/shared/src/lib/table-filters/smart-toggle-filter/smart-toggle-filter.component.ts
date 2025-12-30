import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'angular2-smart-table';
import { faCheck, faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToggleFilterConfig } from '@gauzy/contracts';

@Component({
	selector: 'ga-smart-toggle-filter',
	templateUrl: './smart-toggle-filter.component.html',
	styleUrls: ['./smart-toggle-filter.component.scss'],
	standalone: false
})
export class SmartToggleFilterComponent extends DefaultFilter implements OnInit, OnChanges {
	faCheck = faCheck;
	faBan = faBan;
	faTimes = faTimes;
	choice: 'accept' | 'deny' | null = null;
	private config: ToggleFilterConfig;

	ngOnInit(): void {
		this.config = this.column?.filter?.config as ToggleFilterConfig;

		if (this.config?.initialChoice !== undefined) {
			this.choice = this.config.initialChoice;
		}
	}

	onChange(): void {
		let value = null;

		switch (this.choice) {
			case 'accept':
				value = this.config?.acceptValue ?? true;
				break;
			case 'deny':
				value = this.config?.denyValue ?? false;
				break;
			default:
				value = null;
		}

		this.column.filterFunction(value, this.column.id);
	}

	ngOnChanges(changes: SimpleChanges): void {
		// Required for angular2-smart-table, even if unused
	}
}
