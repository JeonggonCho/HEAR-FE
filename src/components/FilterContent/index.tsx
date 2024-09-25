import {FC, useEffect} from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Select from "@components/Select";
import Button from "@components/Button";
import Toast from "@components/Toast";

import {yearCheckboxCategories} from "@constants/yearCategories.ts";
import {filterUserSchema} from "@schemata/userSchema.ts";
import useRequest from "@hooks/useRequest.ts";
import {IFilterContentProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const FilterContent:FC<IFilterContentProps> = ({setModal}) => {
    const {errorText, sendRequest} = useRequest();

    type YearOptions = "all" | "1" | "2" | "3" | "4" | "5";
    type FilterFormData = z.infer<typeof filterUserSchema>;

    const {register, handleSubmit, reset, watch, setValue} = useForm<FilterFormData>({
        resolver: zodResolver(filterUserSchema),
        defaultValues: {
            year: ["all"] as YearOptions[],
        },
    });

    const selectedYear = watch("year");

    useEffect(() => {
        reset({
            year: ["all"],
        })
    }, [reset]);

    const handleYearChange = (selectedValue: YearOptions) => {
        // "all" 선택 시, "all"
        if (selectedValue === "all") {
            setValue("year", ["all"]);
        } else {
            // 기존 체크에 "all" 있으면 제거 한 후 복사
            const currentYears = selectedYear.includes("all")
                ? selectedYear.filter(val => val !== "all")
                : selectedYear;
            // 모두 체크 시, "all"로 전환
            if (selectedYear.length + 1 === yearCheckboxCategories.length - 1) {
                setValue("year", ["all"]);
            } else {
                // 기존 체크에 동일한 체크가 있으면 제거
                if (currentYears.includes(selectedValue)) {
                    const newYears = currentYears.filter(val => val !== selectedValue);
                    // 아무 것도 체크 안 되어있을 경우, "all"로 체크
                    // @ts-ignore
                    setValue("year", newYears.length > 0 ? newYears : ["all"]);
                } else {
                    // 없는 체크 클릭 시, 포함시키기
                    const newYears = [...currentYears, selectedValue];
                    // @ts-ignore
                    setValue("year", newYears);
                }
            }
        }
    };

    const submitHandler:SubmitHandler<FilterFormData> = async (data: FilterFormData) => {
        try {
            const years = data.year.join(",");
            const response = await sendRequest({
                url: `users/all?years=${years}`,
            });
        } catch (err) {
            console.error("유저 목록 필터 요청 중 에러 발생: ", err);
        } finally {
            setModal(false);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Select
                    label={"학년 선택"}
                    register={register}
                    name={"year"}
                    categories={yearCheckboxCategories}
                    type={"checkbox"}
                    defaultValues={selectedYear}
                    onSelectChange={handleYearChange}
                />
                <Button
                    type={"submit"}
                    content={"적용하기"}
                    width={"full"}
                    color={"primary"}
                    scale={"big"}
                />
            </form>

            {errorText &&
                <Toast text={errorText} time={5000}/>
            }
        </Container>
    );
};

export default FilterContent;