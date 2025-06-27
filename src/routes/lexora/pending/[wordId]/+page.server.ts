import { redirect } from '@sveltejs/kit';
import { TestLanguageService } from '$lib/lexora/development';
import type { ILanguageService } from '$lib/lexora/services';
import type {Word} from '$lib/lexora/models';

const service: ILanguageService = new TestLanguageService();

export async function load( { params }) {
        
    const wordUid = params.wordId;
    const wordPromise = service.getWordByUid(wordUid);
    const wordAttrbuteLabelPromise = service.getWordAttributesLabels();

    let word: Word;
    let attributeLabels: Record<string, string[]>;

    try {
        [word, attributeLabels] = await Promise.all([wordPromise, wordAttrbuteLabelPromise]);
        return {  word, attributeLabels };
    }
    catch (error) {
        throw redirect (302, "/lexora/words/new");
    }
}