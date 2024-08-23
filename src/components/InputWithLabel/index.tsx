import {Container} from "./style.ts";
import {IInputWithLabelProps} from "@/types/componentProps.ts";
import {FieldValues} from "react-hook-form";
import InputError from "@components/InputError";
import {ReactSVG} from "react-svg";
import visible from "@assets/icons/visible.svg";
import invisible from "@assets/icons/invisible.svg";
import {useState} from "react";

const InputWithLabel = <TFieldValues extends FieldValues>(
    {
        label,
        type,
        id,
        name,
        placeholder,
        register,
        errorMessage,
        onClick,
        onChange,
        readonly,
        visibleToggle
    }: IInputWithLabelProps<TFieldValues>
) => {
    const [inputType, setInputType] = useState<string>(type);

    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                {...register(name)}
                type={inputType}
                id={id}
                placeholder={placeholder}
                onClick={onClick}
                onChange={onChange}
                readOnly={readonly}
            />
            {visibleToggle && inputType === "password"
                ? <ReactSVG
                    src={visible}
                    onClick={() => setInputType("text")}
                />
                : visibleToggle && inputType === "text"
                    ? <ReactSVG
                        src={invisible}
                        onClick={() => setInputType("password")}
                    />
                    : null
            }
            {errorMessage && <InputError errorMessage={errorMessage}/> }
        </Container>
    );
};

export default InputWithLabel;