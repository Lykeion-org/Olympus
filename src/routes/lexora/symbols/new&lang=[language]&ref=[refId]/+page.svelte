<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    import BorderedCard from '$lib/components/elements/BorderedCard.svelte';
    let { data }: PageProps = $props();

    let symbolType: number = $state(1);
    let lastReferentUid: string | null =  $state(null)

    onMount( ()=> {
        lastReferentUid = window.sessionStorage.getItem('_active_referent') || null;
    });

</script>

<div class="card card-lg w-full bg-base-100 shadow-md">
    <div class="card-body">
        <div class="card-title flex justify-between">
            <h2 class="text-xl font-bold mb-2">Create symbol</h2>
            {#if lastReferentUid}
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><a href="/lexora/referents/{lastReferentUid}">Referent</a></li>
                    <li>Symbol</li>
                </ul>
            </div>
            {/if}
        </div>
        <form action="?/create" method="POST" class="flex flex-col">
            <h3>Creating symbol for language: {data.languages[data.language]}</h3> 
            <fieldset class="fieldset flex">
                <legend class="fieldset-legend">Symbol type: </legend>
                <button type="button" class="btn max-w-[120px]" popovertarget="popover-1" style="anchor-name:--anchor-1">
                        {data.symbolTypes[symbolType]}  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-1" style="position-anchor:--anchor-1">
                    {#each data.symbolTypes as type, index }
                    <li>
                        <button type="button" onclick={ ()=> {symbolType = index; } }>{type}</button>
                    </li>
                {/each}
                </ul>
            </fieldset>
            
            <div class="mt-4">
                <input class="btn btn-primary" type="submit" value="Create Symbol" />
            </div>
        </form>
    </div>
</div>
