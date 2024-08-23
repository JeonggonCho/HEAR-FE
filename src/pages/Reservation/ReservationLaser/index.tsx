import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import ColoredBtn from "@components/ColoredBtn";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {laserSchema} from "@schemata/machineSchema.ts";
import {machineType} from "@constants/machineCategories.ts";

const ReservationLaser = () => {
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
                />

                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"laser-reservation-date"}
                    name={"date"}
                    placeholder={"날짜를 선택해주세요"}
                    register={register}
                    errorMessage={errors.date?.message}
                    disabled={true}
                />

                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"laser-reservation-time"}
                    name={"time"}
                    placeholder={"시간을 선택해주세요"}
                    register={register}
                    errorMessage={errors.time?.message}
                />

                <ColoredBtn type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationLaser;