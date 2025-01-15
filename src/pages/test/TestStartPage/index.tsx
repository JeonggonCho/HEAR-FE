import {useCallback, useEffect, useReducer, useState} from "react";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
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
import Icon from "@components/common/Icon";
import Card from "@components/common/Card";
import SubmitTest from "@components/test/SubmitTest";
import ResetTest from "@components/test/ResetTest";
import useRequest from "@hooks/useRequest.ts";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import TestSchemaProvider from "@schemata/TestSchemaProvider.ts";
import {EducationType, ITestAnswer} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import TestContext from "@context/TestContext.ts";
import {
    AnswerWrapper,
    MenusWrapper,
    QuestionsWrapper, SideMenuAnswerWrapper,
    SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper
} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import menu from "@assets/icons/menu.svg";


const TestStartPage = () => {
    const questionReducer = (state: number, action: any) => {
        switch (action.type) {
            case "NEXT":
                return Math.min(state + 1, questions.length - 1);
            case "PREV":
                return Math.max(state - 1, 0);
            default:
                return state;
        }
    };

    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, dispatch] = useReducer(questionReducer, 0);
    // const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {scrollbarWidth} = useScrollbarSize();
    const {testSchema} = TestSchemaProvider(questions);

    type TestFormDataType = z.infer<typeof testSchema>;

    // 기존에 작성한 답안을 세션 스토리지에서 로드하기
    const loadAnswersFromStorage = (): ITestAnswer[] => {
        const savedAnswers = sessionStorage.getItem("testAnswers");
        return savedAnswers ? JSON.parse(savedAnswers) : [];
    };

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        reset,
    } = useForm<TestFormDataType>({
        resolver: zodResolver(testSchema),
        defaultValues: {},
        mode: "onChange",
    });

    // questions 목록이 fetch 되면 세션 스토리지에서 가져온 답안으로 폼 reset 하기
    useEffect(() => {
        if (questions.length > 0) {
            const savedAnswers = loadAnswersFromStorage();
            const initialValues = questions.reduce((acc, question) => {
                const existingAnswer = savedAnswers.find(answer => answer.questionId === question._id);
                const initialAnswer = existingAnswer ? existingAnswer.myAnswer
                    : question.questionType === ("shortAnswer" || "singleChoice") ? ""
                        : [];
                return { ...acc, [question._id]: initialAnswer };
            }, {});
            reset(initialValues);
        }
    }, [questions, reset]);

    // 초기화 버튼 클릭 시, 답안 비우기
    const resetTest = () => {
        const emptyAnswers = questions.reduce((acc, question) => {
            const emptyAnswer = question.questionType === "shortAnswer" || "singleChoice" ? "" : [];
            return {...acc, [question._id]: emptyAnswer};
        }, {});
        reset(emptyAnswers);
    };

    // 폼에 답안이 채워지는지 추적
    const watchedAnswers = watch();

    // 작성한 답변 세션 스토리지에 저장하는 함수
    const saveAnswersToStorage = (answers: ITestAnswer[]) => {
        sessionStorage.setItem("testAnswers", JSON.stringify(answers));
        console.log(getValues())
    };

    // testAnswers 변경될 때마다 스토리지에 저장
    useEffect(() => {
        if (Object.keys(watchedAnswers).length > 0) {
            const answersToSave = Object.entries(watchedAnswers).map(([questionId, myAnswer]) => ({
                questionId,
                myAnswer,
            }));
            saveAnswersToStorage(answersToSave);
        }
    }, [watchedAnswers]);

    // 문제 가져오기
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({ url: "/education/questions" });
            if (response.data) {
                const newQuestions = response.data.questions;
                setQuestions(newQuestions);
            }
        } catch (err) {
            console.error("문제 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // 다음/이전 문제 이동 함수
    const moveNextQuestion = useCallback(() => dispatch({ type: "NEXT" }), []);
    const movePrevQuestion = useCallback(() => dispatch({ type: "PREV" }), []);

    // 사이드 메뉴 문제 클릭해서 해당 번호의 문제로 이동하기
    // const clickSideMenuQuestionHandler = (currentQuestion: number) => {
    //     setCurrentQuestion(currentQuestion);
    //     setShowSideMenu(false);
    // };

    // 사이드 메뉴 문제 답안 내용
    // const TestAnswersContent = () => (
    //     <SideMenuQuestionsWrapper>
    //         {questions.length > 0 && testAnswers.map((answer, index) => {
    //             const targetQuestion = questions.find((q) => q._id === answer.questionId);
    //
    //             return (
    //                 <SideMenuQuestionWrapper
    //                     key={index}
    //                     onClick={() => clickSideMenuQuestionHandler(index)}
    //                     filled={
    //                         ((Array.isArray(answer.myAnswer) && answer.myAnswer.length > 0) ||
    //                             (typeof answer.myAnswer === "string" && answer.myAnswer.trim() !== ""))
    //                             ? "true"
    //                             : "false"
    //                     }
    //                 >
    //                     <label>{index + 1}</label>
    //                     <SideMenuAnswerWrapper>
    //                         {targetQuestion && targetQuestion.questionType === "shortAnswer" && answer.myAnswer ? (
    //                             <p>{answer.myAnswer.toString() as string}</p>
    //                         ) : targetQuestion && targetQuestion.questionType === "singleChoice" ? (
    //                             <AnswerWrapper>
    //                                 {(questions
    //                                     .filter((q) => q._id === answer.questionId)[0] as ISingleChoice).options
    //                                     .map((opt, index) => (
    //                                         <input
    //                                             key={index}
    //                                             type={"radio"}
    //                                             name={`sideMenu ${targetQuestion._id}`}
    //                                             id={`sideMenu ${opt.optionId}`}
    //                                             checked={isChecked(opt.optionId, targetQuestion)}
    //                                             onClick={(e) => {
    //                                                 e.stopPropagation();
    //                                                 inputAnswer(e, targetQuestion);
    //                                             }}
    //                                             readOnly
    //                                         />
    //                                     ))}
    //                             </AnswerWrapper>
    //                         ) : targetQuestion && targetQuestion.questionType === "multipleChoice" ? (
    //                             <AnswerWrapper>
    //                                 {(questions
    //                                     .filter((q) => q._id === answer.questionId)[0] as IMultipleChoice).options
    //                                     .map((opt, index) => (
    //                                         <input
    //                                             key={index}
    //                                             type={"checkbox"}
    //                                             name={opt.optionId}
    //                                             id={opt.optionId}
    //                                             checked={isChecked(opt.optionId, targetQuestion)}
    //                                             onClick={(e) => {
    //                                                 e.stopPropagation();
    //                                                 inputAnswer(e, targetQuestion);
    //                                             }}
    //                                             readOnly
    //                                         />
    //                                     ))}
    //                             </AnswerWrapper>
    //                         ) : null}
    //                     </SideMenuAnswerWrapper>
    //                 </SideMenuQuestionWrapper>
    //             );
    //         })}
    //     </SideMenuQuestionsWrapper>
    // );

    return (
        <TestContext.Provider value={{
            register,
            handleSubmit,
            setValue,
            getValues,
            reset: resetTest,
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
                        {/*<Button*/}
                        {/*    type={"button"}*/}
                        {/*    variant={"text"}*/}
                        {/*    width={"fit"}*/}
                        {/*    size={"sm"}*/}
                        {/*    color={"third"}*/}
                        {/*    style={{padding: 0}}*/}
                        {/*    onClick={() => setShowSideMenu(true)}*/}
                        {/*>*/}
                        {/*    <Icon svg={menu} isHovered={true}/>*/}
                        {/*</Button>*/}
                    </Header.Right>
                </Grid>
            </Header>

            {isLoading ?
                <Card padding={0} borderRadius={0} bgColor={"sub"}>
                    <Flex align={"center"} justify={"center"} style={{height: "80vh"}}>
                        <LoadingLoop/>
                    </Flex>
                </Card>
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
                                        {questions.map((question, index) => (
                                            <TestListItem key={index} question={question}/>
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

            {/*{showSideMenu &&*/}
            {/*  <SideMenu*/}
            {/*    content={<TestAnswersContent/>}*/}
            {/*    direction={"right"}*/}
            {/*    setSideMenu={setShowSideMenu}*/}
            {/*  />*/}
            {/*}*/}
        </TestContext.Provider>
    );
};

export default TestStartPage;