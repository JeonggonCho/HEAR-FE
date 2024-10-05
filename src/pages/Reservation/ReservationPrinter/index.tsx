import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Modal from "@components/common/Modal";
import Calendar from "@components/common/Calendar";

import {machineType} from "@constants/machineCategories.ts";
import {printerSchema} from "@schemata/machineSchema.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container, ImageWrapper, MapIcon} from "./style.ts";

import printer from "@assets/images/3d_printer.png";
import mapIcon from "@assets/icons/map.svg";

const ReservationPrinter:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: zodResolver(printerSchema),
        defaultValues: {
            machine: "",
            date: "",
            time: "",
        },
    });

    const handleDateSelect = (date: string) => {
        setValue("date", date);
    };

    return (
        <Container>
            <Header
                leftChild={<ArrowBack/>}
                centerText={headerCategories.printerReservationHeader[lang]}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={printer} alt={"3d 프린터"}/>
            </ImageWrapper>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Select
                    label={inputCategories.selectMachine[lang]}
                    categories={machineType}
                    name={"machine"}
                    register={register}
                    errorMessage={errors.machine?.message}
                    type={"radio"}
                />

                <Input
                    label={inputCategories.date[lang]}
                    type={"date"}
                    id={"printer-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    onClick={() => setIsOpenCalendar(true)}
                    readonly
                />

                <Button type={"submit"} content={buttonCategories.reservation[lang]} width={"full"} color={"primary"} scale={"big"}/>
            </form>

            {isOpenCalendar &&
              <Modal
                title={inputCategories.date[lang]}
                content={
                    <Calendar
                        setModal={setIsOpenCalendar}
                        onSelectDate={handleDateSelect}
                    />
                }
                setModal={setIsOpenCalendar}
                type={"bottomSheet"}
              />
            }

            {showMap &&
                <Modal
                  content={<RoomMap machine={"printer"} setModal={setShowMap}/>}
                  setModal={setShowMap}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default ReservationPrinter;