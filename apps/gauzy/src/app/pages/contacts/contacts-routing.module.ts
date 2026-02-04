import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactType, FeatureEnum, PermissionsEnum } from '@gauzy/contracts';
import { FeatureGuard, PermissionsGuard } from '@gauzy/ui-core/core';
import { ContactsComponent } from './contacts.component';

const CONTACT_VIEW_PERMISSION = {
	permissions: {
		only: [PermissionsEnum.ALL_ORG_EDIT, PermissionsEnum.ORG_CONTACT_VIEW],
		redirectTo: '/pages/contacts/visitors'
	}
};

const routes: Routes = [
	{
		path: '',
		redirectTo: 'customers',
		pathMatch: 'full'
	},
	{
		path: 'visitors',
		loadChildren: () => import('@gauzy/ui-core/shared').then((m) => m.WorkInProgressModule),
		data: {
			selectors: {
				project: false,
				employee: false,
				date: false,
				organization: false
			},
			featureKey: FeatureEnum.FEATURE_CONTACT
		}
	},
	{
		path: 'clients',
		component: ContactsComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			...CONTACT_VIEW_PERMISSION,
			selectors: {
				project: false,
				date: true
			},
			contactType: ContactType.CLIENT,
			featureKey: FeatureEnum.FEATURE_CONTACT
		}
	},
	{
		path: 'customers',
		component: ContactsComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			...CONTACT_VIEW_PERMISSION,
			selectors: {
				project: false,
				date: true
			},
			contactType: ContactType.CUSTOMER,
			featureKey: FeatureEnum.FEATURE_CONTACT
		}
	},
	{
		path: 'leads',
		component: ContactsComponent,
		canActivate: [PermissionsGuard, FeatureGuard],
		data: {
			...CONTACT_VIEW_PERMISSION,
			selectors: {
				project: false,
				date: true
			},
			contactType: ContactType.LEAD,
			featureKey: FeatureEnum.FEATURE_CONTACT
		}
	},
	{
		path: 'view/:id',
		loadChildren: () => import('./contact-view/contact-view.module').then((m) => m.ContactViewModule),
		data: {
			...CONTACT_VIEW_PERMISSION,
			selectors: {
				project: false,
				date: false
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactsRoutingModule {}
