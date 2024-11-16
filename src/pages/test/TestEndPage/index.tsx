import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";

import useRequest from "@hooks/useRequest.ts";
import {ITestResult, QuestionResultType} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {QuestionsWrapper, QuestionWrapper, ResultCard, ResultSignWrapper, ResultWrapper} from "./style.ts";

import checkCircle from "@assets/icons/check_circle.svg";
import cancelCircle from "@assets/icons/cancel_circle.svg";
import circle from "@assets/icons/circle.svg";
import close from "@assets/icons/close.svg";


const TestEndPage:FC = () => {
    const [testResult, setTestResult] = useState<ITestResult>();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 유저의 시험 결과 조회
    const fetchTestResult = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education/result",
            });
            if (response.data) {
                setTestResult(response.data);
            }
        } catch (err) {
            console.error("테스트 결과 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchTestResult();
    }, [fetchTestResult]);

    // 맞은 문제 개수 계산
    const countOfCorrect = (questions: QuestionResultType[]) => {
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].isCorrect) count++;
        }
        return count;
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);


    return (
        <>
            <HeadTag title={navCategories.test[lang]}/>

            <Header centerText={headerCategories.testDone[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <ResultWrapper>
                    <ResultCard>
                        <div>
                            <label>{cardCategories.score[lang]}</label>
                            <p><span>{countOfCorrect(testResult?.questions || [])}</span> <span>{`/ ${testResult?.questions.length || 0}`}</span></p>
                        </div>
                        <div/>
                        <div>
                            <label>{cardCategories.result[lang]}</label>
                            <ResultSignWrapper pass={(String(testResult?.isPassed) as "true" | "false") || "false"}>
                                <span>{testResult?.isPassed ? cardCategories.pass[lang] : cardCategories.fail[lang]}</span>
                                <ReactSVG src={testResult?.isPassed ? checkCircle : cancelCircle}/>
                            </ResultSignWrapper>
                        </div>
                    </ResultCard>

                    <QuestionsWrapper>
                        <label>{cardCategories.grading[lang]}</label>
                        <ul>
                            {testResult?.questions.map((q, index) => (
                                <QuestionWrapper
                                    key={index}
                                    pass={q.isCorrect ? "true" : "false"}
                                >
                                    <span>{index}</span>

                                    <div>
                                        <ReactSVG src={q.isCorrect ? circle : close}/>
                                    </div>
                                </QuestionWrapper>
                            ))}
                        </ul>
                    </QuestionsWrapper>
                </ResultWrapper>
            }
        </>
    );
};

export default TestEndPage;