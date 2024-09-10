import {FC} from 'react';

import InputError from "@components/InputError";

import {ISelectWithLabelProps} from "@/types/componentProps.ts";

import {Container, LabelWrapper, RadioWrapper} from "./style.ts";

const Select:FC<ISelectWithLabelProps> = ({label, categories, register, name, errorMessage}) => {
    return (
        <Container>
            <label>{label}</label>

            <div>
                {categories.map((category, index) => {
                    return (
                        <RadioWrapper key={index}>
                            <input
                                type="radio"
                                value={category.value}
                                id={category.id}
                                {...register(name)}
                            />
                            <LabelWrapper htmlFor={category.id}>{category.label}</LabelWrapper>
                        </RadioWrapper>
                    );
                })}
            </div>
            {errorMessage && <InputError errorMessage={errorMessage}/> }
        </Container>
    );
};

export default Select;