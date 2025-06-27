<script lang="ts">
    import type {Referent} from "$lib/lexora/models";
    import { LanguageService, type ILanguageService } from "$lib/lexora/services";
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

    let searchResults: Referent[] = $state([]);
    let query: string = $state("");

    let searching: boolean = $state(false);

    async function searchReferents(): Promise<void> {
        searching = true;
        const res = await fetch(`/lexora/referents/search?query=${encodeURIComponent(query)}`); 
        if(!res.ok) {
            console.error("Error fetching referents", res.statusText);
            searching = false; 
            return
        }
        const data = await res.json() as Referent[];
        searchResults = data;
        searching = false; 
    }

</script>
<div class="w-full h-full">


    <h1 class="py-4 text-left font-extrabold text-3xl">
        Referents
    </h1>
    <div class="w-full p-6 bg-base-100 shadow-md rounded-xl">
        <h2 class="text-xl font-bold mb-2">Search referents</h2>
        <div class="flex w-full justify-between items-center">
        <div class="flex">
            <label class="input">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="search" class="grow" bind:value={query} placeholder="Search referent" />
            </label>
            <button class="btn" onclick={()=> {searchReferents()} }>search</button>
        </div>
        <a href="/lexora/referents/new" class="btn btn-primary">
            Create new referent
            <figure>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </figure>
        </a>
    </div>
        
    <div id="search-results" class="mt-14">
    {#if searching}
        <div class="loading loading-dots"></div>
    {:else}
        {#if searchResults.length === 0}
        
        <p>No results to show.</p>
        
        {:else}
        
        <ul>
            {#each searchResults as result}
            <li class="w-full p-3 border border-bg-300 flex rounded-lg hover:shadow-xl transform hover:scale-101 transition-all glass">
                <a href="/lexora/referents/{result.uid}" class="flex w-full justify-start items-center gap-4">
                    <figure class="w-[64px] h-[64px]">
                        <img class="w-full h-full" src={result.imageSource ? result.imageSource : "/placeholders/referent.png"} />
                    </figure>
                    <div class="flex flex-col">
                    <h3 class="font-extrabold text-lg">{result.enReference}</h3>
                    <div class="flex items-center gap-4">
                        {#if result.symbols}
                        {#each result.symbols as symbol}
                            <span>{data.languages[symbol.language] + ' : '}{symbol.lemma?.word || "unknown"}</span>
                        {/each}
                        {/if}
                    </div>
                    </div>
                </a>
            </li>      
            {/each}

        </ul>
        {/if}
    {/if}
    </div>
</div>







</div>
