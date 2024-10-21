import {ChangeEvent, FC} from "react";

import InputError from "@components/common/InputError";

import {ITextareaProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const Textarea:FC<ITextareaProps> = ({register, name, errorMessage, showCount=true, height, placeholder, countOfText, text, handleTextChange}) => {
    return (
        <Container height={height as number}>
            <textarea
                {...register ? register(name) : null}
                value={text}
                onChange={handleTextChange as (e:ChangeEvent<HTMLTextAreaElement>) => void}
                maxLength={400}
                placeholder={placeholder}
            />
            {errorMessage && <InputError errorMessage={errorMessage}/> }
            {showCount && <p><span>{countOfText}</span> / 400</p>}
        </Container>
    );
};

export default Textarea;