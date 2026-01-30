import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, filter, fromEvent, switchMap, tap } from 'rxjs';
import { SocketConnectionService } from '../socket-connection/socket-connection.service';
import { IUser } from '@gauzy/contracts';
import { UsersService } from './users.service';
import { Store } from '../store';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class UsersSocketService {
	constructor(
		private readonly socketConnection: SocketConnectionService,
		private readonly usersService: UsersService,
		private readonly store: Store
	) {
		this.listenToUserChanges();
	}

	private listenToUserChanges(): void {
		this.socketConnection.connected$
			.pipe(
				filter(Boolean),
				switchMap(() => {
					const socket = this.socketConnection.socket;
					if (!socket) {
						console.warn('[Socket] Socket not ready');
						return EMPTY;
					}
					return fromEvent<void>(socket, 'user:changed');
				}),
				switchMap(() => this.usersService.getMe()),
				tap((user: IUser) => {
					console.log('[Socket] user updated', user);
					this.store.user = { ...this.store.user, ...user };
				}),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
