import { TestLanguageService } from "$lib/lexora/development";
import { LanguageService, type ILanguageService } from "$lib/lexora/services";

const service: ILanguageService = new LanguageService();

export async function load() {

    const languagesPromise = service.getLanguages();
    const symbolTypesPromise = service.getSymbolTypes();

    let [languages, symbolTypes] = await Promise.all([languagesPromise, symbolTypesPromise]);

    return { languages, symbolTypes };

}