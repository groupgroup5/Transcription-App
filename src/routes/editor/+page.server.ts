import type { Actions } from "@sveltejs/kit";
import fs from "node:fs";
import * as db from "$lib/server/db";
import type { Project } from "$lib/types/Project.js";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
    let id = url.searchParams.get('id');
    let file = db.getEntry(id === null? -1 : parseInt(id)) as Project;
    db.updateFileTime(file.id);

    return {
        file: file as unknown,
        filecontent: fs.existsSync(file.subs) ? fs.readFileSync(file.subs, {encoding: 'utf8'}) : null,
        title: 'Editor',
    };
};

export const actions: Actions = {
    renameFile: async({ request }) => {
        const renameFileForm = await request.formData();

        const id = renameFileForm.get('renameFileId')?.valueOf() as number;
        const filename = renameFileForm.get('renameFileString')?.valueOf() as string;
        console.log(id, filename);
    },
    deleteFile: async({ request }) => {
        const deleteFileForm = await request.formData();

        const id = deleteFileForm.get('deleteFile')?.valueOf() as number;
        console.log(id);

        let entryToDelete = db.getEntry(id) as Project;

        if (fs.existsSync(entryToDelete.subs)) {
            fs.unlink(entryToDelete.subs, (err => {if (err) console.log(err);}));
        }
        fs.unlink(entryToDelete.video, (err => {if (err) console.log(err);}));
        db.deleteEntry(id);
    },
    saveFile: async({request}) => {
        const saveFileForm = await request.formData();

        const id = saveFileForm.get('fileId')?.valueOf() as number;
        const content = saveFileForm.get('content')?.valueOf() as File;
        console.log(id, content);

        let entryToSave = db.getEntry(id) as Project;
        const filepath = entryToSave.subs;

        const buffer = Buffer.from(await content.arrayBuffer());

        fs.writeFileSync(filepath, buffer, "base64");
        db.updateFileTime(id);
    }
}