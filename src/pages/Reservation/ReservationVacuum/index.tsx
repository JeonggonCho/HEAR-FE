import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

import {sawVacuumSchema} from "@schemata/machineSchema.ts";

import {Container, ImageWrapper, MapIcon} from "./style.ts";

import vacuum from "@assets/images/vacuum.png";
import mapIcon from "@assets/icons/map.svg";

const ReservationVacuum:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

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
            <Header
                leftChild={<ArrowBack/>}
                centerText={"사출 성형기 예약"}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={vacuum} alt={"사출성형기"}/>
            </ImageWrapper>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Input
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

                <Input
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

            {showMap &&
                <Modal
                  content={<RoomMap machine={"vacuum"} setModal={setShowMap}/>}
                  setModal={setShowMap}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default ReservationVacuum;