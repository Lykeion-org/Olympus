import {type ILanguageService } from '$lib/lexora/services';
import type {Referent, Symbol, Word} from '$lib/lexora/models'

class TestLanguageService implements ILanguageService{

    private static words: Word[] = [
        {
            uid: "coffee-word-en-sng",
            word: "coffee",
            ipa: "coffee-ipa",
            soundSource: "coffee-Soundsource",
        },
        {
            uid: "coffee-word-en-plr",
            word: "coffees",
            ipa: "coffees-ipa",
            soundSource: "coffees-Soundsource",
        },
        {
            uid: "coffee-word-nl-sng",
            word: "koffie",
            ipa: "koffie-ipa",
            soundSource: "koffie-Soundsource",
        },
        {
            uid: "koffie-word-nl-plr",
            word: "koffies",
            ipa: "koffies-ipa",
            soundSource: "koffies-Soundsource",
        }
    ]

    private static symbols: Symbol[] = [
        {
            uid: "coffee-symbol-en",
            symbolType: 1,
            language: 1,
            lemma: this.words[0],
            words: [this.words[0],this.words[1]]
        },
        {
            uid: "coffee-symbol-nl",
            symbolType: 1,
            language: 2,
            lemma: this.words[2],
            words: [this.words[2], this.words[3]]
        },
        {
            uid: "coffee-symbol-test",
            symbolType: 1,
            language: 3,
            words: [this.words[2], this.words[3]]
        }
]
    
    private static referent: Referent[] = [
        {
            uid: "coffee-uid",
            enReference: "coffee",
            symbols: [this.symbols[0], this.symbols[1]]
        },
        {
        uid: "banana-uid",
        enReference: "banana",
        symbols: []
    }
]

    public constructor(){}

    public async getReferentByUid(uid: string): Promise<Referent>{
        const index = TestLanguageService.referent.findIndex(item => item.uid === uid);
        if (index < 0) {
            throw new Error(`Referent with uid ${uid} not found`);
            }
        return TestLanguageService.referent[index];
    }

    public async getSymbolByUid(uid: string): Promise<Symbol>{
        const index = TestLanguageService.symbols.findIndex(item => item.uid === uid);
        if (index < 0) {
            throw new Error(`Symbol with uid ${uid} not found`);
            }
        return TestLanguageService.symbols[index];
    }

    public async getWordByUid(uid: string): Promise<Word>{
        const index = TestLanguageService.words.findIndex(item => item.uid === uid);
        if (index < 0) {
            throw new Error(`Word with uid ${uid} not found`);
            }
        return TestLanguageService.words[index];
    }

    public async createReferent(referent: Referent): Promise<Referent> {
        if (!referent.uid) {
            referent.uid = crypto.randomUUID()
        }
        if (!referent.symbols){
            referent.symbols = [];
        }
        TestLanguageService.referent.push({...referent});
        return referent;
    }

    public async createSymbol(symbol: Symbol): Promise<Symbol> {
        if (!symbol.uid) {
            symbol.uid = crypto.randomUUID()
        }
        if (!symbol.words){
            symbol.words = [];
        }
        TestLanguageService.symbols.push({...symbol});

        return symbol;
    }

    public async createWord(word: Word): Promise<Word> {
        if (!word.uid) {
            word.uid = crypto.randomUUID()
        }
        TestLanguageService.words.push({...word});

        return word;
    }

    public async deleteReferent(uid: string): Promise<void> {
        const index = TestLanguageService.referent.findIndex(item => item.uid === uid);
        if (index !== -1) {
            TestLanguageService.referent.splice(index, 1);
            }
            else {
                throw new Error(`Referent with uid ${uid} not found`);
            }
    }

    public async deleteSymbol(uid: string): Promise<void> {
        const index = TestLanguageService.symbols.findIndex(item => item.uid === uid);
        if (index !== -1) {
            TestLanguageService.symbols.splice(index, 1);
            }
            else {
                throw new Error(`Symbol with uid ${uid} not found`);
            }
    }

    public async deleteWord(uid: string): Promise<void> {
        const index = TestLanguageService.words.findIndex(item => item.uid === uid);
        if (index !== -1) {
            TestLanguageService.words.splice(index, 1);
            }
            else {
                throw new Error(`Word with uid ${uid} not found`);
            }
    }

    public async updateReferent(referent: Referent): Promise<void> {
        const index = TestLanguageService.referent.findIndex(item => item.uid === referent.uid);
        if (index !== -1) {
            TestLanguageService.referent[index] = referent;
            }
            else {
                throw new Error(`Referent with uid ${referent.uid} not found`);
            }
    }
    

    public async updateSymbol(symbol: Symbol): Promise<void> {
        const index = TestLanguageService.symbols.findIndex(item => item.uid === symbol.uid);
        if (index !== -1) {
            TestLanguageService.symbols[index] = symbol;
            }
            else {
                throw new Error(`Referent with uid ${symbol.uid} not found`);
            }
    }

    public async updateWord(word: Word): Promise<void> {
        const index = TestLanguageService.words.findIndex(item => item.uid === word.uid);
        if (index !== -1) {
            TestLanguageService.words[index] = word;
            }
            else {
                throw new Error(`Referent with uid ${word.uid} not found`);
            }
    }

    public async linkReferentAndSymbol(referentUid: string, symbolUid: string) {
        const referent = await this.getReferentByUid(referentUid);
        const symbol = await this.getSymbolByUid(symbolUid);
        if ( referent && symbol){
            referent.symbols?.push(symbol);
        }
        else{
            throw new Error(`Referent or symbol not found`)
        }
    }

    public async linkSymbolAndWord(symbolUid: string, wordUid: string){
        const word = await this.getWordByUid(wordUid);
        const symbol = await this.getSymbolByUid(symbolUid);
        if (word && symbol){
            const symbolIndex = TestLanguageService.symbols.findIndex(item => item.uid === symbol.uid);
            TestLanguageService.symbols[symbolIndex].words?.push(word);
        }
        else{
            throw new Error(`Referent or symbol not found`)
        }
    }

    public async setWordAsLemma(wordUid: string, symbolUid: string){
        const word = await this.getWordByUid(wordUid);
        if (word){
            const symbolIndex = TestLanguageService.symbols.findIndex(item => item.uid === symbolUid);
            TestLanguageService.symbols[symbolIndex].lemma = word;
        }
        else{
            throw new Error(`Symbol or word not dound`);
        }
    }

    public async getWordAttributesLabels(): Promise<Record<string, string[]>>{
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
    public async getLanguages(): Promise<string[]>{
        return ["UNSPECIFIED", "EN","NL","PT","ES","FR"];
    }
    public async getSymbolTypes(): Promise<string[]>{
        return ["object", "action", "modifier", "phrase"];
    }

    public async listReferentsByWords(query: string): Promise<Referent[]> {
        // 1. Find words matching the query
        const foundWords = TestLanguageService.words.filter(word =>
        word.word.toLowerCase().includes(query.toLowerCase())
        );
        // 2. Find symbols containing any of these words
        const foundSymbols = TestLanguageService.symbols.filter(symbol =>
            symbol.words?.some(word =>
                foundWords.some(fw => fw.uid === word.uid)
            )
        );
        // 3. Find referents containing any of these symbols
        const foundReferents = TestLanguageService.referent.filter(referent =>
            referent.symbols?.some(symbol =>
                foundSymbols.some(fs => fs.uid === symbol.uid)
            )
        );
        return foundReferents; 
        }

    public async listSymbolsByWords(query: string): Promise<Symbol[]> {
        // 1. Find words matching the query
        const foundWords = TestLanguageService.words.filter(word =>
        word.word.toLowerCase().includes(query.toLowerCase())
        );
        // 2. Find symbols containing any of these words
        const foundSymbols = TestLanguageService.symbols.filter(symbol =>
            symbol.words?.some(word =>
                foundWords.some(fw => fw.uid === word.uid)
            )
        );

        return foundSymbols; 
        }
    
    public async listWordsByQuery(query: string): Promise<Word[]> {
        // 1. Find words matching the query
        const foundWords = TestLanguageService.words.filter(word =>
        word.word.toLowerCase().includes(query.toLowerCase())
        );
        return foundWords; 
        }

}


export {TestLanguageService}