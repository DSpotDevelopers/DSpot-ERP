import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HelpCenterComponent } from './help-center.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: HelpCenterComponent,
		data: {
			featureKey: FeatureEnum.FEATURE_ORGANIZATION_HELP_CENTER
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HelpCenterRoutingModule {}
