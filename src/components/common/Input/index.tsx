import {useState} from "react";
import {ReactSVG} from "react-svg";
import {FieldValues} from "react-hook-form";

import InputMessage from "@components/common/InputMessage";

import {IInputProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import visible from "@assets/icons/visible.svg";
import invisible from "@assets/icons/invisible.svg";

const Input = <T extends FieldValues>(
    {
        label,
        subLabel,
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
        maxLength,
    }: IInputProps<T>
) => {
    const [inputType, setInputType] = useState<string>(type);

    return (
        <Container>
            <div>
                {label && <label htmlFor={id}>{label}</label>}
                {subLabel && <span>{subLabel}</span>}
            </div>

            {type === "range" ?
                <input
                    {...register ? register(name, {onChange}) : null}
                    type={inputType}
                    id={id}
                    min={0}
                    max={15}
                    value={value}
                />
                :
                <input
                    {...register ? register(name) : null}
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
                    maxLength={maxLength}
                />
            }

            {errorMessage && <InputMessage message={errorMessage} type={"error"}/>}

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

export default Input;