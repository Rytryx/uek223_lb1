import express, { Express, Request, Response } from 'express';
import http from 'http';
import { resolve, dirname } from 'path';
import { API } from './api';
import { Database } from './database';
import postsRouter from './content/posts';
import commentsRouter from './content/comments';
import { register } from './user_managment/register';
import { login } from './user_managment/login';

class Backend {
  // Properties
  public _app: Express;
  private _api: API;
  private _database: Database;
  private _env: string;

  // Constructor
  constructor() {
    this._app = express();
    this._database = new Database();
    this._api = new API(this._app);
    this._env = process.env.NODE_ENV || 'development';

    this.setupStaticFiles();
    this.setupRoutes();
    this.startServer();
  }

  // Methods
  private setupStaticFiles(): void {
    this._app.use(express.static('client'));
  }

  private setupRoutes(): void {
    // Hauptseite
    this._app.use(express.json());
    this._app.get('/', (req: Request, res: Response) => {
      const __dirname = resolve(dirname(''));
      res.sendFile(__dirname + '/client/index.html');
    });

    this._app.use('/api/posts', postsRouter);
    this._app.use('/api/comments', commentsRouter);
    this._app.post('/api/register', register);
    this._app.post('/api/login', login);
  }

  private startServer(): void {
    if (this._env === 'production') {
      http.createServer(this._app).listen(3000, () => {
        console.log('Server is listening on port 3000');
      });
    }
  }
}

const backend = new Backend();
export const viteNodeApp = backend._app;
