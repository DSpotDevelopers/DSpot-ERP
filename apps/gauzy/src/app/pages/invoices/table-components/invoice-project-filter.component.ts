import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { DefaultFilter } from 'angular2-smart-table';

@UntilDestroy({ checkProperties: true })
@Component({
	template: `
		<input
			nbInput
			fullWidth
			placeholder="{{ 'INVOICES_PAGE.INVOICE_ITEM.PROJECT' | translate }}"
			[(ngModel)]="query"
			(ngModelChange)="applyFilter($event)"
		/>
	`,
	styles: [],
	standalone: true,
	imports: [FormsModule, TranslateModule]
})
export class InvoiceProjectFilterComponent extends DefaultFilter implements OnChanges {
	@Input() query: string;

	ngOnChanges() {
		// smart table require OnChanges
	}
	applyFilter(value: string) {
		this.query = value;
		this.setFilter();
	}
}
