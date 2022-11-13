import { Repository } from 'typeorm'

import { database } from '../database'
import { Message } from '../entities/Message'

interface IMessageCreate {
	admin_id?: string
	text: string
	user_id: string
}

export class MessagesService {
	private messagesRepository: Repository<Message>

	constructor() {
		this.messagesRepository = database.getRepository(Message)
	}

	async create({ admin_id, text, user_id }: IMessageCreate) {
		const message = this.messagesRepository.create({ admin_id, text, user_id })

		await this.messagesRepository.save(message)

		return message
	}

	async listByUser(user_id: string) {
		const list = await this.messagesRepository.find({
			where: {user_id},
			relations: ['user']
		})

		return list
	}
}
