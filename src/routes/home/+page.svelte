<script>

    import { Button } from '$components/ui/button';
    import { Select } from '$components/ui/select';

    let projects = [
      { id: 1, name: "CS 199 Project" },
      { id: 2, name: "My Field Trip" },
      { id: 3, name: "CS 192 Project" },
      { id: 4, name: "Graduation Video" },
      { id: 5, name: "My Cover" },
      { id: 6, name: "Secret" },
    ];

    let searchTerm = '';

    $: filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()));

  </script>
  

<div class="container mx-auto px-4">
    <div class="my-8 mx-0 flex justify-between items-center">
      <h1 class="text-4xl font-bold mb-4 mr-4">Welcome, Wilson.</h1>
      <input class="border border-gray-300 rounded-md p-2 w-64" type="text" bind:value={searchTerm} placeholder="Search projects..." />
    </div>
    <div class="grid grid-cols-3 gap-4">
      {#each filteredProjects as project (project.id)}
        <div class="card border border-gray-300 p-4 rounded-lg">
          <h2 class="text-2xl font-bold mb-2">{project.name}</h2>
          <div class="bg-gray-200 h-40"></div>
        </div>
      {/each}
    </div>
</div>