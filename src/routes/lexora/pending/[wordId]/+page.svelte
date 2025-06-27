<script lang="ts">
    import BorderedCard from '$lib/components/elements/BorderedCard.svelte';
    import { onMount } from "svelte";
    import type { PageProps } from './$types';
    import type { Word, WordAttributes } from "$lib/lexora/models";
    import WhiteCard from '$lib/components/elements/WhiteCard.svelte';
    import StatusIndicator from '$lib/components/elements/StatusIndicator.svelte';
    import { goto } from '$app/navigation';
    let { data }: PageProps = $props();

    let word:Word = $state(data.word);
    const defaultWordAtrributes: WordAttributes = {
        wordId: data.word.uid ? data.word.uid : "unknown",
        gender: 0,
        number: 0,
        unique: false,
        diminutive: false,
        case: 0,
        mood: 0,
        tense: 0,
        aspect: 0,
        person: 0,
        directObject: false,
        indirectObject: false,
        valency: -1,
        reflexive: false
    }
    let lastReferentUid: string | null = $state(null);

    
    
    onMount( ()=> {
        lastReferentUid = window.sessionStorage.getItem('_active_referent') || null;
    });

</script>

<div class="flex flex-col gap-6">
    <div class="w-full p-6 bg-white shadow-md rounded-xl">
        <span class="w-full flex justify-between items-center">    
            <h2 class="text-xl font-bold mb-2">Word</h2>
            {#if lastReferentUid}
                <span class="text-sm"><a href="/lexora/referents/{lastReferentUid}">Referent</a> / Symbol / Word</span>
            {/if}
        </span>
        
        <BorderedCard>
            {#snippet Title()}
            Word info
            {/snippet}
            {#snippet Content()}
            <div class="flex justify-between items-center mt-2">
                <div class="flex justify-start items-center gap-8">
                    <div class="text-sm flex flex-col text-gray-500">
                        <span class="text-medium font-semibold text-black font-stretch-expanded capitalize">{word.word? word.word : "No word set"}</span>
                        <span>word uid: {word.uid ? word.uid : "unknown ID"}</span>
                        <span>word ipa: {word.ipa ? word.ipa : "unknown ipa"}</span>
                        <span>word sound source: {word.soundSource ? word.soundSource : "unknown sound source"}</span>
                    </div>
                </div>
            </div>       
            {/snippet}
        </BorderedCard>
        
        <BorderedCard>
            {#snippet Title()}
                Connected symbols
            {/snippet}
            {#snippet Content()}
                <button class="btn-message primary-btn" type="button" onclick={()=>{}}>See all connected symbols</button>
            {/snippet}
        </BorderedCard>
    </div>
    <WhiteCard>
        {#snippet Title()}
                Word attributes
        {/snippet}
        {#snippet Content()}
            <BorderedCard>
            {#snippet Title()}
                Word attributes
            {/snippet}
            {#snippet Content()}
            {#if !word.wordAttributes}
                <button class="btn-message primary-btn" type="button" onclick={()=>{word.wordAttributes = {...defaultWordAtrributes};}} >Set new attributes</button>
            {:else}
            <div class="flex items-center justify-between w-full">

            <ul class="flex flex-col gap-4 w-full">
                {#each Object.entries(word.wordAttributes) as [key, value]}
                    <li class="flex items-center justify-between w-1/2 text-sm text-gray-500">
                        <span>{key}: </span>
                        {#if typeof value === 'boolean'}
                        <StatusIndicator text={value ? "true" : "false"} type={value ? "success" : "error"} />
                        {:else}
                        <span>{data.attributeLabels[key] ? data.attributeLabels[key][value] :value}</span>
                        {/if}
                    </li>
                    {/each}
                </ul>
                <div class="flex items-center gap-2">
                    <button class="secondary-btn icon-btn" onclick={()=>{goto("/lexora/words/" + word.uid)}} aria-label="edit">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </figure>
                    </button>
                    <button class="secondary-btn icon-btn" aria-label="remove">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </figure>
                    </button>
                </div>
            </div>
            {/if}
            {/snippet}
        </BorderedCard>
        {/snippet}
    </WhiteCard>
</div>
