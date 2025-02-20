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
import EducationListItem from "@components/education/EducationListItem";
import Empty from "@components/common/Empty";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import Card from "@components/common/Card";
import SubmitEducation from "@components/education/SubmitEducation";
import ResetEducation from "@components/education/ResetEducation";
import EducationSideMenuContent from "@components/education/EducationSideMenuContent";
import useRequest from "@hooks/useRequest.ts";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import QuestionSchemaProvider from "@schemata/QuestionSchemaProvider.ts";
import {EducationType, IEducationAnswer} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationContext from "@context/EducationContext.ts";
import {
    MenusWrapper,
    QuestionsWrapper,
} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import menu from "@assets/icons/menu.svg";


const EducationStartPage = () => {
    const questionReducer = (state: number, action: any) => {
        switch (action.type) {
            case "NEXT":
                return Math.min(state + 1, questions.length - 1);
            case "PREV":
                return Math.max(state - 1, 0);
            case "MOVE":
                return action.questionNumber;
            default:
                return state;
        }
    };

    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, dispatch] = useReducer(questionReducer, 0);
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {scrollbarWidth} = useScrollbarSize();
    const {questionSchema} = QuestionSchemaProvider(questions);

    type TestFormDataType = z.infer<typeof questionSchema>;

    // 기존에 작성한 답안을 세션 스토리지에서 로드하기
    const loadAnswersFromStorage = (): IEducationAnswer[] => {
        const savedAnswers = sessionStorage.getItem("educationAnswers");
        return savedAnswers ? JSON.parse(savedAnswers) : [];
    };

    const {
        control,
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        reset,
    } = useForm<TestFormDataType>({
        resolver: zodResolver(questionSchema),
        defaultValues: {},
        mode: "onChange",
    });

    // questions 목록이 fetch 되면 세션 스토리지에서 가져온 답안으로 폼 reset 하기
    useEffect(() => {
        if (questions.length > 0) {
            const savedAnswers = loadAnswersFromStorage();
            const initialValues = questions.reduce((acc, question) => {
                const existingAnswer = savedAnswers.find(answer => answer.questionId === question._id);
                const initialAnswer = existingAnswer
                    ? existingAnswer.myAnswer
                    : question.questionType === "shortAnswer" || question.questionType === "singleChoice"
                        ? ""
                        : [];
                return { ...acc, [question._id]: initialAnswer };
            }, {});
            reset(initialValues);
        }
    }, [questions, reset]);

    // 초기화 버튼 클릭 시, 답안 비우기
    const resetEducation = () => {
        const emptyAnswers = questions.reduce((acc, question) => {
            const emptyAnswer = question.questionType === "shortAnswer" || "singleChoice" ? "" : [];
            return {...acc, [question._id]: emptyAnswer};
        }, {});
        reset(emptyAnswers);
    };

    // 폼에 답안이 채워지는지 추적
    const watchedAnswers = watch();

    // 작성한 답변 세션 스토리지에 저장하는 함수
    const saveAnswersToStorage = (answers: IEducationAnswer[]) => {
        sessionStorage.setItem("educationAnswers", JSON.stringify(answers));
        console.log(getValues())
    };

    // educationAnswers 변경될 때마다 스토리지에 저장
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
    const moveTargetQuestion = (currentQuestion: number) => {
        dispatch({type: "MOVE", questionNumber: currentQuestion});
        setShowSideMenu(false);
    };

    return (
        <EducationContext.Provider value={{
            register,
            handleSubmit,
            setValue,
            getValues,
            watch,
            reset: resetEducation,
            control,
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
                                        <ResetEducation/>
                                        <SubmitEducation/>
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
                                            <EducationListItem key={index} question={question}/>
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
                content={
                  <EducationSideMenuContent
                      questions={questions}
                      moveQuestionHandler={moveTargetQuestion}
                  />
              }
                direction={"right"}
                setSideMenu={setShowSideMenu}
              />
            }
        </EducationContext.Provider>
    );
};

export default EducationStartPage;