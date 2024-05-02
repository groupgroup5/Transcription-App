import Database from 'better-sqlite3';

let currentFileId: string = localStorage.get('currentFileId');
if (!currentFileId) {
    localStorage.setItem('currentFileId', '0');
}

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
        id              char(32) primary key,
        name            varchar(256),
        video           text,
        subs            text,
        creationDate    date,
        lastModified    date,
    );
    `;
    db.exec(sql);
}

export async function addFileEntry(file: File) {
    currentFileId = (Number(currentFileId) + 1).toString();
    localStorage.setItem('currentFileId', currentFileId);

    const sql = `
        INSERT INTO files_table( 
            id, 
            name, 
            video, 
            creationDate, 
            lastModified )
        VALUES ( ?, ?, ?, ?, ?);`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run(Number(currentFileId), file.name, file.webkitRelativePath, new Date(), file.lastModified);
}

export async function updateFileEntry(fileId: number, file: File) {
    const sql = `
        UPDATE files_table
        SET name = ?, lastModified = ?
        WHERE id = ?;`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run(file.name, file.lastModified, fileId);
}