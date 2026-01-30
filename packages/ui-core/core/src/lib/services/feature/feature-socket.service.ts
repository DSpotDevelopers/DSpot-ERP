import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, filter, fromEvent, switchMap, tap } from 'rxjs';
import { SocketConnectionService } from '../socket-connection/socket-connection.service';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class FeatureSocketService {
	public featureChanged$ = new BehaviorSubject<any | null>(null);

	constructor(private readonly socketConnection: SocketConnectionService) {
		this.listenToFeatureChanges();
	}

	/**
	 * Listen to feature changes from the socket connection
	 */
	private listenToFeatureChanges() {
		this.socketConnection.connected$
			.pipe(
				filter(Boolean),
				switchMap(() => {
					const socket = this.socketConnection.socket;
					if (!socket) {
						console.warn('[Socket] Socket not ready');
						return EMPTY;
					}
					return fromEvent<{
						featureId: string;
						organizationId?: string;
						tenantId: string;
					}>(socket, 'feature:changed');
				}),
				tap((payload) => {
					console.log('[Socket] feature:changed event', payload);
					this.featureChanged$.next(payload);
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
