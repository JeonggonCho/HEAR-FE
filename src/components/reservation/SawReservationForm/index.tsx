import {createContext, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FieldErrors, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import InputMessage from "@components/common/InputMessage";
import Button from "@components/common/Button";
import SawSelect from "@components/reservation/SawSelect";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {TimeWrapper} from "@components/reservation/SawReservationForm/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import close from "@assets/icons/close.svg";


const SawReservationContext = createContext<{
    condition: any[];
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    getValues: UseFormGetValues<any>;
    errors: FieldErrors<any>;
}>({
    condition: [],
    register: () => ({} as any),
    setValue: () => {},
    getValues: () => ({} as any),
    errors: {},
});


const SawReservationForm = () => {
    const [condition, setCondition] = useState([]);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {sawVacuumSchema} = MachineSchemaProvider();

    // 현재 톱 예약 상태 가져오기
    const fetchAllSawReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/saws",
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("톱 예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setCondition]);

    useEffect(() => {
        fetchAllSawReservationInfo();
    }, [fetchAllSawReservationInfo]);

    type SawFormData = z.infer<typeof sawVacuumSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        getValues
    } = useForm<SawFormData>({
        resolver: zodResolver(sawVacuumSchema),
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
        }
    });

    // 톱 예약 요청
    const submitHandler:SubmitHandler<SawFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/saws",
                method: "post",
                data: data,
            });
            if (response.data) {
                // 예약 완료 페이지로 이동
                setTimeout(() => {
                    navigate("/reservation/done", {replace:true});
                }, 300);
            }
        } catch (err) {
            console.error("톱 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest]);

    return (
        <SawReservationContext.Provider value={{condition, register, errors, setValue, getValues}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={showTooltip ? 48 : 32} style={{margin: "24px"}}>
                    <SawSelect/>

                    <TimeWrapper tooltip={showTooltip.toString()}>
                        <div>
                            <label>{inputCategories.wantedTime[lang]}</label>
                            {showTooltip &&
                              <div>
                                <span>{messageCategories.changeTime[lang]}</span>
                                <ReactSVG src={close} onClick={() => setShowTooltip(false)}/>
                              </div>
                            }
                        </div>

                        <div>
                            <select onChange={(e) => setValue("startTime", e.target.value)}>
                                <option value={""}>{placeholderCategories.startTime[lang]}</option>
                                <option value={"10:00"}>10:00</option>
                                <option value={"11:00"}>11:00</option>
                                <option value={"12:00"}>12:00</option>
                                <option value={"13:00"}>13:00</option>
                                <option value={"14:00"}>14:00</option>
                                <option value={"15:00"}>15:00</option>
                                <option value={"16:00"}>16:00</option>
                                <option value={"17:00"}>17:00</option>
                            </select>
                            <select onChange={(e) => setValue("endTime", e.target.value)}>
                                <option value={""}>{placeholderCategories.endTime[lang]}</option>
                                <option value={"11:00"}>11:00</option>
                                <option value={"12:00"}>12:00</option>
                                <option value={"13:00"}>13:00</option>
                                <option value={"14:00"}>14:00</option>
                                <option value={"15:00"}>15:00</option>
                                <option value={"16:00"}>16:00</option>
                                <option value={"17:00"}>17:00</option>
                                <option value={"18:00"}>18:00</option>
                            </select>
                        </div>
                        {errors.startTime?.message && <InputMessage message={errors.startTime.message} type={"error"}/>}
                        {errors.endTime?.message && <InputMessage message={errors.endTime.message} type={"error"}/>}
                    </TimeWrapper>

                    <Button
                        type={"submit"}
                        variant={"filled"}
                        width={"full"}
                        color={"primary"}
                        size={"lg"}
                    >
                        {buttonCategories.reservation[lang]}
                    </Button>
                </Flex>
            </form>
        </SawReservationContext.Provider>
    );
};

export {SawReservationForm, SawReservationContext};
