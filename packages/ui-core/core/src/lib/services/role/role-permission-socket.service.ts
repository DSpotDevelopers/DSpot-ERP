import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, filter, fromEvent, switchMap, tap } from 'rxjs';
import { SocketConnectionService } from '../socket-connection/socket-connection.service';
import { IRolePermission } from '@gauzy/contracts';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class RolePermissionSocketService {
	public permissionChanged$ = new BehaviorSubject<IRolePermission | null>(null);

	constructor(private readonly socketConnection: SocketConnectionService) {
		this.listenToPermissionChanges();
	}

	/**
	 * Listen to role permission changes from the socket connection
	 */
	private listenToPermissionChanges() {
		this.socketConnection.connected$
			.pipe(
				filter(Boolean), // only when socket is connected
				switchMap(() => {
					const socket = this.socketConnection.socket;
					if (!socket) {
						console.warn('[Socket] Socket not ready');
						return EMPTY;
					}
					// Listen to permission:changed event
					return fromEvent<IRolePermission>(socket, 'permission:changed');
				}),
				tap((payload) => {
					console.log('[Socket] permission:changed event', payload);
					this.permissionChanged$.next(payload);
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
