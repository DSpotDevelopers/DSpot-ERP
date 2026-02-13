import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalSettingsComponent } from './goal-settings.component';
import { FeatureEnum } from '@gauzy/contracts';

const routes: Routes = [
	{ path: '', component: GoalSettingsComponent, data: { featureKey: FeatureEnum.FEATURE_GOAL_SETTING } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GoalSettingsRoutingModule {}
