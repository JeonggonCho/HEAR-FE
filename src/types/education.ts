export interface IShortAnswer {
    _id: string;
    questionType: "shortAnswer";
    question: string;
    explanation?: string;
    answer?: string;
}

export interface ISingleChoice {
    _id: string;
    questionType: "singleChoice";
    question: string;
    explanation?: string;
    options: {
        optionId: string,
        content: string,
        isAnswer?: boolean,
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
        isAnswer?: boolean,
    }[];
}

export type EducationType = IShortAnswer | ISingleChoice | IMultipleChoice;

export interface IEducationSettings {
    startDate: string | undefined;
    endDate: string | undefined;
    status: boolean;
    cutOffPoint: string;
}

export interface IEducationAnswer {
    questionId: string;
    myAnswer: string | string[] | undefined;
}

export interface QuestionResultType {
    question: string;
    explanation?: string;
    questionType: "shortAnswer" | "singleChoice" | "multipleChoice";
    answer?: string;
    myAnswer?: string | string[];
    options?: {
        content: string;
        isAnswer: boolean;
        isChecked: boolean;
    }[];
    isCorrect: boolean;
};

export interface IEducationResult {
    isPassed: boolean;
    questions: QuestionResultType[];
}