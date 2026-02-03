import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureEnum } from '@gauzy/contracts';
import { AppointmentCalendarComponent, ManageAppointmentComponent } from '@gauzy/ui-core/shared';

const routes: Routes = [
	{
		path: '',
		component: AppointmentCalendarComponent,
		data: {
			featureKey: FeatureEnum.FEATURE_EMPLOYEE_APPOINTMENT
		}
	},
	{
		path: 'manage/:employeeId',
		component: ManageAppointmentComponent
	},
	{
		path: 'manage/:employeeId/:appointmentId',
		component: ManageAppointmentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppointmentRoutingModule {}
