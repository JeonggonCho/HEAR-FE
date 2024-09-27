import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Input from "@components/Input";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

import {cncHeatSchema} from "@schemata/machineSchema.ts";

import {Container, ImageWrapper} from "./style.ts";

import cnc from "@assets/images/cnc.png";

const ReservationCnc:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            date: "",
        }
    });

    const handleDateSelect = (date: string) => {
        setValue("date", date);
    };

    return (
        <Container>
            <Header
                leftChild={<ArrowBack/>}
                centerText={"CNC 예약"}
                rightChild={<Button
                    type={"button"}
                    content={"약 도"}
                    width={"fit"}
                    scale={"small"}
                    color={"second"}
                    onClick={() => setShowMap(true)}
                />}
            />
            <ImageWrapper>
                <img src={cnc} alt={"cnc"}/>
            </ImageWrapper>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Input
                    label={"날 짜"}
                    type={"date"}
                    id={"cnc-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    onClick={() => setIsOpenCalendar(true)}
                    readonly
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

            {showMap &&
                <Modal
                  content={<RoomMap machine={"cnc"} setModal={setShowMap}/>}
                  setModal={setShowMap}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default ReservationCnc;