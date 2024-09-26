import {useState} from "react";

const useCheckbox = (defaultValue: any[]) => {
    const [values, setValues] = useState<any[]>(defaultValue);

    const handleCheck = (selectedValue: any, categories: any) => {
        const filteredCategories = categories.filter((cat: { value: any; }) => cat.value !== "all");

        // "all" 선택 시 모든 값 해제 후 "all"만 선택
        if (selectedValue === "all") {
            setValues(["all"]);
        } else {
            // 현재 "all"이 선택되어 있다면 "all" 제거
            let currentValues = values.includes("all") ? [] : values;

            // 선택한 값이 이미 체크되어 있으면 해제
            if (currentValues.includes(selectedValue)) {
                currentValues = currentValues.filter(val => val !== selectedValue);
            } else {
                // 선택한 값 추가
                currentValues = [...currentValues, selectedValue];
            }

            // 모든 항목이 선택되었을 때 "all"로 전환
            if (currentValues.length === filteredCategories.length) {
                setValues(["all"]);
            } else {
                // 그 외에는 선택한 값들만 반영
                setValues(currentValues.length > 0 ? currentValues : ["all"]);
            }
        }
    };

    return { values, handleCheck };
};

export default useCheckbox;
