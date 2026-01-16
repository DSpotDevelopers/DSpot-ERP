import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbSelectModule,
	NbToastrModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, IncomeService, RoleService } from '@gauzy/ui-core/core';
import { DangerZoneMutationComponent } from './danger-zone-mutation/danger-zone-mutation.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbCardModule,
		NbDatepickerModule,
		NbIconModule,
		NbInputModule,
		NbListModule,
		NbSelectModule,
		NbToastrModule,
		TranslateModule.forChild(),
		DirectivesModule
	],
	exports: [DangerZoneMutationComponent],
	declarations: [DangerZoneMutationComponent],
	providers: [AuthService, RoleService, IncomeService]
})
export class DangerZoneMutationModule {}
