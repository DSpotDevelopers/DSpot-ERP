import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'angular2-smart-table';
import { CustomFilterConfig, RolesEnum } from '@gauzy/contracts';

@Component({
	selector: 'ga-role-filter',
	template: `
		<ng-select
			[items]="roles"
			bindLabel="display"
			bindValue="value"
			[searchable]="false"
			[clearable]="true"
			[ngModel]="selectedRole"
			placeholder="{{ 'FORM.LABELS.ROLE' | translate }}"
			appendTo="body"
			(change)="onChange($event)"
		>
		</ng-select>
	`,
	standalone: false
})
export class UserRoleFilterComponent extends DefaultFilter implements OnInit, OnChanges {
	roles: { value: string; display: string }[] = [];
	selectedRole: string | null = null;

	ngOnInit(): void {
		this.roles = Object.values(RolesEnum).map((role) => ({
			value: role,
			display: role.replace('_', ' ')
		}));

		const config = this.column?.filter?.config as CustomFilterConfig;
		if (config?.initialValueInput) {
			this.selectedRole = config.initialValueInput;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		// Required for angular2-smart-table, even if unused
	}

	onChange(event: any): void {
		const value = event?.value ?? null;
		this.selectedRole = value;
		this.column.filterFunction(value, this.column.id);
	}
}
