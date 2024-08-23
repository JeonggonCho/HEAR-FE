import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import Select from "@components/Select";
import {Container} from "./style.ts";
import {machineType} from "@constants/machineCategories.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {printerSchema} from "@schemata/printerSchema.ts";
import {useState} from "react";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

const ReservationPrinter = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

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
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터 예약"}/>

            <RoomMap machine={"printer"}/>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Select
                    label={"기기 선택"}
                    categories={machineType}
                    name={"machine"}
                    register={register}
                    errorMessage={errors.machine?.message}
                />

                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"printer-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    onClick={() => setIsOpenCalendar(true)}
                    readonly
                />

                <InputWithLabel
                    label={"출력 예상 소요 시간 (시:분)"}
                    type={"time"}
                    id={"required-time"}
                    name={"time"}
                    placeholder={"출력 예상 소요 시간을 입력해주세요"}
                    register={register}
                    errorMessage={errors.time?.message}
                />

                <ColoredBtn type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>

            {isOpenCalendar &&
              <Modal
                content={<Calendar setModal={setIsOpenCalendar} onSelectDate={handleDateSelect}/>}
                setModal={setIsOpenCalendar}
              />
            }
        </Container>
    );
};

export default ReservationPrinter;