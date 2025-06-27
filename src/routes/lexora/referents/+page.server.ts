import { TestLanguageService } from "$lib/lexora/development";
import { LanguageService, type ILanguageService } from "$lib/lexora/services";

const service: ILanguageService = new LanguageService();

export async function load() {

    const languages = await service.getLanguages();

    return { languages };

}