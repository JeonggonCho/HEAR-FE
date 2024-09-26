import React, {FC} from 'react';
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

const Select:FC<ISelectWithLabelProps> = ({label, categories, register, name, errorMessage, type, onSelectChange, values}) => {
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
                                  {...register ? register(name) : null}
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
                                    onChange={() => onSelectChange ? onSelectChange(category.value, categories) : null}
                                    checked={values?.includes(category.value)}
                                />
                                <label htmlFor={category.id}>
                                    <div><ReactSVG src={check}/></div> {category.label}
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

export default React.memo(Select);