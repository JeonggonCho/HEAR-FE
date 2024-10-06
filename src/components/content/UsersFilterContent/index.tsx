import {FC, FormEvent} from "react";

import Select from "@components/common/Select";
import Button from "@components/common/Button";

import {IFilterContentProps} from "@/types/componentProps.ts";
import useCheckbox from "@hooks/useCheckbox.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {filterCategories} from "@constants/filterCategories.ts";

import {Container} from "./style.ts";

const UsersFilterContent:FC<IFilterContentProps> = ({filter, setFilter, setModal}) => {
    const {lang} = useThemeStore();

    const yearFilterCategories = [
        {label: filterCategories.all[lang], value: "all", id: "year-all"},
        {label: filterCategories.first[lang], value: "1", id: "year-1"},
        {label: filterCategories.second[lang], value: "2", id: "year-2"},
        {label: filterCategories.third[lang], value: "3", id: "year-3"},
        {label: filterCategories.fourth[lang], value: "4", id: "year-4"},
        {label: filterCategories.fifth[lang], value: "5", id: "year-5"},
    ];

    const warningFilterCategories = [
        {label: filterCategories.all[lang], value: "all", id: "warning-all"},
        {label: filterCategories.zero[lang], value: 0, id: "warning-0"},
        {label: filterCategories.one[lang], value: 1, id: "warning-1"},
        {label: filterCategories.two[lang], value: 2, id: "warning-2"},
    ];

    const passQuizFilterCategories = [
        {label: filterCategories.all[lang], value: "all", id: "quiz-all"},
        {label: filterCategories.pass[lang], value: true, id: "quiz-pass"},
        {label: filterCategories.fail[lang], value: false, id: "quiz-fail"},
    ];

    const {values: year, handleCheck: handleYears} = useCheckbox(filter.year || ["all"]);
    const {values: countOfWarning, handleCheck: handleWarnings} = useCheckbox(filter.countOfWarning || ["all"]);
    const {values: passQuiz, handleCheck: handlePassQuiz} = useCheckbox(filter.passQuiz || ["all"]);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilter({year, countOfWarning, passQuiz});
        setModal(false);
    };

    return (
        <Container onSubmit={handleSubmit}>
            <Select
                label={inputCategories.selectYear[lang]}
                name={"years"}
                categories={yearFilterCategories}
                type={"checkbox"}
                onSelectChange={handleYears}
                values={year}
            />
            <Select
                label={inputCategories.selectWarning[lang]}
                name={"warnings"}
                categories={warningFilterCategories}
                type={"checkbox"}
                onSelectChange={handleWarnings}
                values={countOfWarning}
            />
            <Select
                label={inputCategories.selectPass[lang]}
                name={"passQuiz"}
                categories={passQuizFilterCategories}
                type={"checkbox"}
                onSelectChange={handlePassQuiz}
                values={passQuiz}
            />
            <Button
                type={"submit"}
                content={buttonCategories.apply[lang]}
                width={"full"}
                color={"primary"}
                scale={"big"}
            />
        </Container>
    );
};

export default UsersFilterContent;