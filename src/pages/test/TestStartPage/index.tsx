import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Button from "@components/common/Button";
import SideMenu from "@components/common/SideMenu";
import ProgressBar from "@components/common/ProgressBar";
import TestListItem from "@components/test/TestListItem";
import Empty from "@components/common/Empty";
import Input from "@components/common/Input";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";

import useRequest from "@hooks/useRequest.ts";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import useModal from "@hooks/useModal.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {EducationType, IMultipleChoice, ISingleChoice, ITestAnswer} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {
    AnswerWrapper,
    BtnsWrapper,
    Container,
    MenusWrapper,
    QuestionsWrapper, SideMenuAnswerWrapper,
    SideMenuBtnWrapper, SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper, YearAndStudioWrapper
} from "./style.ts";
import {confirmModalHeader, confirmModalSubMessage} from "@components/common/ConfirmModal/style.ts";

import menu from "@assets/icons/menu.svg";


const TestStartPage:FC = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [testAnswers, setTestAnswers] = useState<ITestAnswer[]>([]);
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {scrollbarWidth} = useScrollbarSize();
    const {updateYearAndStudioSchema} = UserSchemaProvider();
    const {
        showModal: showSubmitConfirmModal,
        setShowModal: setShowSubmitConfirmModal,
        modalRef: submitModalRef,
        backdropRef: submitBackdropRef,
    } = useModal();
    const {
        showModal: showResetConfirmModal,
        setShowModal: setShowResetConfirmModal,
        modalRef: resetModalRef,
        backdropRef: resetBackdropRef,
    } = useModal();

    // 학년 카테고리
    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    type UpdateYearAndStudioForm = z.infer<typeof updateYearAndStudioSchema>;

    const {register, handleSubmit, formState:{errors}, getValues, reset} = useForm<UpdateYearAndStudioForm>({
        resolver: zodResolver(updateYearAndStudioSchema),
        defaultValues: {
            year: "1",
            studio: "",
        },
    });

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

    // testAnswers가 변경될 때마다 스토리지에 저장
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

    // 작성된 답안 모두 지우기
    const eraseAnswers = () => {
        setTestAnswers(prevState => {
            return prevState.map(answer => ({
                ...answer,
                myAnswer: Array.isArray(answer.myAnswer) ? [] : "",
            }));
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

    // 문제 제출하기
    const submitTest:SubmitHandler<UpdateYearAndStudioForm> = async () => {
        try {
            const response = await sendRequest({
                url: "/education/check",
                method: "post",
                data: {
                    testAnswers: testAnswers,
                    year: getValues("year"),
                    studio: getValues("studio"),
                },
            });
            if (response.data) {
                sessionStorage.removeItem("testAnswers");
                navigate("/test/end", {replace: true});
            }
        } catch (err) {
            console.error("문제 제출 중 에러 발생: ", err);
        } finally {
            setShowSubmitConfirmModal(false);
        }
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

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
        <>
            <Container>
            <HeadTag title={navCategories.test[lang]}/>

                <Header
                    leftChild={<ArrowBack/>}
                    centerText={headerCategories.test[lang]}
                    rightChild={
                        <SideMenuBtnWrapper onClick={() => setShowSideMenu(true)}>
                            <ReactSVG src={menu}/>
                        </SideMenuBtnWrapper>
                    }
                />

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
                                            <Button
                                                variant={"filled"}
                                                width={"fit"}
                                                color={"second"}
                                                size={"sm"}
                                                onClick={() => setShowResetConfirmModal(true)}
                                            >
                                                {buttonCategories.reset[lang]}
                                            </Button>
                                            <Button
                                                variant={"filled"}
                                                width={"fit"}
                                                color={"primary"}
                                                size={"sm"}
                                                onClick={() => setShowSubmitConfirmModal(true)}
                                            >
                                                {buttonCategories.submit[lang]}
                                            </Button>
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

                                <BtnsWrapper>
                                    <Button
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
                                        variant={"filled"}
                                        width={"full"}
                                        color={"second"}
                                        size={"md"}
                                        onClick={moveNextQuestion}
                                        disabled={currentQuestion === questions.length - 1}
                                    >
                                        {buttonCategories.next[lang]}
                                    </Button>
                                </BtnsWrapper>
                            </>
                            :
                            <Empty title={messageCategories.emptyQuestion[lang]}/>
                        }
                    </>
                }
            </Container>

            {showSideMenu &&
              <SideMenu
                content={<TestAnswersContent/>}
                direction={"right"}
                setSideMenu={setShowSideMenu}
              />
            }

            {showSubmitConfirmModal &&
              <ConfirmModal
                modalRef={submitModalRef}
                backdropRef={submitBackdropRef}
                header={<h4 css={confirmModalHeader}>{cardCategories.submit[lang]}</h4>}
                subMessage={<p css={confirmModalSubMessage}>{messageCategories.warningSubmit[lang]}</p>}
                leftBtn={
                    <Button
                        variant={"filled"}
                        color={"third"}
                        size={"md"}
                        width={"full"}
                        onClick={() => {
                            reset({
                                year: "1",
                                studio: "",
                            });
                            setShowSubmitConfirmModal(false);
                        }}
                    >
                        {buttonCategories.cancel[lang]}
                    </Button>
                }
                rightBtn={
                    <Button
                        variant={"filled"}
                        size={"md"}
                        color={"approval"}
                        width={"full"}
                        onClick={handleSubmit(submitTest)}
                    >
                        {buttonCategories.submit[lang]}
                    </Button>
                }
              >
                <YearAndStudioWrapper>
                  <Select
                    categories={yearCategories}
                    label={inputCategories.year[lang]}
                    name={"year"}
                    register={register}
                    errorMessage={errors.year?.message}
                    type={"radio"}
                  />
                  <Input
                    label={inputCategories.studio[lang]}
                    subLabel={inputCategories.inputKorean[lang]}
                    type={"text"}
                    id={"studio"}
                    name={"studio"}
                    placeholder={placeholderCategories.studio[lang]}
                    register={register}
                    errorMessage={errors.studio?.message}
                  />
                </YearAndStudioWrapper>
              </ConfirmModal>
            }

            {showResetConfirmModal &&
              <ConfirmModal
                modalRef={resetModalRef}
                backdropRef={resetBackdropRef}
                header={<h4 css={confirmModalHeader}>{cardCategories.eraseAnswers[lang]}</h4>}
                subMessage={<p css={confirmModalSubMessage}>{messageCategories.warningEraseAnswers[lang]}</p>}
                leftBtn={
                    <Button
                        variant={"filled"}
                        width={"full"}
                        color={"third"}
                        size={"md"}
                        onClick={() => setShowResetConfirmModal(false)}
                    >
                        {buttonCategories.cancel[lang]}
                    </Button>
                }
                rightBtn={
                    <Button
                        variant={"filled"}
                        width={"full"}
                        color={"danger"}
                        size={"md"}
                        onClick={() => {
                            eraseAnswers();
                            setShowResetConfirmModal(false);
                        }}
                    >
                        {buttonCategories.reset[lang]}
                    </Button>
                }
              />
            }
        </>
    );
};

export default TestStartPage;