import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import { v4 as uuidv4 } from "uuid";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import QuestionListItem from "@components/management/QuestionListItem";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Empty from "@components/common/Empty";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import {EducationType} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {MenusWrapper, QuestionsWrapper, ResetButtonWrapper} from "./style.ts";

import add from "@assets/icons/add.svg";
import tune from "@assets/icons/tune.svg"
import reset from "@assets/icons/reset.svg";


const EducationManagementPage:FC = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [initialQuestions, setInitialQuestions] = useState<EducationType[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<boolean>(false);

    const {lang, isDarkMode} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 문제 조회
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education"
            });
            if (response.data) {
                setQuestions(response.data.questions);
                setInitialQuestions(response.data.questions);
            }
        } catch (err) {
            console.error("문제 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // 문제 추가하기
    const addQuestion = () => {
        const newQuestion: EducationType = {
            _id: uuidv4(),
            questionType: "shortAnswer",
            question: "",
            explanation: "",
            answer: "",
        };
        setQuestions(prevState => [...prevState, newQuestion]);
    };

    // 문제 목록 드래그
    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        if (!destination) result; // 유효하지 않은 위치일 경우,
        if (destination.index === source.index) return; // 동일한 위치일 경우,

        // 위치 업데이트
        const updatedQuestions = Array.from(questions);
        const [movedItem] = updatedQuestions.splice(source.index, 1);
        updatedQuestions.splice(destination.index, 0, movedItem);
        setQuestions(updatedQuestions);
    };

    // 문제 제거하기
    const removeQuestion = (targetIndex: string) => {
        const remainedQuestions = questions.filter((question) => question._id !== targetIndex);
        setQuestions(remainedQuestions);
    };

    // 문제 원래대로 초기화하기
    const resetQuestions = () => {
        // TODO 문제 유형이 기존과 다를 경우, 제대로 초기화가 안 됨

        setQuestions(initialQuestions);
    };

    // 문제 저장하기
    const saveQuestions = useCallback(async () => {
        const data = {questions: questions};
        try {
            const response = await sendRequest({
                url: "/education",
                method: "patch",
                data: data,
            });
            if (response.data) {
                showToast(response.data.message, "success");
                setInitialQuestions(questions);
            }
        } catch (err) {
            console.error("문제 저장 중 에러 발생: ", err);
        } finally {
            setShowConfirmModal(false);
        }
    }, [sendRequest, questions]);

    // 메뉴 bottom sheet 열기
    const clickMenuHandler = () => {
        setShowFilter(true);
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 문제 저장 확인 모달 띄우기
    const showConfirmModalHandler = () => {
        setShowConfirmModal(true);
    };

    // 문제 목록 변경 여부 체크
    useEffect(() => {
        if (JSON.stringify(questions) !== JSON.stringify(initialQuestions)) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }
    }, [questions, initialQuestions]);

    // 문제 저장 확인 모달내용
    const SaveConfirmModalContent = () => (
        <ConfirmContent
            text={messageCategories.confirmSaveQuestions[lang]}
            description={messageCategories.warningSaveQuestions[lang]}
            leftBtn={<Button
                type={"button"}
                content={buttonCategories.close[lang]}
                width={"full"}
                scale={"normal"}
                color={"third"}
                onClick={() => setShowConfirmModal(false)}
            />}
            rightBtn={<Button
                type={"button"}
                content={buttonCategories.save[lang]}
                width={"full"}
                scale={"normal"}
                color={"primary"}
                onClick={saveQuestions}
            />}
        />
    );


    return (
        <>
            <HeadTag title={headerCategories.educationManagementHeader[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.educationManagementHeader[lang]}/>

            <MenusWrapper>
                <div onClick={clickMenuHandler}>
                    <ReactSVG src={tune}/>
                </div>
                <div>
                    <ResetButtonWrapper onClick={resetQuestions} modified={isModified.toString()} darkmode={isDarkMode.toString()}>
                        <span>초기화</span> <ReactSVG src={reset}/>
                    </ResetButtonWrapper>
                    <Button
                        type={"button"}
                        content={buttonCategories.save[lang]}
                        width={"fit"}
                        color={"primary"}
                        scale={"small"}
                        disabled={!isModified}
                        onClick={showConfirmModalHandler}
                    />
                </div>
            </MenusWrapper>

            <QuestionsWrapper>
                {isLoading ?
                    <LoadingLoop/>
                    :
                    <>
                        {questions.length > 0 ?
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="questions">
                                    <Droppable droppableId="questions">
                                    {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{display: "flex", flexDirection: "column", gap: "20px"}}
                                            >
                                                {questions.map((question, index) => (
                                                    <QuestionListItem
                                                        key={question._id}
                                                        index={index}
                                                        removeQuestion={removeQuestion}
                                                        question={question}
                                                        setQuestions={setQuestions}
                                                    />
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </DragDropContext>
                            :
                            <Empty title={messageCategories.emptyQuestion[lang]}/>
                        }
                        <Button
                            type={"button"}
                            content={<ReactSVG src={add}/>}
                            width={"full"}
                            scale={"big"}
                            color={"second"}
                            onClick={addQuestion}
                        />
                    </>
                }
            </QuestionsWrapper>

            {showFilter &&
                <Modal
                  content={<></>}
                  setModal={setShowFilter}
                  type={"bottomSheet"}
                />
            }

            {showConfirmModal &&
                <Modal
                  content={<SaveConfirmModalContent/>}
                  setModal={setShowConfirmModal}
                  type={"popup"}
                />
            }
        </>
    );
};

export default EducationManagementPage;