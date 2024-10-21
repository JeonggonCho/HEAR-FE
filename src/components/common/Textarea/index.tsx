import {forwardRef, useEffect, useRef} from "react";

import InputError from "@components/common/InputError";

import {ITextareaProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>( // forwardRef를 통해 부모 요소로부터 ref 받기
    (
        {register, name, errorMessage, showCount=true, placeholder, countOfText, text, changeTextareaHandler, isScrolled=true},
        ref
    ) => {

        // 텍스트 영역의 초기 ref
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        // 초기 ref와 부모로부터 받은 ref 합치기
        useEffect(() => {
            if (ref && typeof ref === "function") {
                ref(textareaRef.current);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = textareaRef.current;
            }
        }, [ref]);

        // 스크롤 안 할 경우에, 텍스트 영역의 높이를 동적으로 변화시키기
        useEffect(() => {
            if (!isScrolled && textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }, [text, isScrolled]);

        return (
            <Container isScrolled={isScrolled as boolean}>
                <textarea
                    {...(register ? register(name) : {})}
                    ref={textareaRef}
                    value={text}
                    onChange={changeTextareaHandler}
                    maxLength={400}
                    placeholder={placeholder}
                />
                {errorMessage && <InputError errorMessage={errorMessage}/>}
                {showCount && <p><span>{countOfText}</span> / 400</p>}
            </Container>
        );
    });

export default Textarea;