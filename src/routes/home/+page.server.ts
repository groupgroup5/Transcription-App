import type { Actions } from "@sveltejs/kit";
import fs from "node:fs";
import { addFileEntry } from "$lib/server/db";

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
        fs.writeFileSync(filepath, "", "base64");
        addFileEntry(file, filepath, newSrtFilepath);
    }
}