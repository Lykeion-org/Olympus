<script lang="ts">
    import Toast from '$lib/components/elements/Toast.svelte';
    import MainMenu from '$lib/components/menus/MainMenu.svelte';
	import TopHeader from '$lib/components/menus/TopHeader.svelte';
    import { onMount } from 'svelte';
	import '../app.css';
    import { AppNotifications } from '$lib/state';
	let { children } = $props();

	let notifier: AppNotifications | null = $state(null);
	onMount(()=> {
		notifier = AppNotifications.GetInstance();
	});
</script>


<div class="flex h-screen w-screen">
	<MainMenu />
	<div class="flex flex-col w-full h-full">
		<TopHeader />
		<div class="w-full h-full bg-base-200 p-8 overflow-scroll">
			{@render children()}
		</div>
	</div>
</div>

{#if notifier}
<Toast notifier={notifier} />
{/if}
