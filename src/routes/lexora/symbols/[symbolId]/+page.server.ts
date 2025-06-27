import { redirect, type Actions } from '@sveltejs/kit';
import { TestLanguageService } from '$lib/lexora/development';
import { LanguageService, type ILanguageService } from '$lib/lexora/services';
import type {Symbol} from '$lib/lexora/models';

const service: ILanguageService = new LanguageService();

export async function load( { params }) {
    const symbolUid = params.symbolId;

    const symbolPromise = service.getSymbolByUid(symbolUid);
    const languagesPromise = service.getLanguages();
    const symbolTypesPromise = service.getSymbolTypes();

    let symbol: Symbol;
    let languages: string[];
    let symbolTypes: string[];

    try {
        [symbol, languages, symbolTypes] = await Promise.all([symbolPromise, languagesPromise,symbolTypesPromise]);

        return { symbol, languages, symbolTypes };
    }
    catch (error) {
        console.log(error);
        throw redirect (302, "/");
    }
}

export const actions:Actions = {
    lemma: async({request}) => {
        const data = await request.formData();

        const wordUid = data.get('wordUid') as string | null;
        const symbolUid = data.get('symbolUid') as string | null;

        console.log(wordUid, symbolUid);

        if(wordUid && symbolUid) {
            await service.setWordAsLemma(wordUid, symbolUid);
        }
    },
    update: async({request}) => {
        const data = await request.formData();

        const symbolUid = data.get('symbolUid') as string;
        const symbolLanguage = Number(data.get('symbolLanguage') as string);
        const symbolType = Number(data.get('symbolType') as string);

        console.log(symbolLanguage);
        console.log(symbolType);

        const symbol:Symbol = {
            uid: symbolUid,
            language: symbolLanguage,
            symbolType: symbolType,
        }

        const response = await service.updateSymbol(symbol);
        return {success: true, message: response};
    }
}