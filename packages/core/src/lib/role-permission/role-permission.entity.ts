import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RelationId } from 'typeorm';
import { PermissionsEnum, IRolePermission } from '@gauzy/contracts';
import { ColumnIndex, MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from './../core/decorators/entity';
import { MikroOrmRolePermissionRepository } from './repository/mikro-orm-role-permission.repository';
import { TenantBaseEntity } from '../core/entities/tenant-base.entity';
import { Role } from '../role/role.entity';

@MultiORMEntity('role_permission', { mikroOrmRepository: () => MikroOrmRolePermissionRepository })
export class RolePermission extends TenantBaseEntity implements IRolePermission {
	@ApiProperty({ type: () => String, enum: PermissionsEnum })
	@ColumnIndex()
	@MultiORMColumn()
	permission: string;

	@ApiPropertyOptional({ type: () => Boolean, default: false })
	@MultiORMColumn({ nullable: true, default: false })
	enabled: boolean;

	@ApiPropertyOptional({ type: () => String })
	@MultiORMColumn({ nullable: true })
	description: string;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
	@MultiORMManyToOne(() => Role, (it) => it.rolePermissions, {
		onDelete: 'CASCADE'
	})
	role: Role;

	@ApiProperty({ type: () => String })
	@RelationId((it: RolePermission) => it.role)
	@ColumnIndex()
	@MultiORMColumn({ relationId: true })
	roleId: string;
}
