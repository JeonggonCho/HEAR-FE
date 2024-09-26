import {FC, FormEvent} from "react";

import Select from "@components/Select";
import Button from "@components/Button";

import {passQuizFilterCategories, warningFilterCategories, yearFilterCategories} from "@constants/filterCategories.ts";
import {IFilterContentProps} from "@/types/componentProps.ts";
import useCheckbox from "@hooks/useCheckbox.ts";

import {Container} from "./style.ts";

const UsersFilterContent:FC<IFilterContentProps> = ({filter, setFilter, setModal}) => {
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
                label={"학년 선택"}
                name={"years"}
                categories={yearFilterCategories}
                type={"checkbox"}
                onSelectChange={handleYears}
                values={year}
            />
            <Select
                label={"경고 횟수 선택"}
                name={"warnings"}
                categories={warningFilterCategories}
                type={"checkbox"}
                onSelectChange={handleWarnings}
                values={countOfWarning}
            />
            <Select
                label={"교육 이수 여부 선택"}
                name={"passQuiz"}
                categories={passQuizFilterCategories}
                type={"checkbox"}
                onSelectChange={handlePassQuiz}
                values={passQuiz}
            />
            <Button
                type={"submit"}
                content={"적용하기"}
                width={"full"}
                color={"primary"}
                scale={"big"}
            />
        </Container>
    );
};

export default UsersFilterContent;