import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Button from "@components/Button";
import InputWithLabel from "@components/InputWithLabel";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

import {sawVacuumSchema} from "@schemata/machineSchema.ts";

import {Container} from "./style.ts";

const ReservationVacuum:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: zodResolver(sawVacuumSchema),
        defaultValues: {
            date: "",
            time: "",
        }
    });

    const handleDateSelect = (date: string) => {
        setValue("date", date);
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기 예약"}/>

            <RoomMap machine={"vacuum"}/>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"vacuum-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    onClick={() => setIsOpenCalendar(true)}
                    readonly
                />

                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"vacuum-reservation-time"}
                    name={"time"}
                    placeholder={"시간을 선택해주세요"}
                    register={register}
                    errorMessage={errors.time?.message}
                />

                <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>

            {isOpenCalendar &&
              <Modal
                title={"날 짜"}
                content={<Calendar setModal={setIsOpenCalendar} onSelectDate={handleDateSelect}/>}
                setModal={setIsOpenCalendar}
                type={"bottomSheet"}
              />
            }
        </Container>
    );
};

export default ReservationVacuum;