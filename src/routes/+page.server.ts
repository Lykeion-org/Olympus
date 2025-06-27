import { LanguageService, type ILanguageService } from "$lib/lexora/services";

const lexora: ILanguageService = new LanguageService();

export async function load(){
    const servicesStatus = [
        {name: "Lexora", status: "offline", pingUrl: "/lexora/ping"},
        {name: "Paideia", status: "offline", pingUrl: "/paideia/ping"},
        {name: "Demes", status: "offline", pingUrl: "/Demes/ping"},
        {name: "Hermes", status: "offline", pingUrl: "/Hermes/ping"}
    ]; 

    try{
        const lexoraPong = await lexora.ping();
        if (lexoraPong.response === "Pong"){
            servicesStatus[0].status = "online";
        }
    }
    catch (error){
        console.error("Lexora not available")
    }

    const apiUrl = lexora.Endpoint;

    return { servicesStatus, apiUrl }
}