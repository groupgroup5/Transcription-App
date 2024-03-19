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