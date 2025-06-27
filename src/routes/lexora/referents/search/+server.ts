import {json} from '@sveltejs/kit';
import { type ILanguageService, LanguageService } from '$lib/lexora/services';

export async function GET({ url }) {
    const query = url.searchParams.get('query') ?? "";

    // You could also get mode if needed
    // const mode = url.searchParams.get('mode') ?? "word";

    const languageService: ILanguageService = new LanguageService();

    try {
        const referents = await languageService.listReferentsByWords(query);
        return json(referents);
    } catch (err) {
        console.error("Error fetching referents:", err);
        return json({ error: 'Failed to fetch referents' }, { status: 500 });
    }
}