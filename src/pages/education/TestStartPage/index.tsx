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

import useRequest from "@hooks/useRequest.ts";
import useScrollbarWidth from "@hooks/useScrollbarWidth.ts";
import {EducationType} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {navCategories} from "@constants/navCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {BtnsWrapper, Container, MenuButtonWrapper, MenusWrapper, QuestionsWrapper, QuestionWrapper} from "./style.ts";

import menu from "@assets/icons/menu.svg";


const TestStartPage:FC = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const scrollbarWidth = useScrollbarWidth();

    // 문제 가져오기
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education/questions",
            });
            if (response.data) {
                setQuestions(response.data);
            }
        } catch (err) {
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

    // 문제 제출하기
    const submitTest = useCallback(async () => {
        try {

        } catch (err) {
            console.error("문제 제출 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 제출 확인 모달 내용
    const SubmitConfirmContent = () => (
        <ModalConfirmContent
            text={"제출 하시겠습니까?"}
            description={"제출 이후, 수정이 불가하며 미이수 경우, 모형 제작실 이용이 제한됩니다"}
            leftBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.close[lang]}
                    color={"third"}
                    scale={"normal"}
                    width={"full"}
                    onClick={() => setShowConfirmModal(false)}
                />
            }
            rightBtn={
                <Button
                    type={"button"}
                    content={"제출"}
                    color={"approval"}
                    scale={"normal"}
                    width={"full"}
                    onClick={submitTest}
                />
            }
        />
    );


    return (
        <>
            <Container>
                <HeadTag title={navCategories.test[lang]}/>

                <Header
                    leftChild={<ArrowBack/>}
                    centerText={headerCategories.test[lang]}
                    rightChild={
                        <MenuButtonWrapper onClick={() => setShowSideMenu(true)}>
                            <ReactSVG src={menu}/>
                        </MenuButtonWrapper>
                    }
                />

                <MenusWrapper>
                    <div>
                        <span>{`${currentQuestion + 1} / ${questions.length}`}</span>
                        <Button
                            type={"button"}
                            content={"제출하기"}
                            width={"fit"}
                            color={"primary"}
                            scale={"small"}
                            onClick={() => setShowConfirmModal(true)}
                        />
                    </div>
                    <ProgressBar total={questions.length} current={currentQuestion + 1}/>
                </MenusWrapper>

                <div>
                    {isLoading ?
                        <LoadingLoop/>
                        :
                        <>
                        <QuestionsWrapper
                                currentQuestion={currentQuestion}
                                scrollbarWidth={scrollbarWidth}
                            >
                                <div>
                                    {questions.map((q, index) => (
                                        <QuestionWrapper key={index} scrollbarWidth={scrollbarWidth}>
                                            <p>{q.questionType}</p>
                                            <p>{q.question}</p>
                                            <p>{q.explanation}</p>
                                            <p>{q._id}</p>
                                        </QuestionWrapper>
                                    ))}
                                </div>
                            </QuestionsWrapper>

                            <BtnsWrapper>
                                <Button
                                    type={"button"}
                                    content={"이전"}
                                    width={"full"}
                                    color={"second"}
                                    scale={"normal"}
                                    disabled={currentQuestion === 0}
                                    onClick={movePrevQuestion}
                                />
                                <Button
                                    type={"button"}
                                    content={"다음"}
                                    width={"full"}
                                    color={"second"}
                                    scale={"normal"}
                                    disabled={currentQuestion === questions.length - 1}
                                    onClick={moveNextQuestion}
                                />
                            </BtnsWrapper>
                        </>
                    }
                </div>
            </Container>

            {showSideMenu &&
              <SideMenu
                content={<></>}
                direction={"right"}
                setSideMenu={setShowSideMenu}
              />
            }

            {showConfirmModal &&
              <Modal
                content={<SubmitConfirmContent/>}
                setModal={setShowConfirmModal}
                type={"popup"}
              />
            }
        </>
    );
};

export default TestStartPage;