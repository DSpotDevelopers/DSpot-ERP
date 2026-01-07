import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeScheduleComponent } from './employee-schedule.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule, NbButtonModule, NbCardModule, TranslateModule.forChild()],
	exports: [EmployeeScheduleComponent],
	declarations: [EmployeeScheduleComponent]
})
export class EmployeeScheduleModule {}
