import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { TaskComponent } from './components/task/task.component';
import { TaskSettingsComponent } from './components/task/task-settings/task-settings.component';

const routes: Routes = [
	{
		path: '',
		canActivate: [FeatureGuard],
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				component: TaskComponent,
				data: { featureKey: FeatureEnum.FEATURE_DASHBOARD_TASK }
			},
			{
				path: 'team',
				component: TaskComponent,
				data: { featureKey: FeatureEnum.FEATURE_TEAM_TASK }
			},
			{
				path: 'me',
				component: TaskComponent,
				data: {
					selectors: {
						team: false
					},
					featureKey: FeatureEnum.FEATURE_MY_TASK
				}
			},
			{
				path: 'settings/:id',
				component: TaskSettingsComponent,
				canActivate: [PermissionsGuard],
				data: {
					permissions: {
						only: [PermissionsEnum.ALL_ORG_EDIT, PermissionsEnum.ORG_PROJECT_EDIT],
						redirectTo: '/pages/tasks/dashboard'
					}
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TasksRoutingModule {}
