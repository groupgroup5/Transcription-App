<script lang="ts">
  const messages = [
    {
      timestamp: "00:00:00",
      message: "Ave Maria",
    },
    {
      timestamp: "00:00:00",
      message: "Gratia plena",
    },
    {
      timestamp: "00:00:00",
      message: "Maria, gratia plena",
    },
    {
      timestamp: "00:00:00",
      message: "Maria, gratia plena",
    },
    {
      timestamp: "00:00:00",
      message: "Ave, ave dominus",
    },
    {
      timestamp: "00:00:00",
      message: "Dominus tecum",
    },
    {
      timestamp: "00:00:00",
      message: "Benedicta tu in mulieribus",
    },
    {
      timestamp: "00:00:00",
      message: "Et benedictus",
    },
    {
      timestamp: "00:00:00",
      message: "Et benedictus fructus ventris",
    },
    {
      timestamp: "00:00:00",
      message: "Ventris tui, Iesus",
    },
    {
      timestamp: "00:00:00",
      message: "Ave Maria",
    },
    {
      timestamp: "00:00:00",
      message: "Ave Maria",
    },
    {
      timestamp: "00:00:00",
      message: "Mater Dei",
    },
    {
      timestamp: "00:00:00",
      message: "Ora pro nobis peccatoribus",
    },
    {
      timestamp: "00:00:00",
      message: "Ora, ora pro nobis",
    },
    {
      timestamp: "00:00:00",
      message: "Ora pro nobis peccatoribus",
    },
    {
      timestamp: "00:00:00",
      message: "Nunc et in hora mortis",
    },
    {
      timestamp: "00:00:00",
      message: "In hora mortis nostrae",
    },
    {
      timestamp: "00:00:00",
      message: "In hora mortis nostrae",
    },
    {
      timestamp: "00:00:00",
      message: "In hora mortis nostrae",
    },
    {
      timestamp: "00:00:00",
      message: "Ave Maria",
    },
  ];

  let selectedFont = "Verdana";
  let fontName = "Verdana";

  const fonts = [
    { id: 1, name: "Arial" },
    { id: 2, name: "Courier New" },
    { id: 3, name: "Georgia" },
    { id: 4, name: "Helvetica" },
    { id: 5, name: "Lucida Console" },
    { id: 6, name: "Verdana" }
  ];

</script>

<div id="editor-container">
  <aside>
    <div id="video-container">video goes here</div>
    <div class="other-taskbar">
      <div id="video-taskbar">
        <p>Video Taskbar</p>
      </div>
      <div id="text-taskbar">
        <p>Text Editor Taskbar</p>
        <select bind:value={selectedFont} on:change={() => fontName = selectedFont} style="background-color: #4A454E; color: white; width: 90%; border-radius: 3px;">
          {#each fonts as font (font)}
            <option value={font.name}>{font.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </aside>
  <main>
    <div id="main-content">
      {#each messages as message (message)}
        <div class="editor-line" style="font-family: {fontName};">
          <div id="inline-timestamp">{message.timestamp}</div>
          <div id="inline-text" contenteditable="true">{message.message}</div>
        </div>
      {/each}
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
    background-color: #1C1B1F;
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
    background-color: #1C1B1F;
    margin: 30px;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }

  #video-container {
    height: 30vh;
    width: 100%;
    background-color: #1C1B1F;
    color: white;
    padding: 5px;
  }

  .editor-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }

  #inline-timestamp {
    height: 100%;
    width: 80px;
    color: rgba(7, 76, 253, 0.30);
    font-family: 'Courier New', Courier, monospace;
  }

  #inline-text{
    height: 100%;
    width: calc(100% - 10px);
    color: #000;
    margin-left: 20px;
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