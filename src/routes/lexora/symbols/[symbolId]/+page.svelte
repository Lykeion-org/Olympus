<script lang="ts">
    import type {Symbol} from '$lib/lexora/models'
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    import { goto } from '$app/navigation';
    import CopyButton from '$lib/components/elements/CopyButton.svelte';
    let { data }: PageProps = $props();

    let lastReferentUid: string | null = $state(null);
    let symbol: Symbol = $state(data.symbol);

    onMount( ()=> {
        lastReferentUid = window.sessionStorage.getItem('_active_referent') || null;
        console.log(symbol)
;        if(data.symbol.uid) {
        window.sessionStorage.setItem('_active_symbol', data.symbol.uid);
        }
    });
</script>



<div class="card card-lg w-full bg-base-100 shadow-md">
    <div class="card-body">
        <div class="card-title flex justify-between">
            <h2 class="text-xl font-bold mb-2">Symbol</h2>
            {#if lastReferentUid}
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="/lexora/referents/{lastReferentUid}">Referent</a></li>
                    <li>Symbol</li>
                </ul>
            </div>
            {/if}
        </div>
        
        <div class="card card-md card-border border-base-300">
            <div class="card-body flex-row justify-between">
                <div>
                    <h3 class="text-medium font-semibold">Symbol information</h3>
                    <div class="text-sm flex flex-col text-gray-500">
                        <span class="flex items-center"> symbol uid: {symbol.uid ? symbol.uid : "unknown ID"}
                        {#if symbol.uid}
                            <CopyButton textToCopy={symbol.uid} />
                                {/if}
                        </span>
                        <span>symbol language: {symbol.language ? data.languages[symbol.language] : "no language provided"}</span>
                        <span>symbol type: {symbol.symbolType ? data.symbolTypes[symbol.symbolType] : "no type provided"}</span>
                    </div>
                </div>
                <div class="card-actions flex gap-2 self-center">
                    <button type="button" onclick={()=> {document.getElementById('symbol_edit').showModal()}} class="btn btn-ghost btn-square" aria-label={"edit-referent"}> 
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

        <div class="card card-md card-border border-base-300">
            <div class="card-body">
                <h3 class="text-medium font-semibold">Lemma information</h3>
                <div class="text-sm flex flex-col text-gray-500">
                    {#if symbol.lemma}
                    <span class="text-medium font-semibold font-stretch-expanded capitalize">{symbol.lemma? symbol.lemma.word : "No word for lemma"}</span>
                    <span class="flex items-center">
                        word uid: {symbol.lemma.uid ? symbol.lemma.uid : "unknown ID"}
                        {#if symbol.lemma.uid}
                        <CopyButton textToCopy={symbol.lemma.uid} />
                        {/if}
                    </span>
                    <span>word ipa: {symbol.lemma.ipa ? symbol.lemma.ipa : "no ipa set"}</span>
                    <span>word sound: {symbol.lemma.soundSource ? symbol.lemma.soundSource : "no sound target set"}</span>
                    <span>word attributes: {symbol.lemma.attributes ? "attributes are set" : "no attributes are set"}</span>
                    {:else}
                    <span class="text-medium font-semibold text-black font-stretch-expanded capitalize">"No word for lemma set"</span>
                    {/if}
                </div>
            </div>
        </div>

        <div class="card card-md card-border border-base-300 card-side">
            <div class="card-body">
                <h3 class="text-medium font-semibold">Connected words</h3>
                <table class="table table-zebra table-fixed w-full">
                    <thead class="capitalize">
                        <tr>
                            <th class="w-1/20"></th>
                            <th class="w-1/4">uid</th>
                            <th class="w-1/6">word</th>
                            <th class="w-1/6">ipa</th>
                            <th class="w-1/6">sound source</th>
                            <th class="w-1/6">attributes set</th>
                            <th class="w-1/3">actions</th>
                        </tr>
                    </thead>
            
                    {#if symbol.words}
                    <tbody class="text-sm">
                        {#each symbol.words as word, index}
                            <tr>
                                <td><CopyButton textToCopy={word.uid ? word.uid : ""} /></td>
                                <td>{word.uid} </td>
                                <td>{word.word}</td>
                                <td>{word.ipa}</td>
                                <td>{word.soundSource} </td>
                                <td>
                                    {#if word.attributes}
                                        <div class="badge badge-success">set</div>
                                    {:else}
                                        <div class="badge badge-error">not set</div>
                                    {/if}
                                </td>
                                <td class="flex items-center gap-6 justify-end">
                                    {#if !(symbol.lemma?.uid && symbol.lemma.uid === word.uid)}
                                    <form action="?/lemma" method="POST">
                                        <input type="hidden" name="symbolUid" value={symbol.uid} />
                                        <input type="hidden" name="wordUid" value={word.uid} />
                                        <button type="submit" class=" flex btn btn-warning">
                                            Set as lemma
                                        </button>
                                    </form>
                                    {/if}
                                    <button class="btn btn-square btn-ghost" onclick={()=>{goto("/lexora/words/" + word.uid)}} aria-label="edit">
                                        <figure>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        </figure>
                                    </button>
                                    <button class="btn btn-square btn-ghost" aria-label="unlink">
                                        <figure>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </figure>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                                    
                    </tbody>       
                    {:else}
                    <tbody>
                        <tr>
                            <td>No words linked</td>
                        </tr>
                    </tbody>
                    {/if}
                </table>
                <div class="p-6">
                    <button type="button" class="btn btn-primary" onclick={() => {goto('/lexora/words/new&sym=' + data.symbol.uid)} }>
                        Add new word
                    </button>
                    <button type="button" class="btn btn-ghost" >
                        Link existing word
                    </button>

                </div>
            </div>
        </div>
    </div>
</div>

<dialog id="symbol_edit" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit symbol!</h3>
        <p>Please edit all the symbol info</p>
        <form action="?/update" method="POST">
            <input type="hidden" value={symbol.uid} name="symbolUid" />
            <input type="hidden" value={symbol.language} name="symbolLanguage" />
            <input type="hidden" value={symbol.symbolType} name="symbolType" />
            
            <fieldset class="fieldset flex">
                <legend class="fieldset-legend">Symbol language: </legend>
                <button type="button" class="btn max-w-[120px]" popovertarget="popover-1" style="anchor-name:--anchor-1">
                        {data.languages[symbol.language]}  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-1" style="position-anchor:--anchor-1">
                    {#each data.languages as language, index }
                    <li>
                        <button type="button" onclick={ ()=> {symbol.language = index; } }>{language}</button>
                    </li>
                {/each}
                </ul>
            </fieldset>

            <fieldset class="fieldset flex">
                <legend class="fieldset-legend">Symbol type: </legend>
                <button type="button" class="btn max-w-[120px]" popovertarget="popover-2" style="anchor-name:--anchor-2">
                        {data.symbolTypes[symbol.symbolType]}  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-2" style="position-anchor:--anchor-2">
                    {#each data.symbolTypes as type, index }
                    <li>
                        <button type="button" onclick={ ()=> {symbol.symbolType = index; } }>{type}</button>
                    </li>
                {/each}
                </ul>
            </fieldset>

            <div>
                <input type="submit" class="btn btn-success" value="save">
                <button type="button" class="btn btn-error" onclick={() =>document.getElementById('symbol_edit').close()}>close</button>
            </div>
        </form>
    </div>
</dialog>

<dialog id="word_connection" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Add symbols</h3>
        <p>Please add the symbol ID. When connecting more than one symbol, please seperate by ;</p>
        <form action="?/update" method="POST" class="flex w-full justify-between items-center mt-4">
            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>Connect symbols</span>
                    <input type="text" name="symbolConnect" placeholder="Connect symbols" class="input input-md" />
                </label>
            </fieldset>

            <div>
                <input type="submit" class="btn btn-success" value="connect">
                <button type="button" class="btn btn-error" onclick={() =>document.getElementById('word_connection').close()}>close</button>
            </div>
        </form>
    </div>
</dialog>