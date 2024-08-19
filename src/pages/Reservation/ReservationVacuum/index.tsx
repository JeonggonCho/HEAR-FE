import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {cncHeatSawVacuumSchema} from "@schemata/cncHeatSawVacuumSchema.ts";

const ReservationVacuum = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(cncHeatSawVacuumSchema),
        defaultValues: {
            date: "",
            time: "",
        }
    });

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

                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationVacuum;