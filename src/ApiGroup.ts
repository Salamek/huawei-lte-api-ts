
import { Connection } from './Connection';

export class ApiGroup{
    _connection: Connection;

    constructor(connection: Connection) {
        this._connection = connection;
    }
}