import {FC, useCallback, useEffect, useState} from "react";
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
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {Container, DateSelectWrapper, DateSettingWrapper, StatusSettingWrapper} from "./style.ts";

import erase from "@assets/icons/erase.svg";
import resetIcon from "@assets/icons/reset.svg";
import {messageCategories} from "@constants/messageCategories.ts";


const EducationSettingsContent:FC<IEducationSettingsContentProps> = ({settings, setSettings, initialDateSetting, setInitialDateSetting}) => {
    const [showStartDateCalendarModal, setShowStartDateCalendarModal] = useState<boolean>(false);
    const [showEndDateCalendarModal, setShowEndDateCalendarModal] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<boolean>(false);

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
            startDate: settings.startDate ? getFormattedDate(settings.startDate) : "",
            endDate: settings.endDate ? getFormattedDate(settings.endDate) : "",
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
            startDate: initialDateSetting.startDate ? getFormattedDate(initialDateSetting.startDate) : "",
            endDate: initialDateSetting.endDate ? getFormattedDate(initialDateSetting.endDate): "",
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

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 기간 변경 여부 체크
    useEffect(() => {
        if (JSON.stringify({startDate: settings.startDate, endDate: settings.endDate}) !== JSON.stringify(initialDateSetting)) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }
    }, [settings, initialDateSetting]);


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
                                disabled={!isModified}
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
                            />
                        </div>
                    </div>
                    <DateSelectWrapper onSubmit={handleSubmit(submitHandler)}>
                        <div>
                            <div>
                                <Input
                                    label={inputCategories.startDate[lang]}
                                    type={"text"}
                                    id={"startDate"}
                                    name={"startDate"}
                                    placeholder={placeholderCategories.date[lang]}
                                    register={register}
                                    onClick={() => setShowStartDateCalendarModal(true)}
                                    readonly
                                />
                                <span> - </span>
                                <Input
                                    label={inputCategories.endDate[lang]}
                                    type={"text"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    placeholder={placeholderCategories.date[lang]}
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
                            disabled={!isModified}
                        />
                    </DateSelectWrapper>
                </DateSettingWrapper>

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