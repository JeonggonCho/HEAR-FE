import {ChangeEvent, useState} from "react";

const useTextarea = () => {
    const [text, setText] = useState("");
    const [countOfText, setCountOfText] = useState(0);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 400) {
            setText(inputText);
            setCountOfText(inputText.length);
        }
    };

    return {text, handleTextChange, countOfText};
};

export default useTextarea;