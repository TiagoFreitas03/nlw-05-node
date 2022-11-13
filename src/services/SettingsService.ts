import { Repository } from 'typeorm'

import { database } from '../database'
import { Setting } from '../entities/Setting'

interface ISettingsCreate {
	chat: boolean
	username: string
}

export class SettingsService {
	private settingsRepository: Repository<Setting>

	constructor() {
		this.settingsRepository = database.getRepository(Setting)
	}

	async create({ chat, username }: ISettingsCreate) {
		const userExists = await this.settingsRepository.findOne({
			where: { username }
		})

		if (userExists)
			throw new Error('User already exists')

		const settings = this.settingsRepository.create({ chat, username })

		await this.settingsRepository.save(settings)

		return settings
	}

	async findByUsername(username: string) {
		const settings = await this.settingsRepository.findOne({
			where: { username }
		})

		return settings
	}

	async update(username: string, chat: boolean) {
		await this.settingsRepository
			.createQueryBuilder()
			.update(Setting)
			.set({ chat })
			.where('username = :username', { username })
			.execute()
	}
}
