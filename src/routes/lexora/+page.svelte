<script lang="ts">

    const subServices = [
        {serviceID: "controller", status: "online", port: 50000},
        {serviceID: "notifier", status: "offline", port: 50100},
        {serviceID: "dictionary", status: "online", port: 50001},
        {serviceID: "text-analysis", status: "offline", port: 50002}
    ];
</script>


<div class="card bg-base-100 card-lg shadow-md">
    <div class="card-body">
        <h3 class="card-title">Service information</h3>
        <p>Lexora is the language service and it's responsible for handling and analyzing all text and language related data.</p>
    </div>
</div>

<div class="flex w-full gap-6 mt-6">
    <div class="card bg-base-100 card-lg shadow-md flex-1">
            <div class="card-body">
                <h3 class="card-title">Database</h3>
                <button class="btn btn-primary max-w-[200px]">Backup database</button>
            </div>
    </div>
    <div class="card bg-base-100 card-lg shadow-md flex-1">
            <div class="card-body">
                <h3 class="card-title">Sub service status</h3>
                <ul class="list">
                    {#each subServices as {serviceID, status, port} }
                        <li class="list-row flex justify-between items-center">
                            <span>{serviceID} service</span>
                            <div class="flex gap-2 items-center">
                                <span>port: {port}</span>
                                <div class={"status " + (status === "online" ? "status-success" : "status-error")}></div>
                            </div>
                    </li>
                    {/each}
                </ul>   
            </div>
    </div>
</div>