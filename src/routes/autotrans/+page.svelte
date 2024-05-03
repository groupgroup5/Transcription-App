<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Transcript from './transcript/Transcript.svelte';
    import Upload from './upload/Upload.svelte';
    
    let isTranscribed = false;

    let segments: any[] = [];
    let text = '';
    let content: string[] = [];

    const loadItems = async () => {
        const response = await fetch('output.txt');
        text = await response.text();
        content = text.split('\n');
        segments = content.map((line, index) => ({
            id: index,
            startTimestamp: line.substring(1, 7),
            endTimestamp: line.substring(12, 18),
            text: line.substring(22)
        }));
    };
    
    function handleTranscribe() {
        loadItems();
    }

</script>
  
<div id="editor-container">
    <aside>
      <div id="video-container">
        <Upload on:transcribe={handleTranscribe}/>
      </div>
    </aside>

    <main>
      <div id="main-content">
        <Transcript {segments}/>
      </div>
    </main>
</div>
  
<style>
  
    #video-container {
      height: 30vh;
      width: 100%;
      background-color: #1C1B1F;
      color: white;
      padding: 5px;
    }
  
  
    #editor-container {
      display: flex;
      flex-direction: row;
      height: 95vh;
    }
  
    aside {
      background: #4A454E;
      height: 100%;
      width: 30vw;
      min-width: 350px;
    }
  
    main {
      background: #FAECFF;
      height: 100%;
      width: 70vw;
      align-items: center;
      min-width: 800px;
    }
  
    #main-content {
      display: grid;
      flex-direction: column;
      height: calc(100% - 80px);
      width: calc(100% - 80px);
      background-color: white;
      margin: 40px;
      margin-bottom: 0px;
      padding: 20px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
</style>