<script lang="ts">
    // made to export a single class, "Project"
    export class Project {
        private _id: number;
        private _name: string;
        private _video: string;
        private _subs: string;
        private _creationDate: string; 
        private _lastModified: string;
        
        constructor(id: number, name: string, video: string, subs: string, creationDate: string, lastModified: string) {
        this._id = id;
        this._name = name;
        this._video = video;
        this._subs = subs;
        this._creationDate = creationDate;
        this._lastModified = lastModified;
        }

        get name() : string {
        return this._name;
        }
        get creationDate() : string {
        return this._creationDate;
        }
        get lastModified() : string {
        return this._lastModified;
        }
        get video() : string {
        return this._video;
        }
        get subs() : string {
        return this._subs;
        }
        get id() : number {
        return this._id;
        }

        set name(value: string) {
        this._name = value;
        }
        set lastModified(value: string) {
        this._lastModified = value;
        }
    }
</script>