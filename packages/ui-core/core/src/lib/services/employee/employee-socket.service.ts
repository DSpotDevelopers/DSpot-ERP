import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, filter, fromEvent, switchMap, tap } from 'rxjs';
import { SocketConnectionService } from '../socket-connection/socket-connection.service';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class EmployeeSocketService {
	public employeeChanged$ = new BehaviorSubject<boolean>(false);

	constructor(private readonly socketConnection: SocketConnectionService) {
		this.listenToEmployeeChanges();
	}

	/**
	 * Listen to employee changes from the socket connection
	 */
	private listenToEmployeeChanges() {
		this.socketConnection.connected$
			.pipe(
				filter(Boolean), // only when socket is connected
				switchMap(() => {
					const socket = this.socketConnection.socket;
					if (!socket) {
						console.warn('[Socket] Socket not ready');
						return EMPTY;
					}
					return fromEvent<void>(socket, 'employee:changed');
				}),
				tap(() => {
					console.log('[Socket] employee:changed event');
					this.employeeChanged$.next(true);
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
