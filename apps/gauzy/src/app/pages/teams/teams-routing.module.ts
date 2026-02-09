import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
	{
		path: '',
		component: TeamsComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW, PermissionsEnum.ORG_TEAM_VIEW],
				redirectTo: '/pages/dashboard'
			},
			featureKey: FeatureEnum.FEATURE_ORGANIZATION_TEAM
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TeamsRoutingModule {}
