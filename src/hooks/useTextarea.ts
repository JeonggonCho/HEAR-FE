import {ChangeEvent, useEffect, useRef, useState} from "react";


const useTextarea = () => {
    const [text, setText] = useState("");
    const [countOfText, setCountOfText] = useState(0);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // textarea에 포커스를 주기위해 Ref 생성
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // 수정 모드가 되면 textarea 포커스 주기
    useEffect(() => {
        if (isEditMode && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditMode]);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 400) {
            setText(inputText);
            setCountOfText(inputText.length);
        }
    };

    return {textareaRef, text, setText, setCountOfText, handleTextChange, countOfText, isEditMode, setIsEditMode};
};

export default useTextarea;