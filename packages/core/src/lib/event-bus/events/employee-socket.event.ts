export class EmployeeSocketEvent {
	constructor(public readonly employeeIds: string[], public readonly event: string, public readonly payload?: any) {}
}
