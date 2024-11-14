import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Button from "@components/common/Button";
import SideMenu from "@components/common/SideMenu";
import Modal from "@components/common/Modal";
import ModalConfirmContent from "@components/common/ModalConfirmContent";
import ProgressBar from "@components/common/ProgressBar";
import TestListItem from "@components/test/TestListItem";
import Empty from "@components/common/Empty";

import useRequest from "@hooks/useRequest.ts";
import useScrollbarWidth from "@hooks/useScrollbarWidth.ts";
import {EducationType, ITestAnswer} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    BtnsWrapper,
    Container,
    MenusWrapper,
    QuestionsWrapper,
    SideMenuBtnWrapper, SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper
} from "./style.ts";

import menu from "@assets/icons/menu.svg";


const TestStartPage:FC = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [testAnswers, setTestAnswers] = useState<ITestAnswer[]>([]);
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
    const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);
    const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const scrollbarWidth = useScrollbarWidth();

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

    // 문제 제출하기
    const submitTest = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education/check",
                method: "post",
                data: {testAnswers},
            });
            if (response.data) {
                sessionStorage.removeItem("testAnswers");
                navigate("/test/end");
            }
        } catch (err) {
            console.error("문제 제출 중 에러 발생: ", err);
        } finally {
            setShowSubmitConfirmModal(false);
        }
    }, [sendRequest, navigate]);

    // 작성된 답안 모두 지우기
    const eraseAnswers = () => {
        setTestAnswers(prevState => {
            return prevState.map(answer => ({
                ...answer,
                myAnswer: Array.isArray(answer.myAnswer) ? [] : "",
            }));
        });
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

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 지우기 확인 모달 내용
    const EraseConfirmContent = () => (
        <ModalConfirmContent
            text={cardCategories.eraseAnswers[lang]}
            description={messageCategories.warningEraseAnswers[lang]}
            leftBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.cancel[lang]}
                    color={"third"}
                    scale={"normal"}
                    width={"full"}
                    onClick={() => setShowResetConfirmModal(false)}
                />
            }
            rightBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.reset[lang]}
                    color={"danger"}
                    scale={"normal"}
                    width={"full"}
                    onClick={() => {
                        eraseAnswers();
                        setShowResetConfirmModal(false);
                    }}
                />
            }
        />
    );

    // 제출 확인 모달 내용
    const SubmitConfirmContent = () => (
        <ModalConfirmContent
            text={cardCategories.submit[lang]}
            description={messageCategories.warningSubmit[lang]}
            leftBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.cancel[lang]}
                    color={"third"}
                    scale={"normal"}
                    width={"full"}
                    onClick={() => setShowSubmitConfirmModal(false)}
                />
            }
            rightBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.submit[lang]}
                    color={"approval"}
                    scale={"normal"}
                    width={"full"}
                    onClick={submitTest}
                />
            }
        />
    );

    // 사이드 메뉴 문제 답안 내용
    const TestAnswersContent = () => (
        <SideMenuQuestionsWrapper>
            {questions.length > 0 && testAnswers.map((answer, index) => (
                <SideMenuQuestionWrapper
                    key={index}
                    onClick={() => clickSideMenuQuestionHandler(index)}
                >
                    <label>{index + 1}</label>
                    {Array.isArray(answer.myAnswer as string[]) ?
                        <></>
                        : typeof (answer.myAnswer as string) === "string" ?
                            <p>{answer.myAnswer}</p>
                            : null
                    }
                </SideMenuQuestionWrapper>
            ))}
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
                                                type={"button"}
                                                content={buttonCategories.reset[lang]}
                                                width={"fit"}
                                                color={"second"}
                                                scale={"small"}
                                                onClick={() => setShowResetConfirmModal(true)}
                                            />
                                            <Button
                                                type={"button"}
                                                content={buttonCategories.submit[lang]}
                                                width={"fit"}
                                                color={"primary"}
                                                scale={"small"}
                                                onClick={() => setShowSubmitConfirmModal(true)}
                                            />
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
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </QuestionsWrapper>

                                <BtnsWrapper>
                                    <Button
                                        type={"button"}
                                        content={buttonCategories.previous[lang]}
                                        width={"full"}
                                        color={"second"}
                                        scale={"normal"}
                                        disabled={currentQuestion === 0}
                                        onClick={movePrevQuestion}
                                    />
                                    <Button
                                        type={"button"}
                                        content={buttonCategories.next[lang]}
                                        width={"full"}
                                        color={"second"}
                                        scale={"normal"}
                                        disabled={currentQuestion === questions.length - 1}
                                        onClick={moveNextQuestion}
                                    />
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
              <Modal
                content={<SubmitConfirmContent/>}
                setModal={setShowSubmitConfirmModal}
                type={"popup"}
              />
            }

            {showResetConfirmModal &&
                <Modal
                  content={<EraseConfirmContent/>}
                  setModal={setShowResetConfirmModal}
                  type={"popup"}
                />
            }
        </>
    );
};

export default TestStartPage;