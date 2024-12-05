import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Toggle from "@components/common/Toggle";
import Button from "@components/common/Button";
import InputMessage from "@components/common/InputMessage";
import Flex from "@components/common/Flex";
import EducationManagementStartDateSetting from "@components/management/EducationManagementStartDateSetting";
import EducationManagementEndDateSetting from "@components/management/EducationManagementEndDateSetting";
import {getFormattedDate} from "@util/calculateDate.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import EducationSchemaProvider from "@schemata/EducationSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {
    CutOffPointSettingWrapper,
    DateSelectWrapper,
    DateSettingWrapper,
    StatusSettingWrapper
} from "./style.ts";
import {IEducationSettings} from "@/types/education.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import erase from "@assets/icons/erase.svg";
import resetIcon from "@assets/icons/reset.svg";


interface IEducationManagementMenuContentProps {
    settings: IEducationSettings;
    setSettings: React.Dispatch<React.SetStateAction<IEducationSettings>>;
    initialDateSetting: {startDate: string | undefined, endDate: string | undefined};
    setInitialDateSetting: React.Dispatch<React.SetStateAction<{startDate: string | undefined, endDate: string | undefined}>>;
    initialCutOffPoint: {cutOffPoint: string};
    setInitialCutOffPoint: React.Dispatch<React.SetStateAction<{cutOffPoint: string}>>;
}


const EducationManagementMenuContent = (
    {
        settings,
        setSettings,
        initialDateSetting,
        setInitialDateSetting,
        initialCutOffPoint,
        setInitialCutOffPoint
    }: IEducationManagementMenuContentProps) => {
    const [isDateModified, setIsDateModified] = useState<boolean>(false);
    const [isCutOffPointModified, setIsCutOffPointModified] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {sendRequest} = useRequest();
    const {status, handleToggle, isLoading} = useToggle(settings.status, "/education/implementation");
    const {dateRangeSchema} = EducationSchemaProvider();

    type EducationDateFormData = z.infer<typeof dateRangeSchema>;

    const {register, handleSubmit, formState: {errors}, reset, setValue, getValues} = useForm<EducationDateFormData>({
        resolver: zodResolver(dateRangeSchema),
        defaultValues: {
            startDate: "",
            endDate: "",
        },
    });

    useEffect(() => {
        reset({
            startDate: settings.startDate ? getFormattedDate(settings.startDate, "dash") : "",
            endDate: settings.endDate ? getFormattedDate(settings.endDate, "dash") : "",
        });
    }, []);

    // 시작일 변경
    const selectStartDate = (date: string) => {
        setValue("startDate", date)
        setSettings(prevState => ({...prevState, startDate: date}));
    };

    // 종료일 변경
    const selectEndDate = (date: string) => {
        setValue("endDate", date);
        setSettings(prevState => ({...prevState, endDate: date}));
    };

    // 기간 지우기
    const eraseDate = () => {
        reset({startDate: "", endDate: ""});
        setSettings(prevState => ({...prevState, startDate: "", endDate: ""}));
    };

    // 기간 초기화
    const resetDate = () => {
        reset({
            startDate: initialDateSetting.startDate ? getFormattedDate(initialDateSetting.startDate, "dash") : "",
            endDate: initialDateSetting.endDate ? getFormattedDate(initialDateSetting.endDate, "dash"): "",
        });
        setSettings(prevState => ({...prevState, startDate: initialDateSetting.startDate, endDate: initialDateSetting.endDate}));
    };

    // 기간 저장하기
    const submitHandler:SubmitHandler<EducationDateFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/education/date",
                method: "patch",
                data: data,
            });
            if (response.data) {
                const {startDate, endDate} = response.data;
                setSettings(prevState => ({...prevState, startDate, endDate}));
                setInitialDateSetting({startDate, endDate});
                showToast(messageCategories.durationSaveDone[lang], "success");
            }
        } catch (err) {
            console.error("교육 기간 저장 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    // 커트라인 문제 개수 입력
    const changeCutOffPoint = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 1) {
            setSettings((prevState) => ({...prevState, cutOffPoint: e.target.value}));
        }
    };

    // 커트라인 문제 개수 저장하기
    const saveCutOffPoint = async () => {
        if (Number(settings.cutOffPoint) === 0 || Number(settings.cutOffPoint) > 9) {
            showToast(messageCategories.warningCutOffPoint[lang], "error");
            return;
        }
        const data = {cutOffPoint: parseInt(settings.cutOffPoint, 10)};
        try {
            const response = await sendRequest({
                url: "/education/cutOffPoint",
                method: "patch",
                data: data,
            });
            if (response.data) {
                const cutOffPoint = response.data;
                setSettings((prevState) => ({...prevState, cutOffPoint}));
                setInitialCutOffPoint({cutOffPoint});
                showToast(messageCategories.saveCutOffPointDone[lang], "success");
            }
        } catch (err) {
            console.error("커트라인 문제 개수 저장 중 에러 발생: ", err);
        }
    };

    // 기간 변경 여부 체크
    useEffect(() => {
        if (JSON.stringify({startDate: settings.startDate, endDate: settings.endDate}) !== JSON.stringify(initialDateSetting)) {
            setIsDateModified(true);
        } else {
            setIsDateModified(false);
        }
    }, [settings, initialDateSetting]);

    // 커트라인 변경 여부 체크
    useEffect(() => {
        if (JSON.stringify({cutOffPoint: settings.cutOffPoint}) !== JSON.stringify(initialCutOffPoint)) {
            setIsCutOffPointModified(true);
        } else {
            setIsCutOffPointModified(false);
        }
    }, [settings, initialCutOffPoint]);


    return (
        <Flex direction={"column"} gap={64} style={{margin: "0 0 12px"}}>
            <DateSettingWrapper>
                <div>
                    <label>{inputCategories.durationSettings[lang]}</label>
                    <div>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"second"}
                            size={"sm"}
                            onClick={resetDate}
                            disabled={!isDateModified}
                        >
                            <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                                <span>{buttonCategories.reset[lang]}</span> <ReactSVG src={resetIcon}/>
                            </div>
                        </Button>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"second"}
                            size={"sm"}
                            onClick={eraseDate}
                            disabled={!settings.startDate && !settings.endDate}
                        >
                            <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                                <span>{buttonCategories.erase[lang]}</span> <ReactSVG src={erase}/>
                            </div>
                        </Button>
                    </div>
                </div>
                <DateSelectWrapper onSubmit={handleSubmit(submitHandler)}>
                    <div>
                        <div>
                            <EducationManagementStartDateSetting
                                register={register}
                                selectStartDate={selectStartDate}
                                getValues={getValues}
                            />
                            <span>-</span>
                            <EducationManagementEndDateSetting
                                register={register}
                                selectEndDate={selectEndDate}
                                getValues={getValues}
                            />
                        </div>
                        <div>
                            {errors.startDate?.message &&
                              <InputMessage message={errors.startDate.message} type={"error"}/>}
                            {errors.endDate?.message &&
                              <InputMessage message={errors.endDate.message} type={"error"}/>}
                        </div>
                    </div>

                    <Button
                        type={"submit"}
                        variant={"filled"}
                        width={"fit"}
                        color={"approval"}
                        size={"md"}
                        disabled={!isDateModified}
                    >
                        {buttonCategories.save[lang]}
                    </Button>
                </DateSelectWrapper>
            </DateSettingWrapper>

            <CutOffPointSettingWrapper>
                <div>
                    <label>{inputCategories.cutOffPointSettings[lang]}</label>
                    <p>{inputCategories.descriptionOfCutOffPointSettings[lang]}</p>
                </div>
                <div>
                    <Input
                        type={"number"}
                        id={"cutOffPoint"}
                        name={"cutOffPoint"}
                        onChange={changeCutOffPoint}
                        value={settings.cutOffPoint}
                        maxLength={1}
                    />
                    <Button
                        type={"button"}
                        variant={"filled"}
                        width={"fit"}
                        color={"approval"}
                        size={"md"}
                        disabled={!isCutOffPointModified}
                        onClick={saveCutOffPoint}
                    >
                        {buttonCategories.save[lang]}
                    </Button>
                </div>
            </CutOffPointSettingWrapper>

            <StatusSettingWrapper>
                <label>{inputCategories.onEducation[lang]}</label>
                <Toggle
                    click={handleToggle}
                    status={status}
                    isLoading={isLoading}
                />
            </StatusSettingWrapper>
        </Flex>
    );
};

export default EducationManagementMenuContent;