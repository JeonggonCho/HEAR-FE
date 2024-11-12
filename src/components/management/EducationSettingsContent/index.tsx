import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import Toggle from "@components/common/Toggle";
import Calendar from "@components/common/Calendar";
import Button from "@components/common/Button";
import InputMessage from "@components/common/InputMessage";

import {getFormattedDate} from "@util/calculateDate.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import EducationSchemaProvider from "@schemata/EducationSchemaProvider.ts";
import {IEducationSettingsContentProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    Container,
    CutOffPointSettingWrapper,
    DateSelectWrapper,
    DateSettingWrapper,
    StatusSettingWrapper
} from "./style.ts";

import erase from "@assets/icons/erase.svg";
import resetIcon from "@assets/icons/reset.svg";


const EducationSettingsContent:FC<IEducationSettingsContentProps> = ({settings, setSettings, initialDateSetting, setInitialDateSetting, initialCutOffPoint, setInitialCutOffPoint}) => {
    const [showStartDateCalendarModal, setShowStartDateCalendarModal] = useState<boolean>(false);
    const [showEndDateCalendarModal, setShowEndDateCalendarModal] = useState<boolean>(false);
    const [isDateModified, setIsDateModified] = useState<boolean>(false);
    const [isCutOffPointModified, setIsCutOffPointModified] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {sendRequest, errorText, clearError} = useRequest();
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
        setShowStartDateCalendarModal(false);
    };

    // 종료일 변경
    const selectEndDate = (date: string) => {
        setValue("endDate", date);
        setSettings(prevState => ({...prevState, endDate: date}));
        setShowEndDateCalendarModal(false);
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

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

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
        <>
            <Container>
                <DateSettingWrapper>
                    <div>
                        <label>{inputCategories.durationSettings[lang]}</label>
                        <div>
                            <Button
                                type={"button"}
                                content={<div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                                    <span>{buttonCategories.reset[lang]}</span> <ReactSVG src={resetIcon}/>
                                </div>}
                                width={"fit"}
                                color={"second"}
                                scale={"small"}
                                onClick={resetDate}
                                disabled={!isDateModified}
                            />
                            <Button
                                type={"button"}
                                content={<div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                                    <span>{buttonCategories.erase[lang]}</span> <ReactSVG src={erase}/>
                                </div>}
                                width={"fit"}
                                color={"second"}
                                scale={"small"}
                                onClick={eraseDate}
                                disabled={!settings.startDate && !settings.endDate}
                            />
                        </div>
                    </div>
                    <DateSelectWrapper onSubmit={handleSubmit(submitHandler)}>
                        <div>
                            <div>
                                <Input
                                    type={"text"}
                                    id={"startDate"}
                                    name={"startDate"}
                                    placeholder={inputCategories.startDate[lang]}
                                    register={register}
                                    onClick={() => setShowStartDateCalendarModal(true)}
                                    readonly
                                />
                                <span>-</span>
                                <Input
                                    type={"text"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    placeholder={inputCategories.endDate[lang]}
                                    register={register}
                                    onClick={() => setShowEndDateCalendarModal(true)}
                                    disabled={!settings.startDate}
                                    readonly
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
                            content={buttonCategories.save[lang]}
                            width={"fit"}
                            color={"approval"}
                            scale={"normal"}
                            disabled={!isDateModified}
                        />
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
                            content={buttonCategories.save[lang]}
                            width={"fit"}
                            color={"approval"}
                            scale={"normal"}
                            disabled={!isCutOffPointModified}
                            onClick={saveCutOffPoint}
                        />
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
            </Container>

            {showStartDateCalendarModal &&
              <Modal
                title={inputCategories.startDate[lang]}
                content={
                    <Calendar
                        calendarType={"normal"}
                        setModal={setShowStartDateCalendarModal}
                        onSelectDate={selectStartDate}
                        date={getValues("startDate")}
                        selectWeekend={true}
                    />
                }
                setModal={setShowStartDateCalendarModal}
                type={"bottomSheet"}
              />
            }

            {showEndDateCalendarModal &&
              <Modal
                title={inputCategories.endDate[lang]}
                content={
                    <Calendar
                        calendarType={"normal"}
                        setModal={setShowEndDateCalendarModal}
                        onSelectDate={selectEndDate}
                        date={getValues("endDate")}
                        selectWeekend={true}
                    />
                }
                setModal={setShowEndDateCalendarModal}
                type={"bottomSheet"}
              />
            }
        </>
    );
};

export default EducationSettingsContent;