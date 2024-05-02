import type { Actions } from "@sveltejs/kit";
import fs from "node:fs";
import Database from 'better-sqlite3';

export const actions: Actions = {
    uploadFile: async({ request }) => {
        const uploadFileForm = await request.formData();

        const file = uploadFileForm.get('importFile')?.valueOf() as File;
        console.log(
            file?.name,
            file?.type,
            file?.webkitRelativePath
        );

        // const buffer = Buffer.from(await file.arrayBuffer());
        // let newFileName = file.name.replace(/[.](?=.*[.])/g, "");
        // newFileName = newFileName.replace(/\s+/g, "");

        // let filepath = './uploads/audio-video/' + newFileName;
        // fs.writeFileSync(filepath, buffer, "base64");
    }
}