<!-- TODO
    - Properly update internal segment value when edited
-->

<script lang="ts" context="module">

  export type SegmentType = { // a discrete part of the transcript
          id: number, 
          startTimestamp: string, 
          endTimestamp: string, 
          text: string
  }
  
</script>

<script lang="ts">

export let segment : SegmentType = {
  id: 0,
  startTimestamp: "00:00:00",
  endTimestamp: "00:00:00",
  text: ""
}

export let removeSegment;

</script>

<div class="editor-line">
    <div id="inline-timestamp">
        <div contenteditable="true" bind:textContent={segment.startTimestamp}></div>
        <!-- TODO 
        - Improve timestamp input validly and ease of input
            - Should only allow numbers, not allow changing modifying ":", and not more than 2 numbers for minutes and seconds
        - Initial timestamp being 00:00:00 means it can clickable
        - Timestamp clickability:
            - one click seeks the given time
            - two clicks edits the input
        -->
        <div contenteditable="true" bind:textContent={segment.endTimestamp}></div>
    </div>
    <div id="inline-text" contenteditable="true" bind:textContent={segment.text}></div>
    <button on:click={removeSegment} type="button" class="border-2  border-gray-300 text-center align-middle hover:border-0 hover:bg-red-700 hover:text-white rounded-full size-7">x</button>
</div>


<style>

  .editor-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }

  #inline-timestamp {
    height: 100%;
    font-family: 'Courier New', Courier, monospace;
  }

  #inline-text{
    height: 100%;
    width: calc(85% - 10px);
    margin-left: 20px;
  }

</style>