import {FC} from 'react';
import {ReactSVG} from "react-svg";

import InputError from "@components/InputError";

import {ISelectWithLabelProps} from "@/types/componentProps.ts";

import {
    CheckboxListWrapper,
    CheckboxWrapper,
    Container,
    LabelWrapper,
    RadioListWrapper,
    RadioWrapper
} from "./style.ts";

import check from "@assets/icons/check.svg";

const Select:FC<ISelectWithLabelProps> = ({label, categories, register, name, errorMessage, type, defaultValues, onSelectChange}) => {
    return (
        <Container>
            <label>{label}</label>

            {type === "radio" &&
              <RadioListWrapper>
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
              </RadioListWrapper>
            }

            {type === "checkbox" &&
                <CheckboxListWrapper>
                    {categories.map((category, index) => {
                        return (
                            <CheckboxWrapper key={index}>
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.value}
                                    checked={defaultValues?.includes(category.value)}
                                    {...register(name, {
                                        onChange: (e) => onSelectChange(e.target.value)
                                    })}
                                />
                                <label htmlFor={category.id}>
                                    <div>
                                        <ReactSVG src={check}/>
                                    </div>
                                    {category.label}
                                </label>
                            </CheckboxWrapper>
                        );
                    })}
                </CheckboxListWrapper>
            }

            {errorMessage && <InputError errorMessage={errorMessage}/>}
        </Container>
    );
};

export default Select;