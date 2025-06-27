import type { Actions } from "@sveltejs/kit";
import { LanguageService, type ILanguageService } from "$lib/lexora/services";

export const actions: Actions = {
    analyze: async({ request }) => {

        const service:ILanguageService = new LanguageService();

        const formData = await request.formData();
        const analysisText = formData.get("analysisText") as string;
        const response = await service.analyzeText(analysisText);
        return { success: true, data: response };
    }
};
