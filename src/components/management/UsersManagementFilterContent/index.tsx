import React, {FormEvent} from "react";
import Select from "@components/common/Select";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import useCheckbox from "@hooks/useCheckbox.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {filterCategories} from "@constants/filterCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface IFilterContentProps {
    filter: any;
    setFilter: React.Dispatch<React.SetStateAction<any>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}


const UsersFilterContent = ({filter, setFilter, setModal}: IFilterContentProps) => {
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

    const passEducationFilterCategories = [
        {label: filterCategories.all[lang], value: "all", id: "education-all"},
        {label: filterCategories.pass[lang], value: true, id: "education-pass"},
        {label: filterCategories.fail[lang], value: false, id: "education-fail"},
    ];

    const {values: year, handleCheck: handleYears} = useCheckbox(filter.year || ["all"]);
    const {values: countOfWarning, handleCheck: handleWarnings} = useCheckbox(filter.countOfWarning || ["all"]);
    const {values: passEducation, handleCheck: handlePassEducation} = useCheckbox(filter.passEducation || ["all"]);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilter({year, countOfWarning, passEducation});
        setModal(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction={"column"} gap={42}>
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
                    name={"passEducation"}
                    categories={passEducationFilterCategories}
                    type={"checkbox"}
                    onSelectChange={handlePassEducation}
                    values={passEducation}
                />
                <Button
                    type={"submit"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                >
                    {buttonCategories.apply[lang]}
                </Button>
            </Flex>
        </form>
    );
};

export default UsersFilterContent;