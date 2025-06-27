<script lang="ts">
    import { onMount } from "svelte";
    import type { PageProps } from './$types';
    import BorderedCard from "$lib/components/elements/BorderedCard.svelte";
    let { data }: PageProps = $props();

    let setAsLemma: boolean = $state(false);
    let lastReferentUid: string | null = $state(null);
    let lastSymbolUid: string | null = $state(null);

    onMount( ()=> {
        lastReferentUid = window.sessionStorage.getItem('_active_referent') || null;
        lastSymbolUid = window.sessionStorage.getItem('_active_symbol') || null;
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
        <form action="?/create" method="POST" class="flex flex-col justify-start items-start gap-2">         
            <label for="word" class="flex flex-col text-gray-400 text-xs uppercase">
                word::
                <input type="text" name="word" class="input" />
            </label>
            
            <label for="ipa" class="flex flex-col text-gray-400 text-xs uppercase">
                IPA:
                <input type="text" name="ipa" class="input" />
            </label>
            
            <label for="soundSource" class="flex flex-col text-gray-400 text-xs uppercase">
                Sound source:
                <input type="text" name="soundSource" class="input" />
            </label>

            <label class="label">
                <input type="checkbox" bind:checked={setAsLemma} class="toggle toggle-primary" />
                Set as lemma
            </label>
            
            <input type="submit" value="Create Word" class="btn btn-primary" />
        </form>
    </div>
</div>


