export interface IEducation {
    _id: string;
    educationType: "shortAnswer" | "singleChoice" | "multipleChoice";
    question: string;
    description?: string;
    answer: string[];
}