import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { PermissionsGuard } from '@gauzy/ui-core/core';
import { ApprovalPolicyComponent } from './approval-policy.component';

const routes: Routes = [
	{
		path: '',
		component: ApprovalPolicyComponent,
		canActivate: [PermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.APPROVAL_POLICY_VIEW],
				redirectTo: '/pages/dashboard'
			},
			featureKey: FeatureEnum.FEATURE_EMPLOYEE_APPROVAL_POLICY
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApprovalPolicyRoutingModule {}
