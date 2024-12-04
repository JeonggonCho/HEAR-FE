import {createContext, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, UseFormRegister, UseFormSetValue, UseFormGetValues, FieldErrors} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import CncSelect from "@components/reservation/CncSelect";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {CncCheckWrapper} from "@components/reservation/CncReservationForm/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import check from "@assets/icons/check.svg";


const CncReservationContext = createContext<{
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


const CncReservationForm = () => {
    const [condition, setCondition] = useState([]);

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {cncHeatSchema} = MachineSchemaProvider();

    type CncFormData = z.infer<typeof cncHeatSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        getValues,
        reset
    } = useForm<CncFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: "",
        }
    });

    // 현재 CNC 예약 현황 조회
    const fetchAllCncReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/cncs",
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("cnc 예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setCondition]);

    useEffect(() => {
        fetchAllCncReservationInfo();
    }, [fetchAllCncReservationInfo]);

    // CNC 예약 요청
    const submitHandler:SubmitHandler<CncFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/cncs",
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
            console.error("CNC 예약 요청 중 에러 발생: ", err);
            reset();
        }
    };

    return (
        <CncReservationContext.Provider value={{condition, register, setValue, getValues, errors}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={32} style={{margin: "24px"}}>
                    <CncCheckWrapper>
                        <div>
                            <input
                                type={"checkbox"}
                                id={"cncWarning"}
                                onClick={() => setValue("check", !getValues("check"))}
                            />
                            <label htmlFor={"cncWarning"}>
                                <div><ReactSVG src={check}/></div>
                                {inputCategories.check[lang]}
                            </label>
                        </div>

                        <div>
                            <span>{messageCategories.cncRule[lang]}</span>
                            <p>{messageCategories.cncDescription[lang]}</p>
                        </div>

                        {errors.check?.message && <p>{errors.check.message}</p>}
                    </CncCheckWrapper>

                    <CncSelect/>

                    <Button
                        type={"submit"}
                        variant={"filled"}
                        width={"full"}
                        color={"primary"}
                        size={"lg"}
                        disabled={!isValid}
                    >
                        {buttonCategories.reservation[lang]}
                    </Button>
                </Flex>
            </form>
        </CncReservationContext.Provider>
    );
};

export {CncReservationForm, CncReservationContext};