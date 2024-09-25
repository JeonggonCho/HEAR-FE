import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Button from "@components/Button";
import Select from "@components/Select";
import Input from "@components/Input";

import {laserSchema} from "@schemata/machineSchema.ts";
import {machineType} from "@constants/machineCategories.ts";

import {Container} from "./style.ts";

const ReservationLaser:FC = () => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: zodResolver(laserSchema),
        defaultValues: {
            machine: "",
            date: "",
            time: "",
        },
    });

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = (new Date().getDate() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setValue("date", formattedDate);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기 예약"}/>

            <RoomMap machine={"laser"}/>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Select
                    label={"기기 선택"}
                    categories={machineType}
                    name={"machine"}
                    register={register}
                    errorMessage={errors.machine?.message}
                    type={"radio"}
                />

                <Input
                    label={"날 짜 (다음날만 예약 가능)"}
                    type={"date"}
                    id={"laser-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    disabled={true}
                />

                <Input
                    label={"시 간"}
                    type={"time"}
                    id={"laser-reservation-time"}
                    name={"time"}
                    placeholder={"시간을 선택해주세요"}
                    register={register}
                    errorMessage={errors.time?.message}
                />

                <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationLaser;