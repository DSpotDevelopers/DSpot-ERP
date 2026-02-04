import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { EquipmentComponent } from './equipment.component';

const routes: Routes = [
	{
		path: '',
		component: EquipmentComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW, PermissionsEnum.ORG_EQUIPMENT_VIEW],
				redirectTo: '/pages/dashboard'
			},
			featureKey: FeatureEnum.FEATURE_ORGANIZATION_EQUIPMENT
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EquipmentRoutingModule {}
