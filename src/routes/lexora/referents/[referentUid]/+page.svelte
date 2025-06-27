<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    import type { Referent } from '$lib/lexora/models';
    import { LanguageService } from '$lib/lexora/services';
    import { goto } from '$app/navigation';
    import CopyButton from '$lib/components/elements/CopyButton.svelte';
    import { AppNotifications } from '$lib/state';
    let { data }: PageProps = $props();
    
    let referent: Referent = $state(data.referent);
    let notifier: AppNotifications | null = $state(null);

    onMount( ()=> {
        notifier = AppNotifications.GetInstance();
        if(data.referent.uid){
            window.sessionStorage.setItem('_active_referent', data.referent.uid);
        }
    });


</script>
<div class="card w-full bg-base-100 shadow-lg">
    <div class="card-body">
        <h2 class="card-title">Referent</h2>
        
        <div class="card card-md card-border border-base-300 card-side">
            <figure class="max-w-[300px] h-full">
                <img src={referent.imageSource ? referent.imageSource : "/placeholders/referent.png"} alt="representation of the referent" class="w-full h-full" />
            </figure>
            <div class="card-body flex-row justify-between">
                <div>
                    <h3 class="text-medium font-semibold">Referent information</h3>
                    <div class="flex justify-between items-center mt-2">
                        <div class="flex justify-start items-center gap-8">
                            <div class="text-sm flex flex-col text-gray-400">
                                <span class="text-medium font-semibold font-stretch-expanded capitalize">{referent.enReference}</span>
                                <span class="flex items-center">
                                    referent uid: {referent.uid ? referent.uid : "unknown ID"} 
                                    {#if referent.uid}
                                    <CopyButton textToCopy={referent.uid} />
                                    {/if}
                                </span>
                                <span>image location: {referent.imageSource ? referent.imageSource : "no image provided"}</span>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="card-actions flex gap-2 self-center">
                    <button class="btn btn-ghost" onclick={()=>{document.getElementById('symbol_connection').showModal() }}>Link existing symbol</button>
                    <button type="button" onclick={()=> {document.getElementById('referent_edit').showModal()}} class="btn btn-ghost btn-square" aria-label={"edit-referent"}> 
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
<div class="card w-full bg-base-100 shadow-lg mt-4">
    <div class="card-body">
        <h2 class="card-title text-xl font-bold mb-2">Connected symbols</h2>
    {#each data.languages as language,index}
        {#if index != 0}
        <div class="card card-lg card-border border-base-300">
            
            <div class="card-body">
                <h3 class="text-medium font-semibold">{language}</h3>
                {#if referent.symbols}
                <ul class="ml-4">
                    {#each referent.symbols as symbol}
                        {#if symbol.language === index}
                        <li class="w-full flex justify-between items-center py-2">
                            <span>
                                {symbol.lemma?.word || "unknown symbol"}
                            </span>
                            <div class="flex gap-2">
                                <button type="button" onclick={()=> {goto("/lexora/symbols/" + symbol.uid)}} class="btn btn-ghost btn-square" aria-label={"edit-" + symbol.uid}> 
                                <figure>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </figure>
                            </button>
                                <button type="button" onclick={()=> {}} class="btn btn-ghost btn-square" aria-label={"unlink-" + symbol.uid}>
                                    <figure>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
                                        </svg>
                                    </figure>
                                </button>
                            </div>
                        </li>
                        {/if}
                    {/each}
                        <li class="mt-6">
                            <a class="btn btn-primary" href="/lexora/symbols/new&lang={index}&ref={data.referent.uid}">Add new symbol</a>
                        </li>
                </ul>
                {/if}
            </div>

        </div>
        {/if}
    {/each}
    </div>
</div>

<dialog id="referent_edit" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit referent!</h3>
        <p>Please edit all the referent info</p>
        <div class="modal-action">
            <form action="?/update" method="POST">
                <input type="hidden" value={referent.uid} name="referentUid" />
                <fieldset class="fieldset">
                    <label class="floating-label">
                        <span>English reference</span>
                        <input type="text" name="enReference" placeholder="English reference" bind:value={referent.enReference} class="input input-md" />
                    </label>
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Pick a file</legend>
                    <input type="file" name="imageSource" class="file-input" />
                    <label for="imageSource" class="label">Max size 2MB</label>
                </fieldset>
                <div>
                    <input type="submit" class="btn btn-success" value="save">
                    <button type="button" class="btn btn-error" onclick={() =>document.getElementById('referent_edit').close()}>close</button>
                </div>
        </form>
        </div>
    </div>
</dialog>

<dialog id="symbol_connection" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Add symbols</h3>
        <p>Please add the symbol ID. When connecting more than one symbol, please seperate by ;</p>
        <form action="?/update" method="POST" class="flex w-full justify-between items-center mt-4">
            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>Connect symbols</span>
                    <input type="text" name="symbolConnect" placeholder="Connect symbols" bind:value={referent.enReference} class="input input-md" />
                </label>
            </fieldset>

            <div>
                <input type="submit" class="btn btn-success" value="connect">
                <button type="button" class="btn btn-error" onclick={() =>document.getElementById('symbol_connection').close()}>close</button>
            </div>
        </form>
    </div>

</dialog>
