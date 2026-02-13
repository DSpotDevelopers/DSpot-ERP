import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '../services/store';
import { FeatureEnum } from '@gauzy/contracts';

@Injectable({ providedIn: 'root' })
export class FeatureGuard implements CanActivate, CanActivateChild {
	constructor(private readonly store: Store, private readonly router: Router) {}

	/**
	 * Guard for activating a route
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkFeature(route, state);
	}

	/**
	 * Guard for activating child routes
	 */
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkFeature(route, state);
	}

	/**
	 * Checks if the feature associated with the route is enabled
	 * @param route - the route snapshot to check
	 * @param state - full router state snapshot (for lazy-loaded routes)
	 * @returns true if the feature is enabled or not defined, false otherwise
	 */
	private checkFeature(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const featureKey = this.findFeatureKey(route, state);

		if (!featureKey) {
			return true;
		}

		if (!this.store.hasFeatureEnabled(featureKey)) {
			this.router.navigate(['/pages/help']);
			return false;
		}

		return true;
	}

	/**
	 * Traverse the route tree to find the nearest featureKey.
	 * Tries route snapshot first, then falls back to RouterStateSnapshot (for lazy-loaded routes)
	 * @param route - the activated route snapshot
	 * @param state - full router state snapshot
	 * @returns FeatureEnum or null if none found
	 */
	private findFeatureKey(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FeatureEnum | null {
		let current: ActivatedRouteSnapshot | null = route;

		while (current) {
			const featureKey = current.data?.['featureKey'] as FeatureEnum | undefined;
			if (featureKey) {
				return featureKey;
			}
			current = current.parent;
		}

		let deepest = state.root;
		while (deepest.firstChild) {
			deepest = deepest.firstChild;
			const featureKey = deepest.data?.['featureKey'] as FeatureEnum | undefined;
			if (featureKey) {
				return featureKey;
			}
		}

		return null;
	}
}
