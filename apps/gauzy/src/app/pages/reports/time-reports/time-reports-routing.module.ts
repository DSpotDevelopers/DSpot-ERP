import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkQueryParamsResolver } from '@gauzy/ui-core/core';
import { DateRangePickerResolver } from '@gauzy/ui-core/shared';
import { TimeReportsComponent } from './time-reports/time-reports.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: TimeReportsComponent,
		data: {
			datePicker: {
				unitOfTime: 'week'
			},
			selectors: {
				team: false
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
export class TimeReportsRoutingModule {}
