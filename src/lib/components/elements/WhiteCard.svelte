<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props {Title: Snippet, Content: Snippet};

    let {Title, Content }:Props = $props();

</script>

<div class="w-full p-6 bg-base-100 shadow-md rounded-xl">
    <span class="w-full flex justify-between items-center">    
        <h2 class="text-xl font-bold mb-2">
            {@render Title()}
        </h2>

    </span>
        {@render Content()}
</div>