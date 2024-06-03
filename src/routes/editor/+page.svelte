<script lang="ts">
  import Transcript from './transcript/Transcript.svelte';
  import type { PageData } from './$types';
  import type { Project } from "$lib/types/Project";
  import type { SegmentType } from './transcript/Segment.svelte';
	
	export let data: PageData;
  const openFile = data.file as Project;
  const filepathToVid = openFile.video;
  
  // Load transcript file content to segments variable
  let transcriptFileContent = data.filecontent; 
  let contentAsArray = (transcriptFileContent === null ? [] : transcriptFileContent.split('\n'));
  let segments: SegmentType[] = contentAsArray.map((line, index) => ({
          id: index,
          startTimestamp: line.substring(1, 7),
          endTimestamp: line.substring(12, 18),
          text: line.substring(21)
  }));

  let contentInArray = [];
  $: contentInArray = segments.map((segment) => (
      "[" + segment.startTimestamp + "s -> " + segment.endTimestamp + "s] " + segment.text
    ));
    
  $: transcriptFileContent = contentInArray.join("\n");

  let saveFile: HTMLFormElement;

  function saveFileFunc() {
    saveFile.requestSubmit();
  }


</script>

<div id="editor-container">
  <aside>
    <div id="video-container">
      {#await import('./player/Player.svelte') then { default: Player }}
      <svelte:component this={Player} src={filepathToVid} />
      {/await}
    </div>
    <div class="other-taskbar">
      <div id="video-taskbar">
        <p>Video Taskbar</p>
      </div>
      <div id="text-taskbar">
        <p>Text Editor Taskbar</p>
        <form method="POST" bind:this={ saveFile } action="?/saveFile">
          <input type="hidden" name="fileId" bind:value={ openFile.id } />
          <input type="hidden" name="content" bind:value={ transcriptFileContent } />
          <button type="button" on:click={ () => {saveFileFunc();} } class="rounded-md p-2 w-64 h-12 border border-gray-300 text-center align-middle hover:border-0 hover:bg-sky-600 hover:text-white">Save Transcript</button>
        </form>
      </div>
    </div>
  </aside>
  <main>
  
    <div id="main-content">
      <Transcript bind:segments={segments}/>
    </div>
  </main>
</div>

<style>
  .other-taskbar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #video-taskbar {
    display: flex;
    flex-direction: row;
    height: 20vh;
    width: 90%;
    background-color: #0c0c1b;
    margin-top: 30px;
    margin-bottom: 0px;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }

  #text-taskbar {
    display: flex;
    flex-direction: column;
    height: 32vh;
    width: 90%;
    background-color: #0c0c1b;
    margin: 30px;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }

  #video-container {
    height: 30vh;
    width: 100%;
    background-color: #0c0c1b;
    color: white;
    padding: 5px;
  }


  #editor-container {
    display: flex;
    flex-direction: row;
    height: 95vh;
  }

  aside {
    background: #19172c;
    height: 100%;
    width: 30vw;
    min-width: 350px;
  }

  main {
    height: 100%;
    width: 70vw;
    align-items: center;
    min-width: 800px;
  }

  #main-content {
    display: grid;
    border-color: #19172c;
    border-width: 2px;
    flex-direction: column;
    height: calc(100% - 80px);
    width: calc(100% - 80px);
    margin: 40px;
    margin-bottom: 0px;
    padding: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 5px;
  }
</style>