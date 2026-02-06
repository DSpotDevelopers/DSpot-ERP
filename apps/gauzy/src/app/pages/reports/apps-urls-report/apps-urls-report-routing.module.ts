import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkQueryParamsResolver } from '@gauzy/ui-core/core';
import { DateRangePickerResolver } from '@gauzy/ui-core/shared';
import { AppsUrlsReportComponent } from './apps-urls-report/apps-urls-report.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: AppsUrlsReportComponent,
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
export class AppsUrlsReportRoutingModule {}
