import { Injectable } from '@nestjs/common';
import { CrudService } from '../core/crud/crud.service';
import { TypeOrmLanguageRepository } from './repository/type-orm-language.repository';
import { MikroOrmLanguageRepository } from './repository/mikro-orm-language.repository';
import { Language } from './language.entity';
import { FindManyOptions, In } from 'typeorm';
import { IPagination, LanguagesEnum } from '@gauzy/contracts';

@Injectable()
export class LanguageService extends CrudService<Language> {
	constructor(
		typeOrmLanguageRepository: TypeOrmLanguageRepository,
		mikroOrmLanguageRepository: MikroOrmLanguageRepository
	) {
		super(typeOrmLanguageRepository, mikroOrmLanguageRepository);
	}

	/**
	 * Finds a single Language entity by its name.
	 *
	 * @param name The name of the Language entity to be found.
	 * @returns A promise that resolves to the Language entity if found, or null if not found.
	 */
	findOneByName(name: string): Promise<Language> {
		return super.findOneByOptions({
			where: { name }
		});
	}

	/**
	 * Finds all supported languages with optional filtering and pagination.
	 * Returns only languages with `code` in LanguagesEnum.
	 *
	 * @param options Find options (optional)
	 * @returns Paginated languages
	 */
	public async findAllSupportedLanguages(options?: FindManyOptions<Language>): Promise<IPagination<Language>> {
		const safeOptions: FindManyOptions<Language> = {
			...(options || {}),
			where: {
				...(options?.where || {}),
				code: In(Object.values(LanguagesEnum))
			}
		};

		const [items, total] = await this.typeOrmRepository.findAndCount(safeOptions);

		return { items, total };
	}
}
