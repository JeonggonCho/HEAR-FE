import React from 'react';
import {UseFormRegister} from "react-hook-form";
import InputMessage from "@components/common/InputMessage";
import Icon from "@components/common/Icon";
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


interface ISelectProps {
    register?: UseFormRegister<any>;
    name: string;
    errorMessage?: string;
    label?: string;
    categories: {
        label: string;
        value: any;
        id: string;
        status?: boolean;
    }[];
    type: "radio" | "checkbox";
    onSelectChange?: (selectedValue: any, categories: any) => void;
    values?: any[];
}


const Select = (
    {
        label,
        categories,
        register,
        name,
        errorMessage,
        type = "radio",
        onSelectChange,
        values=[]
    }: ISelectProps) => {
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
                                  darkmode={isDarkMode.toString()}
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
                                    <div><Icon svg={check}/></div> {category.label}
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