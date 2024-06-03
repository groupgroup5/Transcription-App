import type { Actions } from "@sveltejs/kit";
import fs from "node:fs";
import * as db from "$lib/server/db";
import type { Project } from "$lib/types/Project.js";
import type { PageServerLoad } from './$types';
import { goto } from "$app/navigation";

let fileId = -1;

export const load: PageServerLoad = async ({ params, url }) => {
    let id = url.searchParams.get('id');
    id = id ? id : `${fileId}`;
    let file = db.getEntry(id === null? -1 : parseInt(id)) as Project;
    db.updateFileTime(file.id);

    return {
        file: file as unknown,
        filecontent: fs.existsSync(file.subs) ? fs.readFileSync(file.subs, {encoding: 'utf8'}) : null,
        title: 'Editor',
    };
};

export const actions: Actions = {
    saveFile: async({request}) => {
        const saveFileForm = await request.formData();

        fileId = saveFileForm.get('fileId')?.valueOf() as number;
        const id = fileId;
        const content = saveFileForm.get('content')?.valueOf() as string;

        let entryToSave = db.getEntry(id) as Project;
        const filepath = entryToSave.subs;

        console.log(content, filepath, id);

        fs.writeFileSync(filepath, content, "utf8");
    }
}