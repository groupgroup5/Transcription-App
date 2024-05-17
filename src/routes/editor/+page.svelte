<script lang="ts">
  import Transcript from './transcript/Transcript.svelte';
  import type { PageData } from './$types';
  import type { Project } from "$lib/types/Project";
	
	export let data: PageData;
  let openFile = data.file as Project;
  let openFileContent = data.filecontent;

  
  let segments = [
        { id: 0, startTimestamp: "00:00:00", endTimestamp: "00:00:00", text: "" },
        { id: 1, startTimestamp: "00:00:00", endTimestamp: "00:00:00", text: "" },
        { id: 2, startTimestamp: "00:00:00", endTimestamp: "00:00:00", text: "" }
    ];

</script>

<div id="editor-container">
  <aside>
    <div id="video-container">
      {#await import('./player/Player.svelte') then { default: Player }}
      <svelte:component this={Player} />
      {/await}
    </div>
    <div class="other-taskbar">
      <div id="video-taskbar">
        <p>Video Taskbar</p>
      </div>
      <div id="text-taskbar">
        <p>Text Editor Taskbar</p>
      </div>
    </div>
  </aside>
  <main>
  
    <div id="main-content">
      <Transcript {segments}/>
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