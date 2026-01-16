import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule, NbIconModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { UserFormsModule } from '../../user/forms/user-forms.module';
import { EmployeeEndWorkComponent } from './employee-end-work.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NbCardModule,
		UserFormsModule,
		NbButtonModule,
		NbIconModule,
		NbDatepickerModule,
		NbInputModule,
		TranslateModule.forChild(),
		DirectivesModule
	],
	exports: [EmployeeEndWorkComponent],
	declarations: [EmployeeEndWorkComponent],
	providers: []
})
export class EmployeeEndWorkModule {}
