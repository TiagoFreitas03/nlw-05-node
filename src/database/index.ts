import { DataSource } from 'typeorm'
import path from 'path'

export const database = new DataSource({
	type: "sqlite",
  database: path.join(__dirname, 'database.sqlite'),
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
  entities: [path.join(__dirname, '..', 'entities', '*.ts')]
})
