import {ChangeEvent, FC, useState} from "react";
import {ReactSVG} from "react-svg";
import { v4 as uuidv4 } from "uuid";
import {Draggable} from "@hello-pangea/dnd";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import OptionListContent from "@components/management/OptionListContent";

import {IQuestionListItemProps} from "@/types/componentProps.ts";
import {EducationType, IMultipleChoice, IShortAnswer, ISingleChoice} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {filterCategories} from "@constants/filterCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {
    Container,
    DragIndicator, ExplanationWrapper,
    IndexWrapper,
    OptionsWrapper, QuestionTypeWrapper,
    RemoveWrapper,
    TextAnswerWrapper
} from "./style.ts";

import close from "@assets/icons/close.svg";
import drag from "@assets/icons/drag_line.svg";
import add from "@assets/icons/add.svg";


const QuestionListItem:FC<IQuestionListItemProps> = ({index, removeQuestion, question, setQuestions}) => {
    const [questionType, setQuestionType] = useState<"shortAnswer" | "singleChoice" | "multipleChoice">(question.questionType || "shortAnswer");
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const {lang} = useThemeStore();

    // 문제 유형 변경
    const changeQuestionTypeHandler = (typeValue: "shortAnswer" | "singleChoice" | "multipleChoice") => {
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                let updatedQuestion: EducationType;

                if (typeValue === "shortAnswer") {
                    updatedQuestion = {
                        ...questions[targetIndex],
                        questionType: typeValue,
                        answer: "",
                    } as IShortAnswer;
                } else if (typeValue === "singleChoice") {
                    updatedQuestion = {
                        ...questions[targetIndex],
                        questionType: typeValue,
                        options: [{
                            optionId: uuidv4(),
                            content: "",
                            isAnswer: false,
                        }],
                    } as ISingleChoice;
                } else {
                    updatedQuestion = {
                        ...questions[targetIndex],
                        questionType: typeValue,
                        options: [{
                            optionId: uuidv4(),
                            content: "",
                            isAnswer: false,
                        }],
                    } as IMultipleChoice;
                }

                questions[targetIndex] = updatedQuestion;
            }
            return questions;
        });
    };

    // 질문 입력
    const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                questions[targetIndex] = { ...questions[targetIndex], question: value };
            }
            return questions;
        });
    };

    // 질문 부가설명 켜기
    const openExplanationHandler = () => {
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                questions[targetIndex] = { ...questions[targetIndex], explanation: "" }; // 부가설명 빈칸으로 설정
            }
            return questions;
        });
        setShowExplanation(true);
    };

    // 질문 부가설명 끄기
    const closeExplanationHandler = () => {
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                questions[targetIndex] = { ...questions[targetIndex], explanation: "" }; // 부가설명 빈칸으로 설정
            }
            return questions;
        });
        setShowExplanation(false);
    };

    // 질문 부가설명
    const changeExplanationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                questions[targetIndex] = { ...questions[targetIndex], explanation: value };
            }
            return questions;
        });
    };

    // 옵션 추가하기
    const addOption = () => {
        if ((question as ISingleChoice | IMultipleChoice).options.length >= 5) return;
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                const currentQuestion = questions[targetIndex];

                const newOption = {
                    optionId: uuidv4(),
                    content: "",
                    isAnswer: false,
                };

                if (currentQuestion.questionType === "singleChoice" || currentQuestion.questionType === "multipleChoice") {
                    questions[targetIndex] = {
                        ...currentQuestion,
                        options: [...currentQuestion.options, newOption],
                    };
                }
            }
            return questions;
        });
    };

    // 옵션 목록 드래그
    const onDragEnd = (result: any) => {
        const {destination, source} = result;

        if (!destination) return;
        if (destination.index === source.index) return;

        const updatedOptions = Array.from((question as ISingleChoice | IMultipleChoice).options);
        const [movedItem] = updatedOptions.splice(source.index, 1);
        updatedOptions.splice(destination.index, 0, movedItem);
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex(q => q._id === question._id);
            if (targetIndex !== -1) {
                const currentQuestion = questions[targetIndex] as ISingleChoice | IMultipleChoice;

                questions[targetIndex] = {...currentQuestion, options: updatedOptions};
            }
            return questions;
        });
    };

    // 옵션 제거하기
    const removeOption = (targetOptionId: string) => {
        if ((question as ISingleChoice | IMultipleChoice).options.length <= 1) return;
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                const currentQuestion = questions[targetIndex] as ISingleChoice | IMultipleChoice;

                const updatedOptions = currentQuestion.options.filter(opt => opt.optionId !== targetOptionId);

                questions[targetIndex] = { ...currentQuestion, options: updatedOptions };
            }
            return questions;
        });
    };

    // 옵션 내용 작성하기
    const changeOptionContentHandler = (targetOptionId: string, content: string) => {
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                const currentQuestion = questions[targetIndex] as ISingleChoice | IMultipleChoice;

                const updatedOptions = currentQuestion.options.map(opt =>
                    opt.optionId === targetOptionId ? {...opt, content} : opt
                );

                questions[targetIndex] = { ...currentQuestion, options: updatedOptions };
            }
            return questions;
        });
    };

    // 단답형 답 입력
    const changeShortAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestions((prevState) => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);
            if (targetIndex !== -1) {
                if (questionType === "shortAnswer") {
                    questions[targetIndex] = { ...questions[targetIndex], answer: value } as IShortAnswer;
                }
            }
            return questions;
        });
    };

    // 단일 선택형 답 지정
    const changeSingleChoiceAnswerHandler = (targetOptionId: string) => {
        setQuestions(prevState => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);

            if (targetIndex !== -1) {
                if (questionType === "singleChoice") {
                    let currentQuestion = questions[targetIndex] as ISingleChoice;

                    const updatedOptions = currentQuestion.options.map((opt) => ({
                        ...opt,
                        isAnswer: opt.optionId === targetOptionId,
                    }));

                    questions[targetIndex] = { ...currentQuestion, options: updatedOptions };
                }
            }
            return questions;
        });
    };

    // 다중 선택형 답 지정
    const changeMultipleChoiceAnswersHandler = (targetOptionId: string) => {
        setQuestions((prevState) => {
            const questions = [...prevState];
            const targetIndex = questions.findIndex((q) => q._id === question._id);

            if (targetIndex !== -1) {
                const currentQuestion = questions[targetIndex] as IMultipleChoice;

                const updatedOptions = currentQuestion.options.map((opt) =>
                    opt.optionId === targetOptionId ? { ...opt, isAnswer: !opt.isAnswer } : opt
                );

                questions[targetIndex] = { ...currentQuestion, options: updatedOptions };
            }
            return questions;
        });
    };


    return (
        <Draggable draggableId={question._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{...provided.draggableProps.style}}
                >
                    <Container isDragging={snapshot.isDragging}>
                        <div>
                            <DragIndicator {...provided.dragHandleProps}>
                                <ReactSVG src={drag}/>
                            </DragIndicator>
                            <IndexWrapper>{index + 1}</IndexWrapper>
                            <RemoveWrapper onClick={() => removeQuestion(question._id)}>
                                <ReactSVG src={close}/>
                            </RemoveWrapper>
                        </div>

                        {/*질문 입력 부분, 문제유형*/}
                        <div>
                            <Input
                                label={placeholderCategories.question[lang]}
                                placeholder={placeholderCategories.question[lang]}
                                type={"text"}
                                id={"question"}
                                name={"question"}
                                value={question.question || ""}
                                onChange={changeQuestionHandler}
                            />
                            <QuestionTypeWrapper>
                                <label>{inputCategories.questionType[lang]}</label>
                                <select
                                    defaultValue={questionType}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                        setQuestionType(e.target.value as "shortAnswer" | "singleChoice" | "multipleChoice");
                                        changeQuestionTypeHandler(e.target.value as "shortAnswer" | "singleChoice" | "multipleChoice");
                                    }}
                                >
                                    <option value={"shortAnswer"}>{filterCategories.short[lang]}</option>
                                    <option value={"singleChoice"}>{filterCategories.single[lang]}</option>
                                    <option value={"multipleChoice"}>{filterCategories.multiple[lang]}</option>
                                </select>
                            </QuestionTypeWrapper>
                        </div>

                        {/*질문 부가설명 입력 부분*/}
                        {question.explanation || showExplanation ?
                            <ExplanationWrapper>
                                <Input
                                    label={placeholderCategories.explanation[lang]}
                                    placeholder={placeholderCategories.explanation[lang]}
                                    type={"text"}
                                    id={"description"}
                                    name={"description"}
                                    value={question.explanation || ""}
                                    onChange={changeExplanationHandler}
                                />
                                <Button
                                    type={"button"}
                                    content={<ReactSVG src={close}/>}
                                    width={"fit"}
                                    color={"third"}
                                    scale={"small"}
                                    onClick={closeExplanationHandler}
                                />
                            </ExplanationWrapper>
                            :
                            <Button
                                type={"button"}
                                content={buttonCategories.addExplanation[lang]}
                                width={"full"}
                                color={"third"}
                                scale={"small"}
                                onClick={openExplanationHandler}
                            />
                        }

                        {/*옵션 및 답 지정 부분*/}
                        {questionType === "shortAnswer" ?
                            <TextAnswerWrapper>
                                <Input
                                    label={inputCategories.answer[lang]}
                                    placeholder={placeholderCategories.answer[lang]}
                                    type={"text"}
                                    id={"shortAnswer"}
                                    name={"shortAnswer"}
                                    value={(question as IShortAnswer).answer || ""}
                                    onChange={changeShortAnswerHandler}
                                />
                            </TextAnswerWrapper>
                            :
                            questionType === "singleChoice" ?
                                <OptionsWrapper>
                                    <div>
                                        <label>{`${inputCategories.option[lang]} (${(question as ISingleChoice).options.length})`}</label>
                                        <Button
                                            type={"button"}
                                            content={<ReactSVG src={add}/>}
                                            width={"fit"}
                                            color={"third"}
                                            scale={"small"}
                                            onClick={addOption}
                                        />
                                    </div>
                                    <OptionListContent
                                        onDragEnd={onDragEnd}
                                        question={question}
                                        questionType={"singleChoice"}
                                        changeOptionContentHandler={changeOptionContentHandler}
                                        changeChoiceAnswerHandler={changeSingleChoiceAnswerHandler}
                                        removeOption={removeOption}
                                    />
                                </OptionsWrapper>
                                :
                                questionType === "multipleChoice" ?
                                    <OptionsWrapper>
                                        <div>
                                            <label>{`${inputCategories.option[lang]} (${(question as IMultipleChoice).options.length})`}</label>
                                            <Button
                                                type={"button"}
                                                content={<ReactSVG src={add}/>}
                                                width={"fit"}
                                                color={"third"}
                                                scale={"small"}
                                                onClick={addOption}
                                            />
                                        </div>
                                        <OptionListContent
                                            onDragEnd={onDragEnd}
                                            question={question}
                                            questionType={"multipleChoice"}
                                            changeOptionContentHandler={changeOptionContentHandler}
                                            changeChoiceAnswerHandler={changeMultipleChoiceAnswersHandler}
                                            removeOption={removeOption}
                                        />
                                    </OptionsWrapper>
                                    :
                                    <></>
                        }
                    </Container>
                </div>
            )}
        </Draggable>
    );
};

export default QuestionListItem;