import { ITaskStatus } from './task-status.model';

export interface CustomFilterConfig {
	initialValueInput?: string;
	initialValueStatus?: ITaskStatus;
	initialValueIds?: string[];
}

export interface ToggleFilterConfig {
	initialChoice?: 'accept' | 'deny' | null;
	acceptValue?: boolean;
	denyValue?: boolean;
}
