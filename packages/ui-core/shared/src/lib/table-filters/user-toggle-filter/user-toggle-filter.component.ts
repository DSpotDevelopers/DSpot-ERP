import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'angular2-smart-table';
import { faCheck, faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CustomFilterConfig, StatusFilterValue } from '@gauzy/contracts';

@Component({
	selector: 'ga-user-toggle-filter',
	templateUrl: './user-toggle-filter.component.html',
	styleUrls: ['./user-toggle-filter.component.scss'],
	standalone: false
})
export class UserToggleFilterComponent extends DefaultFilter implements OnInit, OnChanges {
	faCheck = faCheck;
	faBan = faBan;
	faTimes = faTimes;
	choice: string | null;

	constructor() {
		super();
		this._isChecked = false;
	}

	ngOnInit(): void {
		const config = this.column?.filter?.config as CustomFilterConfig;
		if (config?.initialValueToggle) {
			this.choice = config.initialValueToggle.isActive
				? 'accept'
				: config.initialValueToggle.isArchived
				? 'deny'
				: null;
		}
	}

	private _isChecked: boolean;

	get isChecked(): boolean {
		return this._isChecked;
	}

	set isChecked(value: boolean) {
		this._isChecked = value;
	}

	public onChange() {
		let value: StatusFilterValue = null;

		switch (this.choice) {
			case 'accept':
				value = {
					isActive: true,
					isArchived: false
				};
				break;

			case 'deny':
				value = {
					isActive: false,
					isArchived: true
				};
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
