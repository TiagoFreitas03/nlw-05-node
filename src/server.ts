import 'dotenv/config'

import { database } from './database/index'
import { http } from './http'
import './websocket/client'
import './websocket/admin'

http.listen(3333, async () => {
	await database.initialize()
	console.log('Server running on port 3333')
})
