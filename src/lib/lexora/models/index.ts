interface Referent {
    uid?: string,
    enReference: string,
    imageSource?: string,
    symbols?: Symbol[],
}

interface Symbol {
    uid?: string,
    symbolType: number,
    language: number,
    lemma?: Word,
    words?: Word[]
}

interface Word {
    uid?: string,
    word: string,
    ipa?: string,
    soundSource?: string,
    attributes?: WordAttributes
}

interface WordAttributes{
    wordId: string,
    gender: number,
    number: number,
    unique: boolean,
    diminutive: boolean,
    case: number,
    mood: number,
    tense: number,
    aspect: number,
    person: number,
    directObject: boolean,
    indirectObject: boolean,
    valency: number,
    reflexive: boolean
}

interface AnalysisTask{
    jobID: string
}

export type { Referent, Symbol, Word, WordAttributes, AnalysisTask }