import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllReportComponent } from './all-report/all-report.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: AllReportComponent,
		data: { featureKey: FeatureEnum.FEATURE_REPORT }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AllReportRoutingModule {}
