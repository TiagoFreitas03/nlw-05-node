import { Repository } from 'typeorm'

import { database } from '../database'
import { Connection } from '../entities/Connection'

interface IConnectionCreate {
	socket_id: string
	user_id: string
	admin_id?: string
	id?: string
}

export class ConnectionsService {
	private connectionsRepository: Repository<Connection>

	constructor() {
		this.connectionsRepository = database.getRepository(Connection)
	}

	async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
		const connection = this.connectionsRepository.create({
			socket_id, user_id, admin_id, id
		})

		await this.connectionsRepository.save(connection)

		return connection
	}

	async findByUserId(user_id: string) {
		const connection = await this.connectionsRepository.findOne({
			where: { user_id }
		})

		return connection
	}

	async findAllWithoutAdmin() {
		const connections = await this.connectionsRepository.find({
			where: {admin_id: null},
			relations: ['user']
		})

		return connections
	}

	async findBySocketId(socket_id: string) {
		const connection = await this.connectionsRepository.findOne({
			where: { socket_id }
		})

		return connection
	}

	async updateAdminId(user_id: string, admin_id: string) {
		await this.connectionsRepository
			.createQueryBuilder()
			.update(Connection)
			.set({ admin_id })
			.where('user_id = :user_id', { user_id })
			.execute()
	}
}
