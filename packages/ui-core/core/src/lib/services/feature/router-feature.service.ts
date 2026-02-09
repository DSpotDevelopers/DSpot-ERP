import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FeatureEnum } from '@gauzy/contracts';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteFeatureService {
	private _currentFeatureKey: FeatureEnum | null = null;

	get currentFeatureKey(): FeatureEnum | null {
		if (!this._currentFeatureKey) {
			const deepest = this.getDeepestRoute(this.router.routerState.root);
			this._currentFeatureKey = this.findFeatureKeyUpwards(deepest);
		}
		return this._currentFeatureKey;
	}

	constructor(private router: Router) {
		this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
			const deepest = this.getDeepestRoute(this.router.routerState.root);
			this._currentFeatureKey = this.findFeatureKeyUpwards(deepest);
		});
	}

	/**
	 * Gets the deepest (active) route after redirects & lazy loading
	 */
	private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
		let current = route;
		while (current.firstChild) {
			current = current.firstChild;
		}
		return current;
	}

	/**
	 * Walks UP the route tree to find the nearest featureKey
	 */
	private findFeatureKeyUpwards(route: ActivatedRoute): FeatureEnum | null {
		let current: ActivatedRoute | null = route;

		while (current) {
			const featureKey = current.snapshot.data?.['featureKey'] as FeatureEnum | undefined;
			if (featureKey) {
				return featureKey;
			}
			current = current.parent;
		}

		return null;
	}
}
