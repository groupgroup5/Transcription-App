import Database from 'better-sqlite3';

// let currentFileId: string = localStorage.get('currentFileId');
// if (!currentFileId) {
//     localStorage.setItem('currentFileId', '0');
// }

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
        creationDate    text,
        lastModified    text
    );
    `;
    db.exec(sql);
}

export async function addFileEntry(file: File, filepath: String, srtFilepath: String) {
    // currentFileId = (Number(currentFileId) + 1).toString();
    // localStorage.setItem('currentFileId', currentFileId);

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
    const runstmt = stmt.run(0, file.name, filepath, srtFilepath, (new Date()).toDateString(), file.lastModified);
}

export async function updateFileEntry(fileId: number, filename: String) {
    const sql = `
        UPDATE files_table
        SET name = ?, lastModified = ?
        WHERE id = ?;`; 
    const stmt = db.prepare(sql);
    const runstmt = stmt.run(filename, (new Date()).toDateString(), fileId);
}