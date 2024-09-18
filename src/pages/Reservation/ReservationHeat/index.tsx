import {FC} from "react";
import {useForm} from "react-hook-form";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import InputWithLabel from "@components/InputWithLabel";

import {zodResolver} from "@hookform/resolvers/zod";
import {cncHeatSchema} from "@schemata/machineSchema.ts";

import {Container} from "./style.ts";

const ReservationHeat:FC = () => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            date: "",
        }
    });

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = (new Date().getDate() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setValue("date", formattedDate);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"열선 예약"}/>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"heat-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    disabled={true}
                />

                <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationHeat;