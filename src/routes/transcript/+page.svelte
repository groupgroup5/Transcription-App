<script lang="ts">
    let fileInput: HTMLInputElement | null = null;
    let uploadedFileName: string | null = null;

    function handleFileUpload(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files) {
            uploadedFileName = files[0].name;
            // Handle uploaded files here
        }
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files) {
            uploadedFileName = files[0].name;
            // Handle dropped files here
        }
    }

    $: {
        if (fileInput) {
            fileInput.addEventListener('change', handleFileUpload);
            fileInput.addEventListener('dragover', handleDragOver);
            fileInput.addEventListener('drop', handleDrop);
        }
    }

</script>
  
<div class="flex justify-center flex-col items-center h-screen">
    <label for="file-upload" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
      Upload
    </label>
    <input id="file-upload" type="file" accept="audio/*" class="hidden" bind:this={fileInput} />

    <div class="mt-4 p-4 bg-gray-100 rounded">
        {#if uploadedFileName}
          <p class="text-green-500">Uploaded {uploadedFileName}.</p>
        {:else}
          <p class="text-red-500">No file. Please upload your audio.</p>
        {/if}
    </div>
</div>
  