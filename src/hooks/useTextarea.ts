import {useEffect, useRef, useState} from "react";


const useTextarea = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // textarea에 포커스를 주기위해 Ref 생성
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // 수정 모드가 되면 textarea 포커스 주기
    useEffect(() => {
        if (isEditMode && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditMode]);

    return {textareaRef, isEditMode, setIsEditMode};
};

export default useTextarea;