import {ChangeEvent, FC, useState} from "react";

import InputError from "@components/InputError";

import {ITextareaProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const Textarea:FC<ITextareaProps> = ({register, name, errorMessage}) => {
    const [text, setText] = useState("");
    const [countOfText, setCountOfText] = useState(0);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 400) {
            setText(inputText);
            setCountOfText(inputText.length);
        }
    };

    return (
        <Container>
            <textarea
                {...register(name)}
                value={text}
                onChange={handleTextChange}
                maxLength={400}
            />
            {errorMessage && <InputError errorMessage={errorMessage}/> }
            <p><span>{countOfText}</span> / 400자</p>
        </Container>
    );
};

export default Textarea;