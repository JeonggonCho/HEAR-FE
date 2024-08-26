import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {cncHeatSchema} from "@schemata/machineSchema.ts";
import {useState} from "react";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

const ReservationCnc = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

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
            <Header leftChild={<ArrowBack/>} centerText={"CNC 예약"}/>
            <RoomMap machine={"cnc"}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
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

                <ColoredBtn type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
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

export default ReservationCnc;