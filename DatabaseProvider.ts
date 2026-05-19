import sqlite3 = require("sqlite3")
import sqlite = require("sqlite")
interface ConnectionConfig {
    async connect(): Promise<void>
}
interface Participante {
    nome: string;
    email: string;
}

class SqlLite3<U> implements ConnectionConfig {
    archive: string = "certificados.db";
    db: sqlite.Database | null = null;
    async connect(): Promise<void> {
        const db = await sqlite.open({
            filename: `./${this.archive}`,
            driver: sqlite3.Database
        });
        this.db = db;

        await db.exec(`
            CREATE TABLE IF NOT EXISTS participantesdb (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL
            )
        `)
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    }

    async insertTuple(entity: Participante): Promise<void> {
        if (this.db) {
            const query = `INSERT INTO participantesdb (nome, email) VALUES (?, ?)`;
            await this.db.run(query, [entity.nome, entity.email]);
            console.log("Participante inserido com sucesso.");
        }
    }

    async getField(field: string[]): Promise<Participante[]> {
        const query = `SELECT ${field.join(", ")} FROM participantesdb`;
        const rows = await this.db?.all(query);
        return rows ?? [];

    }
    async delete(): Promise<void> {
        const query = `DELETE FROM participantesdb`;
        await this.db?.run(query);

    }

    async closedDb() {
        if (this.db) {
            await this.db.close();
            console.log("Conexão com o banco de dados fechada.");
        }
    }
}



module.exports = SqlLite3;