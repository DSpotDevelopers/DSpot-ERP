import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString, IsTimeZone, IsUUID } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { IGetInvoiceReportInput, ITimesheet } from '@gauzy/contracts';
import { parseToBoolean } from '@gauzy/utils';
import { FiltersQueryDTO, SelectorsQueryDTO } from '../../../../shared/dto';

/**
 * Get invoice report request DTO validation
 */
export class InvoiceQueryDTO
    extends IntersectionType(FiltersQueryDTO, SelectorsQueryDTO)
    implements IGetInvoiceReportInput
{
    @ApiPropertyOptional({ type: () => String })
	@IsOptional()
	@IsUUID()
	readonly timesheetId: ITimesheet['id'];

    @ApiPropertyOptional({ type: () => String })
	@IsOptional()
	@IsString()
	@IsTimeZone()
	readonly timeZone: string;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => parseToBoolean(value))
	readonly isEdited: boolean;

    @ApiPropertyOptional({ type: () => Boolean })
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => parseToBoolean(value))
	readonly onlyMe: boolean;
}
