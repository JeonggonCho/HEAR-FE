import {forwardRef, MutableRefObject, useEffect, useRef} from "react";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import InputMessage from "@components/common/InputMessage";
import {Container} from "./style.ts";


interface ITextareaProps<T extends FieldValues> {
    register?: UseFormRegister<T>;
    name: FieldPath<T>;
    errorMessage?: string;
    showCount?: boolean;
    countOfTextarea?: number;
    isScrolled?: boolean;
    placeholder?: string;
    maxLength?: number;
}


const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps<any>>( // forwardRef 를 통해 부모 요소로부터 ref 받기
    (
        {
            register,
            name,
            errorMessage,
            showCount = true,
            countOfTextarea,
            placeholder,
            isScrolled = true,
            maxLength = 400,
        },
        ref
    ) => {

        // 텍스트 영역의 초기 ref
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        // ref 병합하기
        const mergedRefs = (element: HTMLTextAreaElement) => {
            // react-hook-form 의 ref 연결
            if (register) register(name).ref(element);

            // 커스텀 textareaRef 연결
            textareaRef.current = element;

            // 부모 컴포넌트에서 전달된 ref 연결
            if (ref) {
                if (typeof ref === "function") {
                    ref(element);
                } else {
                    (ref as MutableRefObject<HTMLTextAreaElement | null>).current = element;
                }
            }
        }

        // 스크롤 안 할 경우에, 텍스트 영역의 높이를 동적으로 변화시키기
        useEffect(() => {
            if (!isScrolled && textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }, [isScrolled]);

        return (
            <Container isScrolled={isScrolled as boolean}>
                <textarea
                    {...(register ? register(name) : null)}
                    ref={(element: HTMLTextAreaElement) => mergedRefs(element)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
                {errorMessage && <InputMessage message={errorMessage} type={"error"}/>}
                {showCount && <p><span>{countOfTextarea}</span> / {maxLength}</p>}
            </Container>
        );
    });

export default Textarea;