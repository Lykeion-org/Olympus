<script lang="ts">
    import BorderedCard from '$lib/components/elements/BorderedCard.svelte';
    import WhiteCard from '$lib/components/elements/WhiteCard.svelte';
    import type {Referent} from '$lib/lexora/models'
    
    let referent:Referent = $state(
        {   enReference: ""});

</script>

<div class="card card-md shadow-md bg-base-100">
    <div class="card-body">
        <h2 class="card-title">Create referent</h2>
        <form class="flex flex-col gap-4" action="?/create" method="POST">

            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>English reference</span>
                    <input type="text" name="enReference" placeholder="English reference" bind:value={referent.enReference} class="input input-md" required />
                </label>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label">
                    <span>Image source</span>
                    <input type="text" name="imageSource" placeholder="Image source" bind:value={referent.imageSource} class="input input-md" />
                    <p>Please add a path '/images/referent-uid.webp'. If you want to upload a file, you can create the referent first, and change the image later</p>
                </label>
            </fieldset>

            <input type="submit" value="Add Referent" class="btn btn-primary self-end" />
        </form>
    </div>
</div>

<div class="card card-md shadow-md card-side bg-base-100 mt-6">
    <div class="card-body">
        <h2 class="card-title">Preview</h2>
        <div class="flex justify-start items-center gap-8">
            
            <figure class="max-w-[300px] h-full">
                <img src={referent.imageSource ? referent.imageSource : "/placeholders/referent.png"} alt="representation of the referent" class="w-full h-full" />
            </figure>
            
            <div class="text-sm flex flex-col text-gray-500">
                <span class="text-medium font-semibold font-stretch-expanded capitalize">{referent.enReference}</span>
                <span>referent uid: {referent.uid ? referent.uid : "new referent"}</span>
                <span>image location: {referent.imageSource ? referent.imageSource : "no image provided"}</span>
            </div>
        </div>
    </div>
</div>

        

    

