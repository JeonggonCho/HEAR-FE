import {useState} from "react";
import {ReactSVG} from "react-svg";
import {FieldValues} from "react-hook-form";

import InputError from "@components/InputError";

import {IInputWithLabelProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import visible from "@assets/icons/visible.svg";
import invisible from "@assets/icons/invisible.svg";

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
        visibleToggle,
        disabled,
        value,
    }: IInputWithLabelProps<TFieldValues>
) => {
    const [inputType, setInputType] = useState<string>(type);

    return (
        <Container>
            <label htmlFor={id}>{label}</label>

            {type === "range" ?
                <>
                    <input
                        {...register(name, {onChange})}
                        type={inputType}
                        id={id}
                        min={0}
                        max={15}
                        value={value}
                    />
                </>
                :
                <input
                    {...register(name)}
                    type={inputType}
                    id={id}
                    placeholder={placeholder}
                    onClick={onClick}
                    onChange={onChange}
                    readOnly={readonly}
                    disabled={disabled}
                    min={inputType === "number" ? 0 : undefined}
                    onWheel={e => (e.target as HTMLElement).blur()}
                    value={value}
                />
            }

            {errorMessage && <InputError errorMessage={errorMessage}/>}
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
        </Container>
    );
};

export default InputWithLabel;