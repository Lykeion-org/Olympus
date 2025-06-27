<script lang="ts">
    import { AppNotifications } from "$lib/state";
    import { onMount } from "svelte";

    let notifier: AppNotifications | null = $state(null);
    
    onMount(() => {
        notifier = AppNotifications.GetInstance();
    });
</script>


<div class="h-[70px] w-full border-b border-base-300 bg-base-100 flex justify-between px-8 items-center">
    <div>

        <span class="text-gray-400 uppercase text-xs">quick actions</span>
    </div>

    <div class="flex-none">
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>

                    <span class="badge badge-sm indicator-item">{notifier?.UnreadMessages || 0}</span>
                </div>
            </div>
            
            <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-104 shadow">
                <div class="card-body">
                    <ul class="list">
                        {#if notifier}
                        {#if notifier?.UnreadMessages != 0}
                        {#each notifier?.Messages as message}
                           <li class="list-row">{message.message}</li>
                        {/each}
                        {:else}
                           <li class="list-row">No new messages</li>
                        {/if}
                        {/if}
                    </ul>
                </div>
            </div>

        </div>
        
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li> <a class="justify-between">Profile <span class="badge">New</span> </a> </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    </div>
</div>