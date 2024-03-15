<script>

    let projects = [
      { id: 1, name: "Project 1" },
      { id: 2, name: "Project 2" },
      { id: 3, name: "Project 3" },
      { id: 4, name: "Project 4" },
      { id: 5, name: "Project 5" },
      { id: 6, name: "Project 6" },
    ];
  </script>
  

<div class="container mx-auto px-4">
    <div class="my-8 mx-4">
        <h1 class="text-4xl font-bold mb-4">Welcome, Wilson.</h1>
    </div>
    <div class="grid grid-cols-3 gap-4">
      {#each projects as project (project.id)}
        <div class="card border border-gray-300 p-4 rounded-lg">
          <h2 class="text-2xl font-bold mb-2">{project.name}</h2>
          <div class="bg-gray-200 h-32"></div>
        </div>
      {/each}
    </div>
</div>