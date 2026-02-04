import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { IncomeComponent } from './income.component';

export function redirectTo() {
	return '/pages/dashboard';
}

const routes: Routes = [
	{
		path: '',
		component: IncomeComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ORG_INCOMES_VIEW],
				redirectTo
			},
			featureKey: FeatureEnum.FEATURE_INCOME
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IncomeRoutingModule {}
