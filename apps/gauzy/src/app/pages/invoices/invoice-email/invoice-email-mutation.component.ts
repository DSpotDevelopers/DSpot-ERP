import { Component, OnInit } from '@angular/core';
import { TranslationBaseComponent } from '@gauzy/ui-core/i18n';
import { IInvoice, InvoiceStatusTypesEnum, IInvoiceItem, IInvoiceItemCreateInput } from '@gauzy/contracts';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import {
	InvoiceEstimateHistoryService,
	InvoiceItemService,
	InvoicesService,
	Store,
	ToastrService
} from '@gauzy/ui-core/core';
import moment from 'moment';

@Component({
	selector: 'ga-invoice-email',
	templateUrl: './invoice-email-mutation.component.html',
	styleUrls: ['./invoice-email-mutation.component.scss'],
	standalone: false
})
export class InvoiceEmailMutationComponent extends TranslationBaseComponent implements OnInit {
	invoice: IInvoice;
	form: UntypedFormGroup;
	isEstimate: boolean;
	invoiceItems: IInvoiceItem[];
	createdInvoice: IInvoice;

	constructor(
		public readonly translateService: TranslateService,
		protected readonly dialogRef: NbDialogRef<InvoiceEmailMutationComponent>,
		private readonly fb: UntypedFormBuilder,
		private readonly toastrService: ToastrService,
		private readonly invoiceService: InvoicesService,
		private readonly store: Store,
		private readonly invoiceEstimateHistoryService: InvoiceEstimateHistoryService,
		private readonly invoicesService: InvoicesService,
		private readonly invoiceItemService: InvoiceItemService
	) {
		super(translateService);
	}

	ngOnInit() {
		this.initializeForm();
	}

	initializeForm() {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	async sendEmail() {
		const { tenantId } = this.store.user;
		const organizationId = this.invoice.fromOrganization?.id ?? this.invoice.organizationId;

		const { email } = this.form.value;

		if (!this.invoice.id) {
			const createdInvoice = await this.createInvoiceEstimate(InvoiceStatusTypesEnum.SENT);
			if (createdInvoice) await this.createInvoiceEstimateItems();
		}

		await this.invoiceService.sendEmail(
			email,
			this.invoice.invoiceNumber,
			this.invoice.id ? this.invoice?.id : this.createdInvoice?.id,
			this.isEstimate,
			organizationId,
			tenantId
		);

		if (this.invoice.id) {
			await this.invoiceService.updateAction(this.invoice.id, {
				status: InvoiceStatusTypesEnum.SENT
			});
		}

		await this.invoiceEstimateSendHistory();

		this.toastrService.success('INVOICES_PAGE.EMAIL.EMAIL_SENT');
		this.dialogRef.close('ok');
	}

	async invoiceEstimateSendHistory() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.store.selectedOrganization;

		await this.invoiceEstimateHistoryService.add({
			action: this.isEstimate
				? this.getTranslation('INVOICES_PAGE.ESTIMATE_SENT_TO', {
						name: this.form.value.email
				  })
				: this.getTranslation('INVOICES_PAGE.INVOICE_SENT_TO', {
						name: this.form.value.email
				  }),
			invoice: this.createdInvoice ? this.createdInvoice : this.invoice,
			invoiceId: this.createdInvoice ? this.createdInvoice.id : this.invoice.id,
			user: this.store.user,
			userId: this.store.userId,
			organization: this.invoice.fromOrganization,
			organizationId,
			tenantId
		});
	}

	async createInvoiceEstimate(status: string, sendTo?: string) {
		try {
			const createdInvoice = await this.invoicesService.addOwn({
				invoiceNumber: this.invoice.invoiceNumber,
				invoiceDate: moment(this.invoice.invoiceDate).startOf('day').toDate(),
				dueDate: moment(this.invoice.dueDate).endOf('day').toDate(),
				currency: this.invoice.currency,
				discountValue: this.invoice.discountValue,
				discountType: this.invoice.discountType,
				tax: this.invoice.tax,
				tax2: this.invoice.tax2,
				taxType: this.invoice.taxType,
				tax2Type: this.invoice.tax2Type,
				terms: this.invoice.terms,
				paid: false,
				totalValue: this.invoice.totalValue,
				fromUserId: this.invoice.fromUserId,
				fromOrganizationId: this.invoice.fromOrganization?.id,
				organizationId: this.invoice.fromOrganization?.id,
				tenantId: this.invoice.tenantId,
				invoiceType: this.invoice.invoiceType,
				tags: this.invoice.tags,
				isEstimate: this.invoice.isEstimate,
				status: status,
				sentTo: sendTo,
				isArchived: this.invoice.isArchived
			});
			this.createdInvoice = createdInvoice;
			return createdInvoice;
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	async createInvoiceEstimateItems() {
		const invoiceItems: IInvoiceItemCreateInput[] = this.invoice.invoiceItems.map((item) => ({
			...item,
			invoiceId: this.createdInvoice.id
		}));
		try {
			return await this.invoiceItemService.createBulk(this.createdInvoice?.id, invoiceItems);
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	cancel() {
		this.dialogRef.close();
	}
}
