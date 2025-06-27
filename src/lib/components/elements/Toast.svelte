<script lang="ts">
    import type { AppNotifications } from "$lib/state";

    interface Props{ notifier: AppNotifications}

    const {notifier}: Props = $props(); 
</script>

{#if notifier.Toast}
    <div class="toast enter toast-center">
        <div class={"alert alert-" + notifier.Toast.type}>
        <!-- <div class="alert alert-success"> -->
            <span>{notifier.Toast.message}</span>
        </div>
    </div>
{/if}


<style>
@keyframes jello-horizontal {
    0% { transform: scale3d(1, 1, 1); } 
    30% { transform: scale3d(1.25, 0.75, 1); } 
    40% { transform: scale3d(0.75, 1.25, 1); } 
    50% { transform: scale3d(1.15, 0.85, 1); } 
    65% { transform: scale3d(0.95, 1.05, 1); } 
    75% { transform: scale3d(1.05, 0.95, 1); } 
    100% { transform: scale3d(1, 1, 1);} }

.enter { 
    animation: jello-horizontal 0.9s ease 0s 1 normal both; 
}
</style>