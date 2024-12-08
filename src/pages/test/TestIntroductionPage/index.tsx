import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import {getFormattedDate, isBetweenDate} from "@util/calculateDate.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, ContentWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {navCategories} from "@constants/navCategories.ts";
import {educationCategories} from "@constants/educationCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import test from "@assets/images/test.png";


const TestIntroductionPage = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [availableDate, setAvailableDate] = useState<boolean>(false);
    const [availableStatus, setAvailableStatus] = useState<boolean>(false);
    const [cutOffPoint, setCutOffPoint] = useState<number>(0);

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {sendRequest, errorText, clearError} = useRequest();

    // 교육 설정 조회
    const fetchEducationSettings = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education/settings",
            });
            if (response.data) {
                const {startDate, endDate, cutOffPoint, status} = response.data;
                setStartDate(startDate ? getFormattedDate(startDate, "point") : "");
                setEndDate(endDate ? getFormattedDate(endDate, "point") : "");
                setCutOffPoint(cutOffPoint);
                setAvailableStatus(status);
            }
        } catch (err) {
            console.error("교육 설정 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchEducationSettings();
    }, [fetchEducationSettings]);

    // 오늘이 시작일과 종료일 사이인지 확인 후, 버튼 활성화
    useEffect(() => {
        if (startDate && endDate) {
            const targetDate = new Date();
            const start = new Date(startDate);
            const end = new Date(endDate);
            const result = isBetweenDate(targetDate, start, end);
            setAvailableDate(result);
        } else {
            setAvailableDate(false);
        }
    }, [startDate, endDate]);

    // 테스트 시작 버튼 클릭 시, 유저가 테스트 응시가 가능한지 확인
    const checkUserTestStatus = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education/status",
            });
            if (response.data) {
                navigate("/test/start");
            }
        } catch (err) {
            console.error("응시 확인 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 커트라인 텍스트 생성
    const getCutOffMessage = (lang: "ko" | "en" | "ch", cutOffPoint: number): string => {
        switch (lang) {
            case "ko":
                return `${cutOffPoint} 개 이상 틀릴 경우, 미이수 처리됨`;
            case "en":
                return `If ${cutOffPoint} or more are incorrect, marked as incomplete`;
            case "ch":
                return `如有 ${cutOffPoint} 个或以上错误，将视为未通过`;
            default:
                return "";
        }
    };


    return (
        <>
            <Container>
                <HeadTag title={navCategories.test[lang]}/>

                <Header>
                    <Flex align={"center"} justify={"center"} style={{width: "100%"}}>
                        <Header.Center>
                            <h2 css={headerCenter}>{headerCategories.test[lang]}</h2>
                        </Header.Center>
                    </Flex>
                </Header>

                <ContentWrapper>
                    <div>
                        <img src={test} alt={"교육"}/>
                    </div>

                    <div>
                        <label>{educationCategories.period[lang]}</label>
                        {startDate && endDate ?
                            <span>{`${startDate} ~ ${endDate}`}</span>
                            :
                            <span>{messageCategories.emptyPeriod[lang]}</span>
                        }
                    </div>

                    <div>
                        <label>{educationCategories.participant[lang]}</label>
                        <span>{educationCategories.target[lang]}</span>
                    </div>

                    <div>
                        <label>{educationCategories.cutOffPoint[lang]}</label>
                        <span>{getCutOffMessage(lang, cutOffPoint)}</span>
                    </div>

                    <div>
                        <ul>
                            <li>{educationCategories.needStudy[lang]}</li>
                            <li>{educationCategories.cantModify[lang]}</li>
                            <li>{educationCategories.getAuthority[lang]}</li>
                            <li>{educationCategories.passAgain[lang]}</li>
                        </ul>
                    </div>

                    <Button
                        type={"button"}
                        variant={"filled"}
                        width={"full"}
                        color={"primary"}
                        size={"lg"}
                        onClick={checkUserTestStatus}
                        disabled={!availableDate || !availableStatus}
                    >
                        {buttonCategories.startTest[lang]}
                    </Button>
                </ContentWrapper>
            </Container>
        </>
    );
};

export default TestIntroductionPage;