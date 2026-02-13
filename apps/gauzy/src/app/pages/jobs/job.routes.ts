import { Route } from '@angular/router';
import { PageRouteRegistryService } from '@gauzy/ui-core/core';
import { JobLayoutComponent } from './job-layout/job-layout.component';
import { FeatureEnum } from '@gauzy/contracts';

/**
 * Creates jobs routes for the application
 *
 * @param _pageRouteRegistryService An instance of PageRouteRegistryService
 * @returns An array of Route objects
 */
export const createJobsRoutes = (_pageRouteRegistryService: PageRouteRegistryService): Route[] => [
	{
		path: '',
		component: JobLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'employee',
				pathMatch: 'full',
				data: { featureKey: FeatureEnum.FEATURE_JOB }
			},
			..._pageRouteRegistryService.getPageLocationRoutes('jobs')
		]
	}
];
