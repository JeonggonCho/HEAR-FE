import {FC, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import Toggle from "@components/common/Toggle";
import Calendar from "@components/common/Calendar";
import Button from "@components/common/Button";

import useToggle from "@hooks/useToggle.ts";
import {IEducationSettingsContentProps} from "@/types/componentProps.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {Container, DateSelectWrapper, DateSettingWrapper, StatusSettingWrapper} from "./style.ts";

import reset from "@assets/icons/reset.svg";


const EducationSettingsContent:FC<IEducationSettingsContentProps> = ({settings, setSettings}) => {
    const [showStartDateCalendarModal, setShowStartDateCalendarModal] = useState<boolean>(false);
    const [showEndDateCalendarModal, setShowEndDateCalendarModal] = useState<boolean>(false);
    const [showEducationConfirmModal, setShowEducationConfirmModal] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {status, handleToggle, isLoading, errorText:toggleErrorText, clearError:clearToggleError} = useToggle(false, "");
    const {showToast} = useToastStore();

    // 시작일 변경
    const changeStartDateHandler = async (date: string) => {
        try {
            setSettings(prevState => ({...prevState, startDate: date}));
        } catch (err) {
            console.error("교육 게시 시작일 변경 중 에러 발생: ", err);
        }
    };

    // 종료일 변경
    const changeEndDateHandler = async (date: string) => {
        try {
            setSettings(prevState => ({...prevState, endDate: date}));
        } catch (err) {
            console.error("교육 게시 종료일 변경 중 에러 발생: ", err);
        }
    };

    // 기간 초기화
    const resetDate = () => {
        setSettings(prevState => ({...prevState, startDate: "", endDate: ""}));
    };

    // 교육 게시 토글 클릭
    const clickEducationToggleHandler = () => {

    };

    // 게시 경고 모달 띄우기
    const showEducationToggleConfirmModal = () => {

    };

    // 토글 에러 메시지
    useEffect(() => {
        if (toggleErrorText) showToast(toggleErrorText, "error");
        const errorTimer = setTimeout(() => clearToggleError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [toggleErrorText]);


    return (
        <>
            <Container>
                <DateSettingWrapper>
                    <div>
                        <label>{inputCategories.durationSettings[lang]}</label>
                        <Button
                            type={"button"}
                            content={<div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                                <span>{buttonCategories.reset[lang]}</span> <ReactSVG src={reset}/>
                            </div>}
                            width={"fit"}
                            color={"second"}
                            scale={"small"}
                            onClick={resetDate}
                        />
                    </div>
                    <DateSelectWrapper>
                        <Input
                            label={inputCategories.startDate[lang]}
                            type={"Date"}
                            id={"startDate"}
                            name={"startDate"}
                            value={settings.startDate}
                            onClick={() => setShowStartDateCalendarModal(true)}
                        />
                        <span> - </span>
                        <Input
                            label={inputCategories.endDate[lang]}
                            type={"Date"}
                            id={"startDate"}
                            name={"startDate"}
                            value={settings.endDate}
                            onClick={() => setShowEndDateCalendarModal(true)}
                            disabled={!settings.startDate}
                        />
                    </DateSelectWrapper>
                </DateSettingWrapper>

                <StatusSettingWrapper>
                    <label>{inputCategories.onEducation[lang]}</label>
                    <Toggle click={handleToggle} status={status} isLoading={isLoading}/>
                </StatusSettingWrapper>
            </Container>

            {showStartDateCalendarModal &&
              <Modal
                title={inputCategories.startDate[lang]}
                content={
                    <Calendar
                        calendarType={"normal"}
                        setModal={setShowStartDateCalendarModal}
                        onSelectDate={(date) => changeStartDateHandler(date)}
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
                        onSelectDate={(date) => changeEndDateHandler(date)}
                        selectWeekend={true}
                    />
                }
                setModal={setShowEndDateCalendarModal}
                type={"bottomSheet"}
              />
            }

            {showEducationConfirmModal &&
                <Modal
                  content={<></>}
                  setModal={setShowEducationConfirmModal}
                  type={"popup"}
                />
            }
        </>
    );
};

export default EducationSettingsContent;