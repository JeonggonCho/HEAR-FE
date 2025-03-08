import {createContext, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FieldErrors, SubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import Button from "@components/common/Button";
import HeatSelect from "@components/reservation/HeatSelect";
import {HeatCheckWrapper, ReturnDateWrapper} from "./style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import check from "@assets/icons/check.svg";


const HeatReservationContext = createContext<{
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


const HeatReservationForm = () => {
    const [condition, setCondition] = useState([]);
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {cncHeatSchema} = MachineSchemaProvider();

    type HeatFormData = z.infer<typeof cncHeatSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        reset
    } = useForm<HeatFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: "",
        },
    });

    // 현재 열선 예약 현황 조회
    const fetchAllHeatReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/heats",
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("열선 예약 현황 조회 중 에러 발생: ", err);
        }
    }, []);

    useEffect(() => {
        fetchAllHeatReservationInfo();
    }, [fetchAllHeatReservationInfo]);

    // 열선 예약 요청
    const submitHandler:SubmitHandler<HeatFormData> = useCallback(async (data) => {
        try {
            await sendRequest({
                url: "/reservations/heats",
                method: "post",
                data: data,
            });
            navigate("/reservation/done", {replace: true});
        } catch (err) {
            console.error("열선 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest, reset]);

    return (
        <HeatReservationContext.Provider value={{condition, register, setValue, getValues, errors}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={32}>
                    <HeatCheckWrapper>
                        <div>
                            <input
                                type={"checkbox"}
                                id={"heatWarning"}
                                onClick={() => setValue("check", !getValues("check"))}
                            />
                            <label htmlFor={"heatWarning"}>
                                <div><Icon svg={check}/></div>
                                {inputCategories.check[lang]}
                            </label>
                        </div>

                        <div>
                            <span>{messageCategories.heatRule[lang]}</span>
                            <p>{messageCategories.heatDescription[lang]}</p>
                        </div>

                        {errors.check?.message &&
                            <p>{errors.check.message}</p>
                        }
                    </HeatCheckWrapper>

                    <HeatSelect/>

                    <ReturnDateWrapper>
                        {cardCategories.return[lang]} <span>{}</span>
                    </ReturnDateWrapper>

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
        </HeatReservationContext.Provider>
    );
};

export {HeatReservationForm, HeatReservationContext};