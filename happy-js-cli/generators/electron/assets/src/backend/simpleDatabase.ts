import Nedb from 'nedb';
import { app } from 'electron';
import { join } from 'path';
import { promisify } from 'util';

const db: Nedb<unknown> & { insertAsync?: (data: unknown)=>Promise<unknown> } = new Nedb({ filename: join(app.getPath('userData'), '/.data/simpleDatabase'), autoload: true });

db.insertAsync = promisify(db.insert);

export default db;
