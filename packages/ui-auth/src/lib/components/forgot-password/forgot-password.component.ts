import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAppConfig } from '@gauzy/contracts';
import { AppService } from '@gauzy/ui-core/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbRequestPasswordComponent } from '@nebular/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ngx-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	standalone: false
})
export class NgxForgotPasswordComponent extends NbRequestPasswordComponent {
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
