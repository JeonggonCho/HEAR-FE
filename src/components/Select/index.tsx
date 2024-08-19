import {FC} from 'react';
import {Container, LabelWrapper, RadioWrapper} from "./style.ts";
import {ISelectWithLabelProps} from "@/types/componentProps.ts";

const Select:FC<ISelectWithLabelProps> = ({label, categories}) => {
    return (
        <Container>
            <label>{label}</label>

            <div>
                {categories.map((category, index) => {
                    return (
                        <RadioWrapper key={index}>
                            <input type="radio" name={category.name} value={category.value} id={category.id} onChange={category.onChange} checked={category.checked}/>
                            <LabelWrapper htmlFor={category.id}>{category.label}</LabelWrapper>
                        </RadioWrapper>
                    );
                })}
            </div>
        </Container>
    );
};

export default Select;