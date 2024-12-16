import {useCallback, useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Icon from "@components/common/Icon";
import GradingAnswerListItem from "@components/test/GradingAnswerListItem";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {QuestionsWrapper, ResultCard, ResultSignWrapper, ResultWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {ITestResult, QuestionResultType} from "@/types/education.ts";
import {navCategories} from "@constants/navCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import checkCircle from "@assets/icons/check_circle.svg";
import cancelCircle from "@assets/icons/cancel_circle.svg";


const TestEndPage = () => {
    const [testResult, setTestResult] = useState<ITestResult>();

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

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

    return (
        <>
            <HeadTag title={navCategories.test[lang]}/>

            <Header>
                <Flex align={"center"} justify={"center"} style={{width: "100%"}}>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.testDone[lang]}</h2>
                    </Header.Center>
                </Flex>
            </Header>

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
                                <Icon svg={testResult?.isPassed ? checkCircle : cancelCircle}/>
                            </ResultSignWrapper>
                        </div>
                    </ResultCard>

                    <QuestionsWrapper>
                        <label>{cardCategories.grading[lang]}</label>
                        <ul>
                            {testResult?.questions.map((q, index) => (
                                <GradingAnswerListItem
                                    key={index}
                                    index={index}
                                    question={q.question}
                                    questionType={q.questionType}
                                    answer={q.answer}
                                    options={q.options}
                                    myAnswer={q.myAnswer}
                                    isCorrect={q.isCorrect}
                                    explanation={q.explanation}
                                />
                            ))}
                        </ul>
                    </QuestionsWrapper>
                </ResultWrapper>
            }
        </>
    );
};

export default TestEndPage;