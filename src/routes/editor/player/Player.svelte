<script>
    import 'vidstack/bundle';
    let src = "https://files.vidstack.io/sprite-fight/720p.mp4";


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


