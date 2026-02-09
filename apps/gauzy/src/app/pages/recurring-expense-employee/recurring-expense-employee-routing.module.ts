import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateRangePickerResolver } from '@gauzy/ui-core/shared';
import { RecurringExpensesEmployeeComponent } from './recurring-expense-employee.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: RecurringExpensesEmployeeComponent,
		data: {
			selectors: {
				project: false
			},
			datePicker: {
				unitOfTime: 'month'
			},
			featureKey: FeatureEnum.FEATURE_EMPLOYEE_RECURRING_EXPENSE
		},
		resolve: { dates: DateRangePickerResolver }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RecurringExpensesEmployeeRoutingModule {}
