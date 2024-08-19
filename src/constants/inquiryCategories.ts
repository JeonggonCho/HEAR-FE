export const inquiryCategories = [
    {label: "기기", name: "inquiry-type", value: "machine", id: "radio-1", onChange: () => {}, checked: true},
    {label: "예약", name: "inquiry-type", value: "reservation", id: "radio-2", onChange: () => {}, checked: false},
    {label: "실관련", name: "inquiry-type", value: "room", id: "radio-3", onChange: () => {}, checked: false},
    {label: "기타", name: "inquiry-type", value: "etc", id: "radio-4", onChange: () => {}, checked: false},
];

export const inquiryCategoriesValues = {
    "machine": "기기",
    "reservation": "예약",
    "room": "실관련",
    "etc": "기타",
};