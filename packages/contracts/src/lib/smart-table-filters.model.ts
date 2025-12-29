import { ITaskStatus } from './task-status.model';

export interface CustomFilterConfig {
	initialValueInput?: string;
	initialValueStatus?: ITaskStatus;
	initialValueIds?: string[];
	initialValueToggle?: StatusFilterValue;
}

export interface StatusFilterValue {
	isActive?: boolean;
	isArchived?: boolean;
}
