import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import { v4 as uuidv4 } from "uuid";

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
import {IEducation} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {MenusWrapper, QuestionsWrapper} from "./style.ts";

import add from "@assets/icons/add.svg";
import tune from "@assets/icons/tune.svg"


const EducationManagementPage:FC = () => {
    const [questions, setQuestions] = useState<IEducation[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 문제 조회
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education"
            });
            if (response.data) {
                console.log(response.data);
                setQuestions(response.data);
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
        const newQuestion: IEducation = {
            _id: uuidv4(),
            educationType: "shortAnswer",
            question: "",
            description: "",
            answer: [""],
        };
        setQuestions(prevState => [...prevState, newQuestion]);
    };

    // 문제 제거하기
    const removeQuestion = (targetIndex: string) => {
        const remainedQuestions = questions.filter((question) => question._id !== targetIndex);
        setQuestions(remainedQuestions);
    };

    // 문제 저장하기
    const saveQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education",
                method: "patch",
                data: questions,
            });
            if (response.data) {
                console.log(response.data);
            }
        } catch (err) {
            console.error("문제 저장 중 에러 발생: ", err);
        }
    }, [sendRequest]);

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

    // 문제 저장 확인 모달내용
    const SaveConfirmModalContent = () => (
        <ConfirmContent
            text={"교육 문제를 저장하시겠습니까?"}
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
                <Button
                    type={"button"}
                    content={buttonCategories.save[lang]}
                    width={"fit"}
                    color={"primary"}
                    scale={"small"}
                    onClick={showConfirmModalHandler}
                />
            </MenusWrapper>

            <QuestionsWrapper>
                {isLoading ?
                    <LoadingLoop/>
                    :
                    <>
                        {questions.length > 0 ?
                            <>
                                {questions.map((question, index) => (
                                    <QuestionListItem
                                        key={question._id}
                                        index={index}
                                        removeQuestion={removeQuestion}
                                        question={question}
                                    />
                                ))}
                            </>
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