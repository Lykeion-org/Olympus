<script lang="ts">
    import BorderedCard from "$lib/components/elements/BorderedCard.svelte";
    import WhiteCard from "$lib/components/elements/WhiteCard.svelte";
    import StatusIndicator from "$lib/components/elements/StatusIndicator.svelte";
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

    let servicesStatus = $state(data.servicesStatus);
    let connectedAPI = $state(data.apiUrl);

</script>

<div class="flex w-full gap-6">    
    <div class="card bg-base-100 card-lg shadow-md flex-2">
        <div class="card-body">
            <h3 class="card-title">Application information</h3>
            <ul class="list">
                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                    </svg>
                    Connected api url: {connectedAPI} 
                </li>
                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    Application url: {connectedAPI} 
                </li>
                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                    Authentication app url: {connectedAPI} 
                </li>
                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                    </svg>
                    Landing-page url: {connectedAPI} 
                </li>
            </ul>
        </div>
    </div>
    <div class="card bg-base-100 card-lg shadow-md flex-1">
        <div class="card-body">
            <h3 class="card-title">Service status</h3>
            <ul>
                {#each servicesStatus as {name, status, pingUrl}}
                <li class="flex items-center justify-between py-2">
                    <div class="flex items-center">
                        <div class={"status " + (status === "online" ? "status-success" : "status-error")}></div>
                        <a href="/{name.toLowerCase()}" class="ml-2">{name}</a>
                    </div>
                    <div class="flex items-center gap-4">
                        <button class="btn btn-neutral btn-sm" onclick={()=>console.log("Ping to " + pingUrl)}>ping</button>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    
</div>

<div class="card bg-base-100 card-lg shadow-md w-full mt-6">
    <div class="card-body">
        <h3 class="card-title">Server logs</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Service name</th>
                    <th>Message type</th>
                    <th>Message</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
