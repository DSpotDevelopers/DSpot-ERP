import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Feature } from './feature.entity';
import { FeatureOrganization } from './feature-organization.entity';
import { FeatureToggleController } from './feature-toggle.controller';
import { FeatureService } from './feature.service';
import { FeatureOrganizationService } from './feature-organization.service';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmFeatureRepository } from './repository/type-orm-feature.repository';
import { TypeOrmFeatureOrganizationRepository } from './repository/type-orm-feature-organization.repository';
import { UserModule } from '../user';
import { SocketModule } from '../socket';
import { UserOrganizationModule } from '../user-organization/user-organization.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Feature, FeatureOrganization]),
		MikroOrmModule.forFeature([Feature, FeatureOrganization]),
		forwardRef(() => RolePermissionModule),
		forwardRef(() => UserModule),
		forwardRef(() => UserOrganizationModule),
		SocketModule,
		CqrsModule
	],
	controllers: [FeatureToggleController],
	providers: [
		FeatureService,
		FeatureOrganizationService,
		TypeOrmFeatureRepository,
		TypeOrmFeatureOrganizationRepository,
		...CommandHandlers
	],
	exports: [FeatureService, FeatureOrganizationService]
})
export class FeatureModule {}
