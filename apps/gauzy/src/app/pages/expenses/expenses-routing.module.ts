import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { ExpensesComponent } from './expenses.component';
import { ExpenseCategoriesComponent } from './expense-categories/expense-categories.component';

export function redirectTo() {
	return '/pages/dashboard';
}

const routes: Routes = [
	{
		path: '',
		component: ExpensesComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ORG_EXPENSES_VIEW],
				redirectTo
			},
			featureKey: FeatureEnum.FEATURE_EXPENSE
		}
	},
	{
		path: 'categories',
		component: ExpenseCategoriesComponent,
		data: {
			selectors: {
				project: false,
				employee: false,
				date: false
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ExpensesRoutingModule {}
