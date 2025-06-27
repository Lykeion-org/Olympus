<script lang="ts">
    import BorderedCard from "$lib/components/elements/BorderedCard.svelte";
    import type { Word } from "$lib/lexora/models";
    import StatusIndicator from "$lib/components/elements/StatusIndicator.svelte";
    import { goto } from "$app/navigation";
    import { TestLanguageService } from "$lib/lexora/development";
    import { onMount } from "svelte";

    
    
    let pendingReviews:Word[] = $state([]); 

    onMount(async ()=> {
        const service = new TestLanguageService();    
        const word = await service.getWordByUid("coffee-word-nl-sng");
        pendingReviews.push(word);
    });

</script>

<BorderedCard>
        {#snippet Title()}
            Connected words
        {/snippet}
        {#snippet Content()}
        <div class="flex flex-col w-full">
        <p class="my-4 text-sm">These are suggestions made by our NLP-service. Please review to add to the production database</p>
        <table class="w-full text-xs text-left">
            <thead class="bg-gray-100 text-gray-500 capitalize">
                <tr class="">
                    <th class="px-4 py-2 lowercase">uid</th>
                    <th class="px-4 py-2">word</th>
                    <th class="px-4 py-2">ipa</th>
                    <th class="px-4 py-2">sound source</th>
                    <th class="px-4 py-2">attributes set</th>
                    <th class="px-4 py-2">actions</th>
                </tr>
            </thead>
        {#if pendingReviews.length != 0}
            <tbody class="font-light text-sm">
                {#each pendingReviews as word, index}
                    <tr class="border-b border-gray-200">
                        <td class="px-4 py-2">{word.uid}</td>
                        <td class="px-4 py-2">{word.word}</td>
                        <td class="px-4 py-2">{word.ipa}</td>
                        <td class="px-4 py-2">{word.soundSource} </td>
                        <td class="px-4 py-2">
                            <StatusIndicator text={word.attributes ? "set" : "not set"} type={word.attributes ? "accept" : "error"} />
                        </td>
                        <td class="px-4 py-2 flex items-center gap-2 justify-end">
                            <button class="secondary-btn icon-btn" onclick={()=>{goto("/lexora/pending/" + word.uid)}}>
                                review
                            </button>
                            <button class="secondary-btn icon-btn" onclick={()=>{goto("/lexora/pending/" + word.uid)}}>
                                discard
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
            {:else}
            <tbody>
                <tr>
                    <td>No words to be reviewed. You can add new words, by uploading a text in the text-analyzer</td>
                </tr>
            </tbody>
            {/if}
        </table>
        </div>
        {/snippet}
    </BorderedCard>