import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkQueryParamsResolver } from '@gauzy/ui-core/core';
import { DateRangePickerResolver } from '@gauzy/ui-core/shared';
import { ClientBudgetsReportComponent } from './client-budgets-report/client-budgets-report.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: ClientBudgetsReportComponent,
		data: {
			datePicker: {
				unitOfTime: 'week'
			},
			featureKey: FeatureEnum.FEATURE_REPORT
		},
		resolve: {
			dates: DateRangePickerResolver,
			bookmarkParams: BookmarkQueryParamsResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientBudgetsReportRoutingModule {}
