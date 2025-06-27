<script lang="ts">
    import BorderedCard from '$lib/components/elements/BorderedCard.svelte';
    import { onMount } from "svelte";
    import type { PageProps } from './$types';
    import type { Word, WordAttributes } from "$lib/lexora/models";
    import WhiteCard from '$lib/components/elements/WhiteCard.svelte';
    import StatusIndicator from '$lib/components/elements/StatusIndicator.svelte';
    import { goto } from '$app/navigation';
    import CopyButton from '$lib/components/elements/CopyButton.svelte';
    let { data }: PageProps = $props();

    let word:Word = $state(data.word);
    let showEditScreen:boolean = $state(false);
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
    let lastSymbolUid: string | null = $state(null);

    
    
    onMount( ()=> {
        lastReferentUid = window.sessionStorage.getItem('_active_referent') || null;
        lastSymbolUid = window.sessionStorage.getItem('_active_symbol') || null;
        if(!word.attributes){ word.attributes = {...defaultWordAtrributes};}
    });

</script>

<div class="card card-lg w-full bg-base-100 shadow-md">
    <div class="card-body">
        <div class="card-title flex justify-between">
            <h2 class="text-xl font-bold mb-2">Word</h2>
            {#if lastReferentUid && lastSymbolUid}
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="/lexora/referents/{lastReferentUid}">Referent</a></li>
                    <li><a href="/lexora/symbols/{lastSymbolUid}">Symbol</a></li>
                    <li>Word</li>
                </ul>
            </div>
            {/if}
        </div>
        <div class="card card-md card-border border-base-300">
            <div class="card-body flex-row justify-between">
                <div>
                    <h3 class="card-title text-medium font-semibold">Word info</h3>
                    <div class="text-sm flex flex-col text-gray-500">
                        <span class="text-medium font-semibold font-stretch-expanded capitalize">{word.word? word.word : "No word set"}</span>
                        <span>
                            word uid: {word.uid ? word.uid : "unknown ID"}
                            {#if word.uid}
                            <CopyButton textToCopy={word.uid} />
                            {/if}
                        </span>
                        <span>word ipa: {word.ipa ? word.ipa : "unknown ipa"}</span>
                        <span>word sound source: {word.soundSource ? word.soundSource : "unknown sound source"}</span>
                    </div>
                </div>
                <div class="self-center flex gap-2 card-actions">
                    <button class="btn btn-ghost btn-square" onclick={()=> {document.getElementById('word_edit').showModal()}} aria-label="edit">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        </figure>
                    </button>
                    <button class="btn btn-ghost btn-square" aria-label="delete">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </figure>
                    </button>
                </div>
            </div>
        </div>
        <div class="card card-md card-border border-base-300 mt-2">
            <div class="card-body flex-row justify-between">
                <div class="w-1/3">
                    <h3 class="card-title text-medium font-semibold">Word attributes</h3>
                    <ul class="list">
                    {#each Object.entries(word.attributes) as [key, value]}
                        <li class="list-row flex  justify-between">
                            <span>{key}: </span>
                            {#if typeof value === 'boolean'}
                                {#if value}
                                <div class="badge badge-soft badge-success">true</div>
                                {:else}
                                <div class="badge badge-soft badge-error">false</div>
                                {/if}
                            {:else}
                            <span>{data.attributeLabels[key] ? data.attributeLabels[key][value] :value}</span>
                            {/if}
                        </li>
                    {/each}
                    </ul>
                </div>
                <div class="card-actions flex gap-2 self-center">
                    <button type="button" onclick={()=> {document.getElementById('attribute_edit').showModal()}} class="btn btn-ghost btn-square" aria-label={"edit-referent"}> 
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </figure>
                    </button>
                    <button type="button" onclick={()=> {}} class="btn btn-ghost btn-square" aria-label="delete-referent">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
                            </svg>
                        </figure>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    
<dialog id="word_edit" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit word!</h3>
        <p>Please edit all the word info</p>
        <form action="?/update" method="POST">
            <input type="hidden" value={word.uid} name="wordUid" />
            
            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>Word</span>
                    <input type="text" name="word" placeholder="Word" bind:value={word.word} class="input input-md" />
                </label>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>IPA</span>
                    <input type="text" name="ipa" placeholder="IPA" bind:value={word.ipa} class="input input-md" />
                </label>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>Sound source</span>
                    <input type="text" name="word" placeholder="Sound source" bind:value={word.soundSource} class="input input-md" />
                </label>
            </fieldset>

            <div>
                <input type="submit" class="btn btn-success" value="save">
                <button type="button" class="btn btn-error" onclick={() =>document.getElementById('word_edit').close()}>close</button>
            </div>
    </form>
    </div>
</dialog>

<dialog id="attribute_edit" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit word attributes!</h3>
        <p>Please edit all the word info</p>
        <form action="?/updateAttribute" method="POST" class="flex flex-col">
            <input type="hidden" value={word.uid} name="wordUid" />
            <input type="hidden" value={word.attributes?.aspect} name="wordUid" />
            <input type="hidden" value={word.attributes?.case} name="case" />
            <input type="hidden" value={word.attributes?.gender} name="gender" />
            <input type="hidden" value={word.attributes?.mood} name="mood" />
            <input type="hidden" value={word.attributes?.number} name="number" />
            <input type="hidden" value={word.attributes?.person} name="person" />
            <input type="hidden" value={word.attributes?.tense} name="tense" />
            
            {#if word.attributes}
            {#each Object.entries(word.attributes) as [key, value], index}
            {#if typeof value === 'boolean'}
            <label class="label flex max-w-[200px] justify-between items-center">
                {key}:
                <input type="checkbox" name={key} bind:checked={word.attributes[key as keyof WordAttributes]} class="toggle toggle-primary" />
            </label>
            {:else if data.attributeLabels[key]}
            <fieldset class="fieldset flex">
                <legend class="fieldset-legend">{key}</legend>
                <button type="button" class="btn max-w-[120px]" popovertarget="popover-{index}" style="anchor-name:--anchor-{index}">
                        {data.attributeLabels[key][value]}  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-{index}" style="position-anchor:--anchor-{index}">
                {#each data.attributeLabels[key]  as label, i }
                    <li>
                        <button type="button" onclick={ ()=> {word.attributes[key as keyof WordAttributes] = i } }>{label}</button>
                    </li>
                {/each}
                </ul>
            </fieldset>
            {:else}
            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>{key}</span>
                    <input type="text" name={key} placeholder={key} bind:value={word.attributes[key as keyof WordAttributes]} class="input input-md" />
                </label>
            </fieldset>
            {/if}
            {/each}
            {/if}
            

            <div>
                <input type="submit" class="btn btn-success" value="save">
                <button type="button" class="btn btn-error" onclick={() =>document.getElementById('attribute_edit').close()}>close</button>
            </div>
    </form>
    </div>
</dialog>

{#if showEditScreen}
<div class="w-screen min-h-screen absolute top-0 left-0 bg-gray-100/80 flex items-center justify-center">
    <div class="w-1/3 min-h-1/2 bg-white rounded-lg shadow-md p-12">
        <h2 class="text-xl font-bold mb-2">Edit Word</h2>
        <form action="?/update" method="POST" class="flex flex-col">
            <input type="hidden" value={word.uid} name="wordUid" />
            <label class="flex flex-col text-sm flex flex-col text-gray-500 ">
                Word:
                <input type="text" name="word" bind:value={word.word} class="input-container" required />
            </label>
            <label class="flex flex-col text-sm flex flex-col text-gray-500 ">
                IPA:
                <input type="text" name="ipa" bind:value={word.ipa} class="input-container" />
            </label>
            <label class="flex flex-col text-sm flex flex-col text-gray-500 ">
                Sound source:
                <input type="text" name="soundSource" bind:value={word.soundSource} class="input-container" />
            </label>
            {#if word.attributes}
            {#each Object.entries(word.attributes) as [key, value], index}
                <label for={key} class="flex items-center justify-between w-1/2 text-sm text-gray-500"> 
                    {key}: 
                    {#if typeof value === 'boolean'}
                    <input type="checkbox" name={key} checked={value} />
                    
                    {:else if data.attributeLabels[key]}
                    <select name={key} class="input-container" bind:value={word.attributes[key as keyof WordAttributes]}>
                        {#each data.attributeLabels[key] as label,i}
                        <option value={i}>
                            {label}
                        </option>
                        {/each}
                    </select>
                    {:else}
                        <input type="text" name={key} bind:value={word.attributes[key as keyof WordAttributes]} />
                    {/if}
                    </label>
            {/each}
            {/if}
            <div>
                <input type="submit" class="primary-btn btn-accept" value="save">
                <button type="button" class="primary-btn btn-error" onclick={() => { showEditScreen = false; }}>Close</button>
            </div>

        </form>
    </div>
</div>
{/if}