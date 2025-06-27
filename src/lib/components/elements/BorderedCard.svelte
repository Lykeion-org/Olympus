<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props {Title: Snippet, Content: Snippet};

    let {Title, Content }:Props = $props();

</script>

<div class="w-full p-6 bg-base-100 border-1 border-base-300 rounded-xl mb-4">
        <h3 class="text-medium font-semibold">
            {@render Title()}
        </h3>
        <div class="flex justify-between items-center mt-2">
            {@render Content()}
        </div>
    </div>

