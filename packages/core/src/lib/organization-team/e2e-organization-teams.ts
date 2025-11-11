import { environment } from '@gauzy/config';

export const E2E_ORGANIZATION_TEAMS = [
	{
		name: 'Employees',
		defaultMembers: ['e2e.admin@dspot.com.pl', 'e2e.local.admin@dspot.com.pl', 'e2e.employee@dspot.com.pl'],
		manager: ['e2e.admin@dspot.com.pl']
	},
	{
		name: 'Contractors',
		defaultMembers: ['e2e.employee@dspot.com.pl'],
		manager: ['e2e.admin@dspot.com.pl']
	},
	{
		name: 'Designers',
		defaultMembers: ['e2e.employee@dspot.com.pl'],
		manager: ['e2e.admin@dspot.com.pl']
	},
	{
		name: 'QA',
		defaultMembers: ['e2e.employee@dspot.com.pl'],
		manager: ['e2e.admin@dspot.com.pl']
	},
	{
		name: 'Default Team',
		defaultMembers: ['e2e.employee@dspot.com.pl'],
		manager: ['e2e.admin@dspot.com.pl']
	}
];
