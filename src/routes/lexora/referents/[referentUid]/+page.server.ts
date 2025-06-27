import { redirect, type Actions } from "@sveltejs/kit";
import { LanguageService, type ILanguageService } from "$lib/lexora/services"
import { TestLanguageService } from "$lib/lexora/development"
import type { Referent } from "$lib/lexora/models"

const service: ILanguageService = new LanguageService();

export async function load( {params} ){

    const referentUid = params.referentUid;

    let referentPromise = service.getReferentByUid(referentUid);
    let languagePromise = service.getLanguages();
    
    let referent:Referent;
    let languages: string[];
    try {
        [referent, languages] = await Promise.all([referentPromise, languagePromise]);
    }
    catch (error) {
        console.error("Error loading referent:", error);
        throw redirect(302, "/lexora/referents/new");
    }

    
    return { referent, languages }
}

export const actions:Actions = {
    update: async( {request} )=>{
        const data = await request.formData();

        const referent: Referent = {
            uid: data.get("referentUid") as string || undefined,
            enReference: data.get("enReference") as string,
            imageSource: data.get("imageSource") as string,
        }

        const response = await service.updateReferent(referent);
        return {success: true, message: response};
    },
}
