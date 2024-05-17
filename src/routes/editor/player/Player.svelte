<script>
    import 'vidstack/bundle';
    export let src = "";


</script>

<media-player title="The Recording" {src}>
    <media-provider></media-provider>
    <media-audio-layout></media-audio-layout>
    <media-video-layout></media-video-layout>
</media-player>

<style>

media-player { /* Recommended by vidstack to avoid sudden layout shifts */
    aspect-ratio: 16 / 9;
}


</style>


