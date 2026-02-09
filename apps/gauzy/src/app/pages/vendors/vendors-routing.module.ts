import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { PermissionsGuard } from '@gauzy/ui-core/core';
import { VendorsComponent } from './vendors.component';

const routes: Routes = [
	{
		path: '',
		component: VendorsComponent,
		canActivate: [PermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW],
				redirectTo: '/pages/dashboard'
			},
			featureKey: FeatureEnum.FEATURE_ORGANIZATION_VENDOR
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VendorsRoutingModule {}
