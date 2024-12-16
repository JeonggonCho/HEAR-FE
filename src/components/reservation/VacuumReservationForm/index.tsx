import {createContext, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FieldErrors, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import InputMessage from "@components/common/InputMessage";
import Button from "@components/common/Button";
import VacuumSelect from "@components/reservation/VacuumSelect";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {TimeWrapper} from "@components/reservation/VacuumReservationForm/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import close from "@assets/icons/close.svg";


const VacuumReservationContext = createContext<{
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


const VacuumReservationForm = () => {
    const [condition, setCondition] = useState([]);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {sawVacuumSchema} = MachineSchemaProvider();

    // 사출 성형기 예약 정보 가져오기
    const fetchAllVacuumReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/vacuums"
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("사출 성형기 예약 현황 조회 중 에러 발생: ", err)
        }
    }, [sendRequest, setCondition]);

    useEffect(() => {
        fetchAllVacuumReservationInfo();
    }, [fetchAllVacuumReservationInfo]);

    type VacuumFormData = z.infer<typeof sawVacuumSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        getValues
    } = useForm<VacuumFormData>({
        resolver: zodResolver(sawVacuumSchema),
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
        }
    });

    // 사출 성형기 예약 요청
    const submitHandler:SubmitHandler<VacuumFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/vacuums",
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
            console.error("사출성형기 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest])

    return (
        <VacuumReservationContext.Provider value={{condition, register, errors, setValue, getValues}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={showTooltip ? 48 : 32} style={{margin: "24px"}}>
                    <VacuumSelect/>

                    <TimeWrapper tooltip={showTooltip}>
                        <div>
                            <label>{inputCategories.wantedTime[lang]}</label>
                            {showTooltip &&
                              <div>
                                <span>{messageCategories.changeTime[lang]}</span>
                                <Icon svg={close} onClick={() => setShowTooltip(false)}/>
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
        </VacuumReservationContext.Provider>
    );
};

export {VacuumReservationForm, VacuumReservationContext};
