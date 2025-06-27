import { redirect, type Actions } from '@sveltejs/kit';
import { LanguageService, type ILanguageService } from '$lib/lexora/services';
import type {Word, WordAttributes} from '$lib/lexora/models';

const service: ILanguageService = new LanguageService();

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
        console.log(error)
        throw redirect (302, "/");
    }
}

export const actions:Actions = {
    update: async( {request} )=>{
        const data = await request.formData();
        const word: Word = {
            uid: data.get("wordUid") as string,
            word: data.get("word") as string,
            ipa: data.get("ipa") as string,
            soundSource: data.get("soundSource") as string,
        }

        console.log(word);

        const response = await service.updateWord(word);
        return {success: true, message: response};
    },
    updateAttribute: async( {request} )=>{
        const data = await request.formData();
        
        const wordUid = data.get("wordUid") as string;
        const gender: number = Number(data.get("gender"));
        const number: number = Number(data.get("number"));
        const unique: boolean = Boolean(data.get("uniqe")); //! seems some weird bug?
        const diminutive: boolean = Boolean(data.get("diminutive"));
        const case_: number = Number(data.get("case"));
        const mood: number = Number(data.get("mood"));
        const tense: number = Number(data.get("tense"));
        const aspect:number = Number(data.get("aspect"));
        const person: number = Number(data.get("person"));
        const directObject: boolean = Boolean(data.get("directObject"));
        const indirectObject: boolean = Boolean(data.get("indirectObject"));
        const valency: number = Number(data.get("valency"));
        const reflexive: boolean = Boolean(data.get("reflexive"));

        const wordAttributes: WordAttributes = {
            wordId: wordUid,
            gender: gender,
            number: number,
            unique: unique,
            diminutive: diminutive,
            case: case_,
            mood: mood,
            tense: tense,
            aspect: aspect,
            person: person,
            directObject: directObject,
            indirectObject: indirectObject,
            valency: valency,
            reflexive: reflexive
        }

        console.log(wordAttributes);

    }
            
}