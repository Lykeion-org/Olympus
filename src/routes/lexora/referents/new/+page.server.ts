import { redirect, type Actions } from "@sveltejs/kit";
import { LanguageService, type ILanguageService } from "$lib/lexora/services"
import { TestLanguageService } from "$lib/lexora/development"
import type { Referent } from "$lib/lexora/models"

const service: ILanguageService = new LanguageService();

export const actions: Actions = {
    create: async({ request }) => {
        const data = await request.formData();
        
        const referent: Referent = {
            enReference: data.get('enReference') as string,
            imageSource: data.get('imageSource') as string,
        };

        const createdReferent = await service.createReferent(referent);
        throw redirect(302, "/lexora/referents/" + createdReferent.uid);
    }
}