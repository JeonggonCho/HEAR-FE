export interface IShortAnswer {
    _id: string;
    questionType: "shortAnswer";
    question: string;
    explanation?: string;
    answers: string;
}

export interface ISingleChoice {
    _id: string;
    questionType: "singleChoice";
    question: string;
    explanation?: string;
    options: {
        optionId: string,
        content: string,
        isAnswer: boolean,
    }[];
}

export interface IMultipleChoice {
    _id: string;
    questionType: "multipleChoice";
    question: string;
    explanation?: string;
    options: {
        optionId: string,
        content: string,
        isAnswer: boolean,
    }[];
}

export type EducationType = IShortAnswer | ISingleChoice | IMultipleChoice;