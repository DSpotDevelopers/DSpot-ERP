import { NB_AUTH_OPTIONS, NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppService } from '@gauzy/ui-core/core';
import { IAppConfig } from '@gauzy/contracts';
import { Router } from '@angular/router';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ngx-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	standalone: false
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent {
	public showPassword = false;
	public showConfirmPassword = false;

	public allowRegisterLogin$: Observable<boolean>;

	constructor(
		public readonly nbAuthService: NbAuthService,
		public readonly cdr: ChangeDetectorRef,
		public readonly router: Router,
		private readonly appService: AppService,
		@Inject(NB_AUTH_OPTIONS) options
	) {
		super(nbAuthService, options, cdr, router);
	}

	ngOnInit() {
		this.allowRegisterLogin$ = this.appService.getAppConfigs().pipe(
			map((configs: IAppConfig) => configs.register_login),
			untilDestroyed(this)
		);
	}
}
