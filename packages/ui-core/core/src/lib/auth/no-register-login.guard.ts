import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppService } from '../services';
import { IAppConfig } from '@gauzy/contracts';
import { firstValueFrom, map } from 'rxjs';

/**
 * Guard used for routes that should NOT be accessible
 * when **Register Login feature** is disabled in app configuration.
 */
@Injectable()
export class NoRegisterLoginGuard {
	constructor(private readonly _router: Router, private readonly appService: AppService) {}

	/**
	 * Checks whether the **Register Login feature** is enabled.
	 * If disabled, user is redirected to the standard login page.
	 *
	 * @param route - Current activated route (used to preserve query params)
	 * @returns Promise<boolean> - true if the Register feature is enabled, otherwise false
	 */
	async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const registerEnabled = await firstValueFrom(
			this.appService.getAppConfigs().pipe(map((configs: IAppConfig) => configs.register_login))
		);

		if (!registerEnabled) {
			const queryParams = route.queryParams;
			this._router.navigate(['/auth/login'], { queryParams });
			return false;
		}

		return true;
	}
}
