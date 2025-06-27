import { TestLanguageService } from "$lib/lexora/development";
import { LanguageService, type ILanguageService } from "$lib/lexora/services";
import type { Word } from "$lib/lexora/models"
import { redirect, type Actions } from "@sveltejs/kit";

const service: ILanguageService = new LanguageService();


export async function load({params}) {
    const symbolUid = params.symId;

    return {symbolUid };
}

export const actions: Actions = {
    create: async( {request, params}) => {
        
        const data = await request.formData();


        const setAsLemma = data.get("setAsLemma");
        const word  = data.get("word") as string;
        const symbolUid = params.symId;

        let wordRequest: Word = {
            word: word
        }

        const wordResponse = await service.createWord(wordRequest);
        console.log(wordResponse);
        
        if(wordResponse.uid && symbolUid){
            await service.linkSymbolAndWord(symbolUid,[wordResponse.uid]);
        }

        if(setAsLemma && (wordResponse.uid && symbolUid)){
            await service.setWordAsLemma(wordResponse.uid, symbolUid);
        }

        throw redirect(302, "/lexora/words/" + wordResponse.uid)
    }
}