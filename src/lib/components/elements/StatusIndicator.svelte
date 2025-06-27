<script lang="ts">
    import { onMount } from "svelte";


    interface Props {type: "accept" | "warning" | "message" | "error", text:string}
    let {type, text} = $props();
    let typeClasses: string = $state("bg-sky-100 text-sky-600");

    onMount(()=>{
        switch(type) 
        {
            case "accept":
                typeClasses = "bg-emerald-100 text-emerald-600";
                break;
            case "warning":
                typeClasses = "bg-amber-100 text-amber-600";
                break;
            case "error":
                typeClasses = "bg-rose-100 text-rose-600";
                break;
            default:
                typeClasses = "bg-sky-100 text-sky-600";
                break;
        }
    })

</script>

<div class={"text-center text-xs lowercase min-w-[88px] rounded-full py-1 px-3 " + typeClasses}>
    {text}
</div>