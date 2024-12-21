import {ChangeEvent, useState} from "react";
import {FieldPath, FieldValues, UseFormRegister} from "react-hook-form";
import InputMessage from "@components/common/InputMessage";
import Icon from "@components/common/Icon";
import Flex from "@components/common/Flex";
import {Container, VisibleToggleWrapper} from "./style.ts";
import visible from "@assets/icons/visible.svg";
import invisible from "@assets/icons/invisible.svg";


interface IInputProps<T extends FieldValues> {
    label?: string;
    subLabel?: string;
    type: string;
    id: string;
    name: FieldPath<T>;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    register?: UseFormRegister<T>;
    errorMessage?: string;
    readonly?: boolean;
    visibleToggle?: boolean;
    disabled?: boolean;
    value?: any;
    maxLength?: number;
}


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
            {(label || subLabel) &&
                <Flex direction={"column"} gap={8} style={{marginBottom: "8px"}}>
                    {label && <label htmlFor={id}>{label}</label>}
                    {subLabel && <span>{subLabel}</span>}
                </Flex>
            }

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
                    {...register ? register(name, {onChange}) : null}
                    type={inputType}
                    id={id}
                    placeholder={placeholder}
                    onClick={onClick}
                    readOnly={readonly}
                    disabled={disabled}
                    min={inputType === "number" ? 0 : undefined}
                    onWheel={e => (e.target as HTMLElement).blur()}
                    value={value}
                    maxLength={maxLength}
                />
            }

            {errorMessage && <InputMessage message={errorMessage} type={"error"}/>}

            <VisibleToggleWrapper>
                {visibleToggle && inputType === "password"
                    ?
                    <Icon
                        svg={visible}
                        isHovered={true}
                        onClick={() => setInputType("text")}
                    />
                    : visibleToggle && inputType === "text"
                        ? <Icon
                            svg={invisible}
                            isHovered={true}
                            onClick={() => setInputType("password")}
                        />
                        : null
                }
            </VisibleToggleWrapper>
        </Container>
    );
};

export default Input;