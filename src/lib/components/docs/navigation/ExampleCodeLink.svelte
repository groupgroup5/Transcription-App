<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { tabs } from '$lib/config/docs';

  $: tab = tabs.find((tab) => $page.url.pathname.startsWith(tab.href));
</script>

{#if tab?.code}
  <a
    href={tab.code}
    target="_blank"
    rel="nofollow"
    class="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
  >
    View Code
    <ArrowRight class="ml-1 h-4 w-4" />
  </a>
{/if}
