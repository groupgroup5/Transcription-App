<!-- TODO
- Proper sorting of text segments. It should not be possible to enter a timestamp earlier than the previous ones

-->

<script lang="ts">
    import Segment from './Segment.svelte';

    type Segment = {
        id: number, 
        startTimestamp: string, 
        endTimestamp: string, 
        text: string
    }

    export let segments: Segment[] = [];

    function addNewSegment(){
        let previousSegment = segments[segments.length - 1];
        let previousSegmentEndTimestamp = (segments.length ? previousSegment.endTimestamp : "00:00:00");

        let newSegment = {
                id: segments.length,
                startTimestamp: previousSegmentEndTimestamp,
                endTimestamp: "",
                text: ""
            };
        newSegment.endTimestamp = newSegment.startTimestamp;

        console.log(newSegment.id);
        segments = [...segments, newSegment];
    }
    function removeSegment(current: Segment){
        segments = segments.filter((segment) => segment.id !== current.id);
    }

</script>


{#each segments as segment(segment.id)}
    <Segment removeSegment={()=>removeSegment(segment)} bind:segment={segment} />
{/each}
<button type="button" on:click={addNewSegment} class="rounded-md p-2 w-64 h-12 border border-gray-300 text-center align-middle hover:border-0 hover:bg-sky-600 hover:text-white">Add New Segment</button>


