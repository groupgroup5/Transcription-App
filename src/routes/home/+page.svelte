<script lang="ts">
  import { goto } from "$app/navigation";
  import { FormInput, User } from "lucide-svelte";

  
  class Project {
    private _id: number;
    private _name: string;
    private _lastEdit: Date;
    private _lastOpen: Date;
    
    constructor(id: number, name: string, lastEdit: Date, lastOpen: Date) {
      this._id = id;
      this._name = name;
      this._lastEdit = lastEdit;
      this._lastOpen = lastOpen;
    }

    get name() : string {
      return this._name;
    }
    get lastEdit() : Date {
      return this._lastEdit;
    }
    get lastOpen() : Date {
      return this._lastOpen;
    }
    get id() : Number {
      return this._id;
    }

    set name(value: string) {
      this._name = value;
    }
    set lastEdit(value: Date) {
      this._lastEdit = value;
    }
    set lastOpen(value: Date) {
      this._lastOpen = value;
    }
  }

  let currentFile: HTMLFormElement;

  let projects: Array<Project> = [
    new Project(1, "CS 199 Project", new Date(2024, 1, 2), new Date(2024, 1, 2)),
    new Project(2, "My Field Trip", new Date(2024, 1, 3), new Date(2024, 1, 5)),
    new Project(3, "CS 192 Project", new Date(2024, 1, 4), new Date(2024, 1, 13)),
    new Project(4, "Graduation Video", new Date(2024, 2, 1), new Date(2024, 3, 22)),
    new Project(5, "My Cover", new Date(2024, 2, 2), new Date(2024, 3, 20)),
    new Project(6, "Secret", new Date(2024, 3, 2), new Date(2024, 4, 6)),
  ];

  function clickFileOptions(){
    //open pop up menu for file options (delete, rename, move, export)
  }

  let sortOptions = ["Recently Opened", "Recently Edited", "Name"]
  let searchTerm = '';
  let sortBy = "Recently Opened";
  let sortedProjects = projects;

  function sortProjects(sortBy: String){
    switch (sortBy) {
      case "Name":
        return projects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Recently Edited":
        return projects.sort(function(a, b) { 
          if (a.lastEdit > b.lastEdit){
            return 1;
          } else {
            return -1;
          }}
        );
        break;
      default:
        return projects.sort(function(a, b) { 
          if (a.lastOpen > b.lastOpen){
            return 1;
          } else {
            return -1;
          }}
        );
        break;
    }
  }

  $: sortedProjects = sortProjects(sortBy);
  $: filteredProjects = sortedProjects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()));

</script>


<div class="container mx-auto px-4 my-2 w-15/16">
  <h1 class="text-4xl font-bold mb-4 mr-4">Create File</h1>
  <div class="flex flex-row my-8 mx-30 w-15/16 place-content-evenly">
      <label class="rounded-md p-2 w-64 h-12 border border-gray-300 text-center align-middle hover:border-0 hover:bg-sky-600 hover:text-white">
        Import File
        <form method="POST" enctype="multipart/form-data" bind:this={currentFile} action="?/uploadFile">
          <input type="file" name="importFile" accept="audio/*,video/*" style="display: none;" on:change={() => currentFile.requestSubmit()} />
        </form>
      </label>
    
    <button on:click={ () => goto('/editor') } class="rounded-md p-2 w-64 h-12 border border-gray-300 text-center align-middle hover:border-0 hover:bg-sky-600 hover:text-white">Blank File</button>
  </div>
  
  <div class="grid grid-rows-2 grid-cols-2 my-8 mx-0 justify-between items-center">
    <h1 class="row-span-2 self-start text-4xl font-bold mb-4 mr-4">All Files</h1>
    <input class="border border-gray-300 rounded-md p-2 w-64 justify-self-end" type="text" bind:value={searchTerm} placeholder="Search projects..." />
    <select bind:value={sortBy} on:change={() => sortProjects(sortBy)} class="text-gray h-7 w-fit justify-self-end">
      {#each sortOptions as sortOption(sortOption)}
        <option value={sortOption}>{sortOption}</option>
      {/each}
    </select>
  </div>

  <div class="flex flex-col w-full space-y-2 self-center overflow-y-auto">
    {#each filteredProjects as project (project.id)}
      <button on:click={ () => goto('/editor') } class="flex flex-rows justify-between border border-gray-300 p-2 h-12 rounded-lg items-center hover:bg-gray-300">
          <h2 class="text-2xl font-bold mb-2">{project.name}</h2>
          <button class="text-2xl font-bold mb-2">⋯</button>
      </button>
    {/each}
  </div>
</div>
