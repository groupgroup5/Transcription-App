<script lang="ts">
  import { goto } from "$app/navigation";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { Project } from "$lib/types/Project.ts";
  import type { PageData } from './$types';

	export let data: PageData;
  $: projects = data.projects as Project[];

  let currentFile: HTMLFormElement;
  let currentRename: HTMLFormElement;
  let currentDelete: HTMLFormElement;
  let currentExport: HTMLFormElement;

  function clickImportFile() {
    currentFile.requestSubmit();
    const id = projects[-1].id;
    goto(`editor/?id=${id}`);
  }

  function clickFile(id: number) {
    goto(`editor/?id=${id}`);
  }

  function clickRenameFile() {
    currentRename.requestSubmit();
  }

  function clickDeleteFile() {
    currentDelete.requestSubmit();
  }

  let sortOptions = ["Recently Edited", "Date Created", "Name"]
  let searchTerm = '';
  let sortBy = "Recently Edited";
  let sortedProjects = projects;

  function sortProjects(sortBy: String){
    switch (sortBy) {
      case "Name":
        return projects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Recently Edited":
        return projects.sort((a, b) => a.lastModified.localeCompare(b.lastModified));
        break;
      default:
        return projects.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
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
          <input type="file" name="importFile" accept="audio/*,video/*" style="display: none;" on:change={() => {clickImportFile()}} />
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
      <div class="flex flex-rows justify-between border border-gray-300 p-2 h-12 rounded-lg items-center hover:bg-gray-300">
          <button class="text-2xl font-bold mb-2 outline-none" on:click={() => {clickFile(project.id)}}>{ project.name }</button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>⋯</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Label>File Options</DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Dialog.Root>
                    <Dialog.Trigger>Rename File</Dialog.Trigger>
                    <Dialog.Content class="sm:max-w-[425px]">
                      <div class="grid gap-4 py-4">
                        <form method="POST" bind:this={ currentRename } action="?/renameFile">
                          <label>
                            Rename File
                            <input type="text" name="renameFileString">
                          </label>
                          <input type="hidden" name="renameFileId" value={ project.id }>
                          <button on:click={() => clickRenameFile()}>Save changes</button>
                        </form>
                      </div>
                    </Dialog.Content>
                  </Dialog.Root>
                </DropdownMenu.Item>
                <form method="POST" bind:this={ currentDelete } action="?/deleteFile">
                  <DropdownMenu.Item on:click={() => clickDeleteFile()}>
                    <label>
                      Delete File
                      <input type="hidden" name="deleteFile" value={ project.id }>
                    </label>
                  </DropdownMenu.Item>
                </form>
                <DropdownMenu.Item on:click={() => goto(`${project.subs}`)}>
                  Export File
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
    {/each}
  </div>
</div>
