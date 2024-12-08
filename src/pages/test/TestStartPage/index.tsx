import {useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Button from "@components/common/Button";
import SideMenu from "@components/common/SideMenu";
import ProgressBar from "@components/common/ProgressBar";
import TestListItem from "@components/test/TestListItem";
import Empty from "@components/common/Empty";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import SubmitTest from "@components/test/SubmitTest";
import ResetTest from "@components/test/ResetTest";
import useRequest from "@hooks/useRequest.ts";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import {EducationType, IMultipleChoice, ISingleChoice, ITestAnswer} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import TestContext from "@context/TestContext.ts";
import {
    AnswerWrapper,
    MenusWrapper,
    QuestionsWrapper, SideMenuAnswerWrapper,
    SideMenuBtnWrapper, SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper
} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import menu from "@assets/icons/menu.svg";


const TestStartPage = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [testAnswers, setTestAnswers] = useState<ITestAnswer[]>([]);
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {scrollbarWidth} = useScrollbarSize();

    // 기존 답변 스토리지에서 로드하기
    const loadAnswersFromStorage = (): ITestAnswer[] => {
        const savedAnswers = sessionStorage.getItem("testAnswers");
        return savedAnswers ? JSON.parse(savedAnswers) : [];
    };

    // 답변 스토리지에 저장
    const saveAnswersToStorage = (answers: ITestAnswer[]) => {
        sessionStorage.setItem("testAnswers", JSON.stringify(answers));
    };

    // 마운트 시, 기존 답변 스토리지에서 로드하기
    useEffect(() => {
        setTestAnswers(loadAnswersFromStorage());
    }, []);

    // testAnswers 변경될 때마다 스토리지에 저장
    useEffect(() => {
        saveAnswersToStorage(testAnswers);
    }, [testAnswers]);

    // 문제 가져오기
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({ url: "/education/questions" });
            if (response.data) {
                const newQuestions = response.data.questions;
                const loadedAnswers = loadAnswersFromStorage();
                const updatedAnswers = newQuestions.map((q: EducationType) => {
                    const existingAnswer = loadedAnswers.find((answer) => answer.questionId === q._id);
                    return existingAnswer ?
                        {...existingAnswer, questionId: q._id} :
                        { questionId: q._id, myAnswer: q.questionType === "shortAnswer" ? "" : [] };
                });
                setQuestions(newQuestions);
                setTestAnswers(updatedAnswers);
            }
        } catch (err) {
            const savedAnswers = localStorage.getItem("testAnswers");
            if (savedAnswers) {
                setTestAnswers(JSON.parse(savedAnswers));
            }
            console.error("문제 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // 다음 문제로 이동
    const moveNextQuestion = () => {
        if (currentQuestion === questions.length - 1) return;
        setCurrentQuestion(prevState => prevState + 1);
    };

    // 이전 문제로 이동
    const movePrevQuestion = () => {
        if (currentQuestion === 0) return;
        setCurrentQuestion(prevState => prevState - 1);
    };

    // 사이드 메뉴 문제 클릭
    const clickSideMenuQuestionHandler = (currentQuestion: number) => {
        setCurrentQuestion(currentQuestion);
        setShowSideMenu(false);
    };

    // 문제 답안 입력
    const inputAnswer = (e: any, question: EducationType) => {
        const value = e.target.value;
        const id = e.target.id;

        setTestAnswers((prevState) => {
            const answers = [...prevState];
            const targetIndex = answers.findIndex((answer) => answer.questionId === question._id);
            if (targetIndex !== -1) {
                if (question.questionType === "shortAnswer") {
                    (answers[targetIndex].myAnswer as string) = value;
                } else if (question.questionType === "singleChoice") {
                    (answers[targetIndex].myAnswer as string) = (id as string).split(" ")[1];
                } else if (question.questionType === "multipleChoice") {
                    const currentAnswers = answers[targetIndex].myAnswer as string[];
                    if (currentAnswers.includes(id)) {
                        answers[targetIndex].myAnswer = currentAnswers.filter((item) => item !== id);
                    } else {
                        answers[targetIndex].myAnswer = [...currentAnswers, id];
                    }
                }
            }
            return answers;
        });
    };

    // 선택형 문제 체크 확인
    const isChecked = (optionId: string, question:EducationType) => {
        const targetIndex = testAnswers.findIndex((answer) => answer.questionId === question._id);
        if (targetIndex === -1) return false;
        if (question.questionType === "singleChoice") {
            return testAnswers[targetIndex].myAnswer === optionId;
        } else if (question.questionType === "multipleChoice") {
            return (testAnswers[targetIndex].myAnswer as string[]).includes(optionId);
        }
        return false;
    };

    // 답안이 있는지 확인
    const isAnswerFilled = (question: EducationType) => {
        const targetIndex = testAnswers.findIndex((answer) => answer.questionId === question._id);
        if (targetIndex === -1) return false;
        if (question.questionType === "shortAnswer") {
            return (testAnswers[targetIndex].myAnswer as string).trim() !== "";
        } else if (question.questionType === "singleChoice" || question.questionType === "multipleChoice") {
            const selectedAnswers = testAnswers[targetIndex].myAnswer as string[];
            return selectedAnswers.length > 0;
        }
        return false;
    };

    // 사이드 메뉴 문제 답안 내용
    const TestAnswersContent = () => (
        <SideMenuQuestionsWrapper>
            {questions.length > 0 && testAnswers.map((answer, index) => {
                const targetQuestion = questions.find((q) => q._id === answer.questionId);

                return (
                    <SideMenuQuestionWrapper
                        key={index}
                        onClick={() => clickSideMenuQuestionHandler(index)}
                        filled={
                            ((Array.isArray(answer.myAnswer) && answer.myAnswer.length > 0) ||
                                (typeof answer.myAnswer === "string" && answer.myAnswer.trim() !== ""))
                                ? "true"
                                : "false"
                        }
                    >
                        <label>{index + 1}</label>
                        <SideMenuAnswerWrapper>
                            {targetQuestion && targetQuestion.questionType === "shortAnswer" && answer.myAnswer ? (
                                <p>{answer.myAnswer.toString() as string}</p>
                            ) : targetQuestion && targetQuestion.questionType === "singleChoice" ? (
                                <AnswerWrapper>
                                    {(questions
                                        .filter((q) => q._id === answer.questionId)[0] as ISingleChoice).options
                                        .map((opt, index) => (
                                            <input
                                                key={index}
                                                type={"radio"}
                                                name={`sideMenu ${targetQuestion._id}`}
                                                id={`sideMenu ${opt.optionId}`}
                                                checked={isChecked(opt.optionId, targetQuestion)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    inputAnswer(e, targetQuestion);
                                                }}
                                                readOnly
                                            />
                                        ))}
                                </AnswerWrapper>
                            ) : targetQuestion && targetQuestion.questionType === "multipleChoice" ? (
                                <AnswerWrapper>
                                    {(questions
                                        .filter((q) => q._id === answer.questionId)[0] as IMultipleChoice).options
                                        .map((opt, index) => (
                                            <input
                                                key={index}
                                                type={"checkbox"}
                                                name={opt.optionId}
                                                id={opt.optionId}
                                                checked={isChecked(opt.optionId, targetQuestion)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    inputAnswer(e, targetQuestion);
                                                }}
                                                readOnly
                                            />
                                        ))}
                                </AnswerWrapper>
                            ) : null}
                        </SideMenuAnswerWrapper>
                    </SideMenuQuestionWrapper>
                );
            })}
        </SideMenuQuestionsWrapper>
    );


    return (
        <TestContext.Provider value={{
            testAnswers,
            setTestAnswers,
        }}>
            <HeadTag title={navCategories.test[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.test[lang]}</h2>
                    </Header.Center>
                    <Header.Right>
                        <SideMenuBtnWrapper onClick={() => setShowSideMenu(true)}>
                            <ReactSVG src={menu}/>
                        </SideMenuBtnWrapper>
                    </Header.Right>
                </Grid>
            </Header>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {questions.length > 0 ?
                        <>
                            <MenusWrapper>
                                <div>
                                    <span>{`${currentQuestion + 1} / ${questions.length}`}</span>
                                    <div>
                                        <ResetTest/>
                                        <SubmitTest/>
                                    </div>
                                </div>
                                <ProgressBar total={questions.length} current={currentQuestion + 1}/>
                            </MenusWrapper>

                            <QuestionsWrapper
                                currentQuestion={currentQuestion}
                                scrollbarWidth={scrollbarWidth}
                            >
                                <div>
                                    <div>
                                        {questions.map((q, index) => (
                                            <TestListItem
                                                key={index}
                                                question={q}
                                                testAnswers={testAnswers}
                                                setTestAnswers={setTestAnswers}
                                                isAnswerFilled={isAnswerFilled(q)}
                                                inputAnswer={inputAnswer}
                                                isChecked={isChecked}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </QuestionsWrapper>

                            <Flex align={"center"} gap={12} style={{margin: "0 24px"}}>
                                <Button
                                    type={"button"}
                                    variant={"filled"}
                                    width={"full"}
                                    color={"second"}
                                    size={"md"}
                                    onClick={movePrevQuestion}
                                    disabled={currentQuestion === 0}
                                >
                                    {buttonCategories.previous[lang]}
                                </Button>
                                <Button
                                    type={"button"}
                                    variant={"filled"}
                                    width={"full"}
                                    color={"second"}
                                    size={"md"}
                                    onClick={moveNextQuestion}
                                    disabled={currentQuestion === questions.length - 1}
                                >
                                    {buttonCategories.next[lang]}
                                </Button>
                            </Flex>
                        </>
                        :
                        <Empty title={messageCategories.emptyQuestion[lang]}/>
                    }
                </>
            }

            {showSideMenu &&
              <SideMenu
                content={<TestAnswersContent/>}
                direction={"right"}
                setSideMenu={setShowSideMenu}
              />
            }
        </TestContext.Provider>
    );
};

export default TestStartPage;