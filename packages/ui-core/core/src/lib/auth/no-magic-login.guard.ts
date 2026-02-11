import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppService } from '../services';
import { IAppConfig } from '@gauzy/contracts';
import { firstValueFrom, map } from 'rxjs';

/**
 * Guard used for routes that should NOT be accessible
 * when Magic Login authentication is disabled in app configuration.
 */
@Injectable()
export class NoMagicLoginGuard {
	constructor(private readonly _router: Router, private readonly appService: AppService) {}

	/**
	 * Checks whether Magic Login authentication is enabled.
	 * If disabled, user is redirected to standard login page.
	 *
	 * @param route - Current activated route (used to preserve query params)
	 * @returns Promise<boolean> - true if magic login is enabled, otherwise false
	 */
	async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const magicLoginEnabled = await firstValueFrom(
			this.appService.getAppConfigs().pipe(map((configs: IAppConfig) => configs.magic_login))
		);

		if (!magicLoginEnabled) {
			const queryParams = route.queryParams;
			this._router.navigate(['/auth/login'], { queryParams });
			return false;
		}

		return true;
	}
}
