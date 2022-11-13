import { Repository } from 'typeorm'

import { database } from '../database'
import { User } from '../entities/User'

export class UsersService {
	private usersRepository: Repository<User>

	constructor() {
		this.usersRepository = database.getRepository(User)
	}

	async create(email: string) {
		const userExists = await this.usersRepository.findOne({
			where: { email }
		})

		if (userExists)
			return userExists

		const user = await this.usersRepository.create({ email })

		await this.usersRepository.save(user)

		return user
	}

	async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
			where: { email }
		})

    return user
  }
}
