import sqlite = require("sqlite");
interface ConnectionConfig {
    connect(): Promise<void>;
}
interface Participante {
    nome: string;
    email: string;
}
declare class SqlLite3<U> implements ConnectionConfig {
    archive: string;
    db: sqlite.Database | null;
    connect(): Promise<void>;
    insertTuple(entity: Participante): Promise<void>;
    getField(field: string[]): Promise<Participante[]>;
    delete(): Promise<void>;
    closedDb(): Promise<void>;
}
export = SqlLite3;
//# sourceMappingURL=DatabaseProvider.d.ts.map