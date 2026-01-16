import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '@gauzy/ui-core/core';
import { UserMutationComponent } from './user-mutation.component';
import { UserFormsModule } from '../forms/user-forms.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NbButtonModule,
		NbCardModule,
		NbIconModule,
		TranslateModule.forChild(),
		UserFormsModule,
		DirectivesModule
	],
	exports: [UserMutationComponent],
	declarations: [UserMutationComponent],
	providers: [UsersService]
})
export class UserMutationModule {}
