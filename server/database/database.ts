import mariadb from 'mariadb'
import { Pool } from 'mariadb'
import { USER_TABLE, TWEET_TABLE } from './schema'

export class Database {
  // Properties
  private _pool: Pool
  // Constructor
  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }
  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
    await this.executeSQL(USER_TABLE)
    await this.executeSQL(TWEET_TABLE)
  }

  public executeSQL = async (query: string) => {
    try {
      const conn = await this._pool.getConnection()
      const res = await conn.query(query)
      conn.end()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  public getUserByUsername = async (username: string) => {
    const query = 'SELECT * FROM users WHERE username = ?'

    try {
      const conn = await this._pool.getConnection()
      const rows = await conn.query(query, [username])
      conn.end()

      if (rows.length === 0) {
        return null
      }
      return rows[0]
    } catch (err) {
      console.log(err)
      return null
    }
  }


  public registerUser = async (username: string, hashedPassword: string, role: string) => {
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

    try {
        const conn = await this._pool.getConnection();
        const result = await conn.query(query, [username, hashedPassword, role]);
        conn.end();

        if (result.affectedRows === 1) {
            return { insertId: result.insertId };
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


}
