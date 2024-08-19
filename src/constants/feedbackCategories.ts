export const feedbackCategories = [
    {label: "좋은점", name: "feedback-type", value: "good", id: "radio-1", onChange: () => {}, checked: false},
    {label: "문제점", name: "feedback-type", value: "bad", id: "radio-2", onChange: () => {}, checked: false},
    {label: "제안", name: "feedback-type", value: "suggest", id: "radio-3", onChange: () => {}, checked: true},
    {label: "기타", name: "feedback-type", value: "etc", id: "radio-4", onChange: () => {}, checked: false},
];

export const feedbackCategoriesValues = {
    "good": "좋은점",
    "bad": "문제점",
    "suggest": "제안",
    "etc": "기타",
};