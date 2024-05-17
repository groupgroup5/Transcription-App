import Database from 'better-sqlite3';

const db = new Database('src/lib/server/data/transcript.db', { verbose: console.log });
addFilesTable();

export type FileEntry = {
    id: Number;
    name: String;
    video: String;
    subs: String;
    creationDate: Date;
    lastModified: Date;
};

function addFilesTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS files_table(
        id              int(32) primary key,
        name            varchar(256),
        video           text,
        subs            text,
        creationDate    text,
        lastModified    text
    );
    `;
   const stmt = db.prepare(sql).run();
}

export async function addFileEntry(file: File, filepath: String, srtFilepath: String) {
    const getNumSql = `
        SELECT MAX(id)
        FROM files_table;`;
    let getNum = db.prepare(getNumSql).get();
    getNum = getNum == null ? 0 : (Object.values(getNum)[0] + 1);

    const sql = `
        INSERT INTO files_table( 
            id, 
            name, 
            video, 
            subs,
            creationDate, 
            lastModified )
        VALUES ( ?, ?, ?, ?, ?, ?);`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run(getNum, file.name, filepath, srtFilepath, (new Date()).toDateString(), file.lastModified);
}

export function updateFileName(fileId: number, filename: String) {
    const sql = `
        UPDATE files_table
        SET name = ?, lastModified = ?
        WHERE id = ?;`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run(filename, (new Date()).toDateString(), fileId);
}

export function updateFileTime(fileId: number) {
    const sql = `
        UPDATE files_table
        SET lastModified = ?
        WHERE id = ?;`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run((new Date()).toDateString(), fileId);
}

export function getEntry(id: number) {
    if (id === -1) {
        const sql = `
            SELECT *
            FROM files_table;`;
        const stmt = db.prepare(sql).all();
        return stmt;
    } else {
        const sql = `
            SELECT *
            FROM files_table
            WHERE id=?;`;
        const stmt = db.prepare(sql).get(id);
        return stmt;
    }
}

export function deleteEntry(id: number) {
    const sql = `
        DELETE FROM files_table
        WHERE id=?;`;
    const stmt = db.prepare(sql).run(id);
}