import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {sawVacuumSchema} from "@schemata/machineSchema.ts";
import {useState} from "react";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";

const ReservationSaw = () => {
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
            <Header leftChild={<ArrowBack/>} centerText={"톱 예약"}/>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"saw-reservation-date"}
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
                    id={"saw-reservation-time"}
                    name={"time"}
                    placeholder={"시간을 선택해주세요"}
                    register={register}
                    errorMessage={errors.time?.message}
                />

                <ColoredBtn type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>

            {isOpenCalendar &&
              <Modal
                content={<Calendar setModal={setIsOpenCalendar} onSelectDate={handleDateSelect}/>}
                setModal={setIsOpenCalendar}
                type={"bottomSheet"}
              />
            }
        </Container>
    );
};

export default ReservationSaw;