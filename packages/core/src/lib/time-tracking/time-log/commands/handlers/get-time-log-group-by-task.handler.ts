import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { chain, pluck } from 'underscore';
import * as moment from 'moment';
import { IReportDayGroupByTask, IReportEmployeeLogs, ITimeLog } from '@gauzy/contracts';
import { calculateAverage, calculateAverageActivity } from '../../time-log.utils';
import { GetTimeLogGroupByTaskCommand } from '../get-time-log-group-by-task.command';

@CommandHandler(GetTimeLogGroupByTaskCommand)
export class GetTimeLogGroupByTaskHandler implements ICommandHandler<GetTimeLogGroupByTaskCommand> {
	public async execute(command: GetTimeLogGroupByTaskCommand): Promise<IReportDayGroupByTask[]> {
		const { timeLogs, logActivity, timeZone = moment.tz.guess() } = command;

		const dailyLogs = chain(timeLogs)
			.groupBy((log: ITimeLog) => log.task?.id || 'no-task')
			.map((byTaskLogs: ITimeLog[]) => {
				const sum = calculateAverage(pluck(byTaskLogs, 'duration'));
				const activity = calculateAverageActivity(byTaskLogs, logActivity);

				const task = byTaskLogs.length > 0 ? byTaskLogs[0].task : null;

				// Group by date
				const logs = chain(byTaskLogs)
					.groupBy((log: ITimeLog) => moment.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
					.map((byDateLogs: ITimeLog[], date) => {
						// Group by project inside date
						const projectLogs = chain(byDateLogs)
							.groupBy((log) => log.project?.id || 'no-project')
							.map((byProjectLogs: ITimeLog[]) => {
								const project = byProjectLogs[0]?.project || null;

								return {
									project,
									employeeLogs: this.getGroupByEmployee(byProjectLogs, logActivity),
									sum: calculateAverage(pluck(byProjectLogs, 'duration')),
									activity: calculateAverageActivity(byProjectLogs, logActivity)
								};
							})
							.value();

						return {
							date,
							projectLogs
						};
					})
					.value();

				return {
					task,
					logs,
					sum: sum || null,
					activity: parseFloat(activity.toFixed(2))
				};
			})
			.value();

		return dailyLogs;
	}

	/**
	 * Groups logs by employee (unchanged, reusable)
	 */
	private getGroupByEmployee(logs: ITimeLog[], logActivity: Record<string, number>): IReportEmployeeLogs[] {
		return chain(logs)
			.groupBy('employeeId')
			.map((employeeLogs: ITimeLog[]) => {
				const sum = calculateAverage(pluck(employeeLogs, 'duration'));
				const activity = calculateAverageActivity(employeeLogs, logActivity);
				const employee = employeeLogs[0]?.employee || null;

				const tasks = employeeLogs.map((log) => ({
					task: log.task,
					description: log.description,
					duration: log.duration,
					client: log.organizationContact || null
				}));

				return {
					tasks,
					employee,
					sum,
					activity: parseFloat(activity.toFixed(2))
				};
			})
			.value();
	}
}
