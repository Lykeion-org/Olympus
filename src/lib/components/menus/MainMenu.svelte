<script lang="ts">
    let showLexora:boolean = $state(false);
    const menuItems = $state([
        {
            header: "Lexora",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" /></svg>`,
            items: [
                {name: "Referents", link: "/lexora/referents"},
                {name: "Symbols", link: "/lexora/symbols"},
                {name: "Words", link: "/lexora/words"},
                {name: "Analyze texts", link: "/lexora/analyze"},
                {name: "Pending review", link: "/lexora/pending"}
            ],
            visible: false
        },
        {
            header: "Paideia",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>`,
            items: [
                {name: "Courses", link: "/referents"},
                {name: "Lessons", link: "/symbols"},
                {name: "Flashcards", link: "/words"},
            ],
            visible: false
        },
        {
            header: "Demes",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
            items: [
                {name: "Users", link: "/referents"},
            ],
            visible: false
        },
        {
            header: "Hermes",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" /></svg>
`,
            items: [
                {name: "Pending notifications", link: "/referents"},
            ],
            visible: false
        }
    ]);

    function handleMenu(index:number) {
        menuItems.map((item) => { 
            item.visible = false;
        });
        menuItems[index].visible = true;
    }
</script>

<nav class="h-full w-[360px] border-r border-base-300 bg-base-100">
    <figure class="h-[80px] flex items-center px-8 gap-3">
        <img class="w-[32px] h[32px]" src="/logos/Lykeion-logo.svg" alt="Lykeion logo" />
        <figcaption class="font-bold text-xl">
            Olympus
        </figcaption>
    </figure>
    <div class="mt-2">        
        <h2 class="text-gray-400 ml-8 uppercase text-xs">info</h2>
        <ul class="flex flex-col px-8 mt-2">
            <li class="py-2 text-sm font-semibold px-2 rounded-md cursor-pointer focus:text-accent-content focus:bg-accent hover:bg-gray-200 transition-all">
                <a href="/" class="w-full flex gap-3 items-center text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>
                    Overview
                </a>
            </li>
        </ul>
    </div>
    <div class="mt-4">
        <h2 class="text-gray-400 ml-8 uppercase text-xs">services</h2>
        <ul class="flex flex-col px-8 mt-2">
            {#each menuItems as item, index}
            <li>
                <button onclick={()=> handleMenu(index)}
                        class="py-2 text-sm font-semibold w-full flex gap-3 items-center text-left px-2 rounded-md cursor-pointer font-semi-expanded focus:text-primary-content focus:bg-primary hover:bg-base-300 transition-all">
                    {@html item.icon }
                    {item.header}
                </button>
                    
                    {#if item.visible}
                    <ul class="flex flex-col ml-6 gap-2 mt-2">
                        {#each item.items as {name, link}}
                        <li class="px-2 py-1 rounded-md cursor-pointer hover:bg-base-300 transition-all">
                            <a href={link} class="text-sm">{name}</a>
                        </li>
                        {/each}
                    </ul>
                    {/if}
            </li>
            {/each}
        </ul>
    </div>

    <div class="mt-4">
        <h2 class="text-gray-400 ml-8 uppercase text-xs">tooling</h2>
        <ul class="flex flex-col px-8 mt-2">
            <li class="py-2 text-sm font-semibold w-full px-2 rounded-md cursor-pointer font-semi-expanded focus:text-primary-content focus:bg-primary hover:bg-base-300 transition-all">
                <a href="http://localhost:30001/" target="_blank" class="flex gap-3 items-center text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                    Message queues
                </a>
            </li>
            <li class="py-2 text-sm font-semibold w-full flex gap-3 items-center text-left px-2 rounded-md cursor-pointer font-semi-expanded focus:text-primary-content focus:bg-primary hover:bg-base-300 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                </svg>
                Bug report
            </li>
        </ul>
    </div>

</nav>