import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmployeeSocketEvent } from '../../../event-bus';
import { SocketService } from '../../../socket';
import { EmployeeService } from '../../employee.service';

@EventsHandler(EmployeeSocketEvent)
export class EmployeeSocketEventHandler implements IEventHandler<EmployeeSocketEvent> {
	constructor(private readonly _socketService: SocketService, private readonly _employeeService: EmployeeService) {}

	/**
	 * Handles EmployeeSocketEvent.
	 * The event contains employee IDs, socket event name and payload.
	 * This handler resolves related users and emits a socket event to each connected user.
	 */
	async handle(event: EmployeeSocketEvent) {
		const employees = await this._employeeService.findByIds(event.employeeIds);

		employees
			.map((e) => e.user?.id)
			.filter(Boolean)
			.forEach((userId) => this._socketService.emitToClient(userId, event.event, event.payload));
	}
}
