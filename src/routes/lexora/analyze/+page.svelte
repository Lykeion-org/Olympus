<script lang="ts">
    import type { PageProps } from "../$types";
    import {AppNotifications} from "$lib/state";
    import { onMount } from "svelte";

    let {form}: PageProps = $props();
    let notifier: AppNotifications | null = $state(null)
    
    onMount(()=> {
        notifier = AppNotifications.GetInstance(); 
    });

    $effect(() => {
        if (form?.success && notifier) {
        queueMicrotask(() => {
            notifier?.SetMessage("NLP analysis submitted successfully!", "success");
        });
    } else if (form?.error && notifier) {
        queueMicrotask(() => {
            notifier?.SetMessage(`${form.error}`,"error");
        });
    }
    });

    

</script>

<div class="card card-md shadow-md bg-base-100">
    <div class="card-body">
        <h2 class="card-title">NLP Text Analysis</h2>
        <form action="?/analyze" method="POST" class="flex flex-col gap-6">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Analyze text</legend>
                    <textarea name="analysisText" class="textarea w-full min-h-[600px]" placeholder="Text to analyze..."></textarea>
                <div class="label">Please copy-paste the text to analyze here</div>
            </fieldset>
            <input type="submit" class="btn btn-primary max-w-[200px]" value="Submit" />
        </form>    
    </div>
</div>
