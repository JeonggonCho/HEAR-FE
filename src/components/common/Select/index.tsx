import React, {FC} from 'react';
import {ReactSVG} from "react-svg";

import InputMessage from "@components/common/InputMessage";

import {ISelectProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {
    CheckboxListWrapper,
    CheckboxWrapper,
    Container,
    LabelWrapper,
    RadioListWrapper,
    RadioWrapper
} from "./style.ts";

import check from "@assets/icons/check.svg";

const Select:FC<ISelectProps> = ({label, categories, register, name, errorMessage, type="radio", onSelectChange, values=[]}) => {
    const {lang, isDarkMode} = useThemeStore();

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
                                  disabled={category.status}
                              />
                              <LabelWrapper
                                  htmlFor={category.id}
                                  isDarkMode={isDarkMode}
                                  lang={lang}
                              >
                                  {category.label}
                              </LabelWrapper>
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
                                    disabled={category.status}
                                />
                                <label htmlFor={category.id}>
                                    <div><ReactSVG src={check}/></div> {category.label}
                                </label>
                            </CheckboxWrapper>
                        );
                    })}
                </CheckboxListWrapper>
            }

            {errorMessage && <InputMessage message={errorMessage} type={"error"}/>}
        </Container>
    );
};

export default React.memo(Select);