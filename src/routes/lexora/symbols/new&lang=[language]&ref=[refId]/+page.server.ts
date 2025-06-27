import { TestLanguageService } from "$lib/lexora/development";
import { LanguageService, type ILanguageService } from "$lib/lexora/services";
import type { Symbol } from "$lib/lexora/models"
import { fail, redirect, type Actions } from "@sveltejs/kit";

const service: ILanguageService = new LanguageService();


export async function load({params}) {
    const referentUid = params.refId;
    const language = params.language;

    const languagesPromise = service.getLanguages();
    const symbolTypesPromise = service.getSymbolTypes();

    let languages: string[];
    let symbolTypes: string[];

    [languages, symbolTypes] = await Promise.all([languagesPromise,symbolTypesPromise]);

    return {referentUid, language, languages, symbolTypes };
}

export const actions: Actions = {
    create: async ({ request, params }) => {
        const data = await request.formData();

        const referentUid = params.refId;
        const language = params.language;
        const symbolType = Number(data.get('symbolType') as string);

        let symbol: Symbol = {
            symbolType: symbolType,
            language: language ? Number(language) : -1,
        }
        const symbolResponse = await service.createSymbol(symbol);

        if(referentUid && symbolResponse.uid) {
            await service.linkReferentAndSymbol(referentUid, [symbolResponse.uid])
        }
        throw redirect(302, `/lexora/symbols/${symbolResponse.uid}`);
        
    }

}