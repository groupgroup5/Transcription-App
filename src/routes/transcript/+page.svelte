<script lang="ts">
    import { writable } from 'svelte/store';
    import {onMount} from 'svelte';

    let text = '';
    let content: string[] = [];

    let fileInput: HTMLInputElement | null = null;
    let uploadedFileName: string | null = null;
    const popupOpen = writable(false);

    onMount(() => {
        loadItems();
    });

    const loadItems = async () => {
        const response = await fetch('output.txt');
        text = await response.text();
        content = text.split('\n');
    };

    function togglePopup() {
        popupOpen.update(n => !n);
    }

    function handleFileUpload(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files) {
            uploadedFileName = files[0].name;
            // Handle uploaded files here
        }
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy'; // Visual feedback
        }
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

    {#if uploadedFileName}
        <button on:click={togglePopup} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Transcribe
        </button>
    {:else}
        <label for="file-upload" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Upload
        </label>
        <input id="file-upload" type="file" accept="audio/*" class="hidden" bind:this={fileInput} />
    {/if}
    
    {#if $popupOpen}
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center h-screen w-screen">
            <div class="bg-white p-6 rounded h-3/4 w-1/2 overflow-y-auto">
                <div class="flex justify-between items-center">
                    <p class="text-2xl font-bold pt-2 pb-4">Transcription</p>
                    <button on:click={togglePopup} class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {#each content as line (line)}
                        <p class="mt-2">{line}</p>
                {/each}
            </div>
        </div>
    {/if}

    <div class="mt-4 p-4 bg-gray-100 rounded">
        {#if uploadedFileName}
          <p class="text-green-500">Uploaded {uploadedFileName}.</p>
        {:else}
          <p class="text-red-500">No file. Please upload your audio.</p>
        {/if}
    </div>
</div>
  