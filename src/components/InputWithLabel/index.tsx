import {Container} from "./style.ts";
import {IInputWithLabelProps} from "@/types/componentProps.ts";
import {FieldValues} from "react-hook-form";
import InputError from "@components/InputError";

const InputWithLabel = <TFieldValues extends FieldValues>(
    {
        label,
        type,
        id,
        name,
        placeholder,
        register,
        errorMessage,
    }: IInputWithLabelProps<TFieldValues>
) => {
    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                {...register(name)}
                type={type}
                id={id}
                placeholder={placeholder}
            />
            {errorMessage && <InputError errorMessage={errorMessage}/> }
        </Container>
    );
};

export default InputWithLabel;