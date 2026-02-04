import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { DepartmentsComponent } from './departments.component';

const routes: Routes = [
	{
		path: '',
		component: DepartmentsComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW],
				redirectTo: '/pages/dashboard'
			},
			featureKey: FeatureEnum.FEATURE_ORGANIZATION_DEPARTMENT
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DepartmentsRoutingModule {}
