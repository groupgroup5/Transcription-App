import type { Actions } from "@sveltejs/kit";
import fs from "node:fs";
import * as db from "$lib/server/db";
import type { Project } from "$lib/types/Project.js";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        projects: db.getEntry(-1),
        title: 'Home',
    };
};

export const actions: Actions = {
    uploadFile: async({ request }) => {
        const uploadFileForm = await request.formData();

        const file = uploadFileForm.get('importFile')?.valueOf() as File;
        console.log(
            file?.name,
            file?.type,
            file?.webkitRelativePath
        );

        const buffer = Buffer.from(await file.arrayBuffer());
        let newFileName = file.name.replace(/[.](?=.*[.])/g, "");
        newFileName = newFileName.replace(/\s+/g, "");

        let filepath = 'src/uploads/audio-video/' + newFileName;
        fs.writeFileSync(filepath, buffer, "base64");

        let newSrtFilepath = 'src/uploads/srt/' + newFileName.slice(0, -3) + 'srt'
        fs.writeFileSync(newSrtFilepath, " ", "base64");

        db.addFileEntry(file, filepath, newSrtFilepath);
    },
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