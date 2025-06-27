import{ AppState, Environment} from '$lib/state';
import type { Referent, Symbol, Word, AnalysisTask } from '../models';



class LexoraService{

    private _appState: AppState = AppState.GetInstance();


    private static readonly _appState = AppState.GetInstance();
    private static readonly _productionBaseUrl = "https://api.lexora.com"; //TODO: Get from environment
    private static readonly _developmentBaseUrl = "http://localhost:8080/api/v1";

    public static get baseUrl(): string {
        if (LexoraService._appState.Environment  === Environment.Production) {
            return LexoraService._productionBaseUrl;
        } else {
            return LexoraService._developmentBaseUrl;
        }
    }
}


class LanguageService extends LexoraService implements ILanguageService  {
    
    private readonly _apiUrl: string;

    public constructor(){
        super();
        this._apiUrl = LexoraService.baseUrl;
    }

    public get Endpoint() {
        return this._apiUrl;
    }

    public async ping(){
        try {
            const response = await fetch(this._apiUrl + '/ping');
            if (!response.ok){
                throw new Error("Error getting response for ping");
            }

            const data = await response.json() as Pong;
            return data; 
        }    
        catch (error) {
            console.log(error)
            throw error
        };
    }
    public async getSymbolByUid(uid: string): Promise<Symbol> {
        try {
            const response = await fetch(this._apiUrl + '/symbol/' + uid);
            const data = await response.json() as Symbol;
            return data; 
        }    
        catch (error) {
            throw error
        };
    }
    public async getWordByUid(uid: string): Promise<Word> {
        try {
            const response = await fetch(this._apiUrl + '/word/' + uid);
            const data = await response.json() as Word;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async listReferentsByWords(query: string): Promise<Referent[]> {
        try {
            const response = await fetch(this._apiUrl + '/referent/search?query=' + query);
            const data = await response.json() as Referent[];
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    listSymbolsByWords(query: string): Promise<Symbol[]> {
        throw new Error('Method not implemented.');
    }
    listWordsByQuery(query: string): Promise<Word[]> {
        throw new Error('Method not implemented.');
    }
    public async createReferent(referent: Referent): Promise<Referent> {
        try {
            const response = await fetch(this._apiUrl + '/referent', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(referent)
            });
            if(!response.ok) {
                throw new Error("Error while creating referent");
            }
            const data = await response.json() as Referent;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async createSymbol(symbol: Symbol): Promise<Symbol> {
        try {
            const response = await fetch(this._apiUrl + '/symbol', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(symbol)
            });
            if(!response.ok) {
                throw new Error("Error while creating symbol");
            }
            const data = await response.json() as Symbol;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async createWord(word: Word): Promise<Word> {
        try {
            const response = await fetch(this._apiUrl + '/word', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(word)
            });
            if(!response.ok) {
                throw new Error("Error while creating word");
            }
            const data = await response.json() as Word;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }

    public async updateReferent(referent: Referent): Promise<Referent> {
        try {
            const response = await fetch(this._apiUrl + '/referent', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(referent)
            });
            if(!response.ok) {
                throw new Error("Error while creating word");
            }
            const data = await response.json() as Referent;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async updateSymbol(symbol: Symbol): Promise<Symbol> {
        try {
            const response = await fetch(this._apiUrl + '/symbol', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(symbol)
            });
            if(!response.ok) {
                throw new Error("Error while updating symbol");
            }
            const data = await response.json() as Symbol;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async updateWord(word: Word): Promise<Word> {
        try {
            const response = await fetch(this._apiUrl + '/word', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(word)
            });
            if(!response.ok) {
                throw new Error("Error while updating word");
            }
            const data = await response.json() as Word;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
    public async deleteReferent(uid: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async linkReferentAndSymbol(referentUid: string, symbolUid: string[]): Promise<void> {
        try {
            const response = await fetch(this._apiUrl + '/link-referent-symbol', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symbolUid: symbolUid,
                    referentUid: referentUid,
                })
            });
            if(!response.ok) {
                throw new Error("Error while linking referent and symbols");
            }
        }    
        catch (error) {
            throw error
        }
    }
    public async linkSymbolAndWord(symbolUid: string, wordUid: string[]): Promise<void> {
        try {
            const response = await fetch(this._apiUrl + '/link-symbol-word', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symbolUid: symbolUid,
                    wordUid: wordUid
                })
            });

            if(!response.ok) {
                throw new Error("Error while linking symbol and words");
            }
        }    
        catch (error) {
            throw error
        }
    }
    public async setWordAsLemma(wordUid: string, symbolUid: string): Promise<void> {
        try {
            const response = await fetch(this._apiUrl + '/set-word-as-lemma/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symbolUid: symbolUid,
                    wordUid: wordUid,
                })
            });
        }    
        catch (error) {
            throw error
        }
    }
    public async getWordAttributesLabels(): Promise<Record<string, string[]>> {
        const labels: Record<string, string[]> = {
            "gender": ['unspecified','male', 'female'],
            "number": ['unspecified','singular', 'plural'],
            "case": ['unspecified','nominvative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional'],
            "mood": ['unspecified','indicative', 'imperative', 'subjunctive', 'conditional', 'optative'],
            "tense": ['unspecified','past', 'present', 'future'],
            "aspect": ['unspecified','perfective', 'imperfective', 'progressive', 'continuative'],
            "person": ['unspecified', 'first', 'second', 'third'],
        }
        return labels;
    }
    public async getLanguages(): Promise<string[]> {
        return ["UNSPECIFIED", "EN","NL","PT","ES","FR"];
    }
    public async getSymbolTypes(): Promise<string[]> {
        return ["UNSPECIFIED", "object", "action", "modifier"];
    }
    
    public async getReferentByUid(uid: string) {
        try {
            const response = await fetch(this._apiUrl + '/referent/' + uid);
            const data = await response.json() as Referent;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }

    public async analyzeText(text:string){
        try {
            const response = await fetch(this._apiUrl + '/nlp/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text:text,
                })
            });
            if(!response.ok) {
                throw new Error("Error while requesting text analysis");
            }
            const data = await response.json() as AnalysisTask;
            return data; 
        }    
        catch (error) {
            throw error
        }
    }
}


interface ILanguageService {
    ping(): Promise<Pong>
    getReferentByUid(uid: string): Promise<Referent>
    getSymbolByUid(uid: string): Promise<Symbol>
    getWordByUid(uid: string): Promise<Word>
    listReferentsByWords(query: string): Promise<Referent[]>
    listSymbolsByWords(query: string): Promise<Symbol[]>
    listWordsByQuery(query: string): Promise<Word[]>
    createReferent(referent: Referent): Promise<Referent>
    createSymbol(symbol: Symbol): Promise<Symbol>
    createWord(word: Word): Promise<Word>
    updateReferent(referent: Referent): Promise<Referent>
    updateSymbol(symbol: Symbol): Promise<Symbol>
    updateWord(word:Word): Promise<Word>
    deleteReferent(uid: string): Promise<void>
    linkReferentAndSymbol(referentUid: string, symbolUid: string[]): Promise<void>
    linkSymbolAndWord(symbolUid: string, wordUid: string[]): Promise <void>
    setWordAsLemma(wordUid: string, symbolUid: string): Promise<void>
    getWordAttributesLabels(): Promise<Record<string, string[]>>
    getLanguages(): Promise<string[]>
    getSymbolTypes(): Promise<string[]>
    analyzeText(text:string): Promise<AnalysisTask>
    Endpoint: string; 
}

interface Pong {
    response: string,
    versionNumber: string,
    timeStamp: string,
    serviceIp: string,
    servicePort: number
}

export {LanguageService, type ILanguageService};


