import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingComponent } from './general-setting.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{
		path: '',
		component: GeneralSettingComponent,
		data: { featureKey: FeatureEnum.FEATURE_SETTING }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GeneralSettingRoutingModule {}
