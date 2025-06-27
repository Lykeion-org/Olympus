
<div role="alert" class="alert alert-error enter">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>
        At the moment it is not possible to create a new symbol, without linking it to a referent.
        Please create a symbol from a new or existing referent!
    </span>
</div>

<style>
@keyframes shake-horizontal {
    0%, 100% { transform: translateX(0); } 
    10%, 30%, 50%, 70% { transform: translateX(-10px); } 
    20%, 40%, 60% { transform: translateX(10px); } 
    80% { transform: translateX(8px); } 
    90% { transform: translateX(-8px);} }

.enter { 
    animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) 0s 1 normal both; 
}
</style>