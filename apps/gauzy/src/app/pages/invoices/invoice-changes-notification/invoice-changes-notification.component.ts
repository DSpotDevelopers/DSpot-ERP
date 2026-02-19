import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { TranslationBaseComponent } from '@gauzy/ui-core/i18n';
import { ToastrService } from '@gauzy/ui-core/core';

export interface IInvoiceFieldChange {
	field: string;
	label: string;
	oldValue: any;
	newValue: any;
	copyable?: boolean;
}

@Component({
	selector: 'ga-invoice-changes-notification',
	templateUrl: './invoice-changes-notification.component.html',
	styleUrls: ['./invoice-changes-notification.component.scss'],
	standalone: false
})
export class InvoiceChangesNotificationComponent extends TranslationBaseComponent implements OnInit {
	changes: IInvoiceFieldChange[] = [];
	isEstimate: boolean = false;

	constructor(
		public readonly translateService: TranslateService,
		protected readonly dialogRef: NbDialogRef<InvoiceChangesNotificationComponent>,
		private readonly toastrService: ToastrService
	) {
		super(translateService);
	}

	ngOnInit(): void {}

	/**
	 * Copy value to clipboard
	 * @param value - The value to copy
	 * @param fieldLabel - The field label for the toast message
	 */
	async copyToClipboard(value: any, fieldLabel: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(String(value));
			this.toastrService.success(
				this.getTranslation('INVOICES_PAGE.CHANGES_NOTIFICATION.COPIED_TO_CLIPBOARD', {
					field: this.getTranslation(fieldLabel)
				 }),
				this.getTranslation('TOASTR.TITLE.SUCCESS')
			);
		} catch (error) {
			this.toastrService.danger(
				this.getTranslation('INVOICES_PAGE.CHANGES_NOTIFICATION.COPY_FAILED'),
				this.getTranslation('TOASTR.TITLE.ERROR')
			);
		}
	}

	/**
	 * Confirm and close the dialog
	 */
	confirm(): void {
		this.dialogRef.close({ confirmed: true });
	}
}
