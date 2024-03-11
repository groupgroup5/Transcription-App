<script lang="ts">
  import { page } from '$app/stores';
  import { tabs } from '$lib/config/docs';
  import { cn } from '$lib/utils';
  import ExampleCodeLink from './ExampleCodeLink.svelte';

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div class="w-full">
  <div class={cn('', className)} {...$$restProps}>
    {#each tabs as tab, index (index)}
      <a
        href={tab.href}
        class={cn(
          'px-2',
          $page.url.pathname.startsWith(tab.href)
            ? 'font-bold text-primary'
            : 'font-medium text-muted-foreground'
        )}
      >
        {tab.name}
      </a>
    {/each}
  </div>
</div>
