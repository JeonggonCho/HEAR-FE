import {FC} from "react";

import Input from "@components/common/Input";

import useScrollbarWidth from "@hooks/useScrollbarWidth.ts";
import {ITestListItemProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {ChoiceWrapper, Container, ResetButtonWrapper, ShortAnswerWrapper} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import Button from "@components/common/Button";


const TestListItem:FC<ITestListItemProps> = ({question, testAnswers, setTestAnswers, isAnswerFilled}) => {
    const {lang} = useThemeStore();
    const scrollbarWidth = useScrollbarWidth();

    // 문제 입력
    const inputAnswer = (e: any) => {
        const value = e.target.value;
        const id = e.target.id;

        setTestAnswers((prevState) => {
            const answers = [...prevState];
            const targetIndex = answers.findIndex((answer) => answer.questionId === question._id);
            if (targetIndex !== -1) {
                if (question.questionType === "shortAnswer") {
                    (answers[targetIndex].myAnswer as string) = value;
                } else if (question.questionType === "singleChoice") {
                    (answers[targetIndex].myAnswer as string) = id;
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

    // 문제 체크 확인
    const isChecked = (optionId: string) => {
        const targetIndex = testAnswers.findIndex((answer) => answer.questionId === question._id);
        if (targetIndex === -1) return false;
        if (question.questionType === "singleChoice") {
            return testAnswers[targetIndex].myAnswer === optionId;
        } else if (question.questionType === "multipleChoice") {
            return (testAnswers[targetIndex].myAnswer as string[]).includes(optionId);
        }
        return false;
    };

    // 단답형 답 채우기
    const initialShortAnswer = () => {
        const targetIndex = testAnswers.findIndex((answer) => answer.questionId === question._id);
        if (targetIndex === -1) return "";
        if (question.questionType === "shortAnswer") {
            return testAnswers[targetIndex].myAnswer;
        }
        return "";
    };

    // 답 지우기
    const eraseAnswer = () => {
        setTestAnswers(prevState => {
            const answers = [...prevState];
            const targetIndex = answers.findIndex(answer => answer.questionId === question._id);

            if (targetIndex !== -1) {
                if (question.questionType === "shortAnswer") {
                    answers[targetIndex].myAnswer = "";
                } else if (question.questionType === "singleChoice" || question.questionType === "multipleChoice") {
                    answers[targetIndex].myAnswer = [];
                }
            }
            return answers;
        });
    };


    return (
        <Container scrollbarWidth={scrollbarWidth}>
            <div>
                <div>
                    <span>Q.</span> <p>{question.question}</p>
                </div>

                {question.explanation && <p>{question.explanation}</p>}
            </div>

            {question.questionType === "shortAnswer" ?
                <ShortAnswerWrapper>
                    <label>{inputCategories.answer[lang]}</label>
                    <Input
                        type={"text"}
                        id={"shortAnswer"}
                        name={"shortAnswer"}
                        onChange={inputAnswer}
                        value={initialShortAnswer()}
                    />
                </ShortAnswerWrapper>
                : question.questionType === "singleChoice" ?
                    <ChoiceWrapper>
                        {question.options.map((opt, index) => (
                            <div key={index}>
                                <input
                                    type={"radio"}
                                    name={question._id}
                                    id={opt.optionId}
                                    checked={isChecked(opt.optionId)}
                                    onChange={inputAnswer}
                                />
                                <label htmlFor={opt.optionId}>{opt.content}</label>
                            </div>
                        ))}
                    </ChoiceWrapper>
                    : question.questionType === "multipleChoice" ?
                        <ChoiceWrapper>
                            {question.options.map((opt, index) => (
                                <div key={index}>
                                    <input
                                        type={"checkbox"}
                                        name={opt.optionId}
                                        id={opt.optionId}
                                        checked={isChecked(opt.optionId)}
                                        onChange={inputAnswer}
                                    />
                                    <label htmlFor={opt.optionId}>{opt.content}</label>
                                </div>
                            ))}
                        </ChoiceWrapper>
                        : <></>
            }

            {isAnswerFilled &&
              <ResetButtonWrapper>
                <Button
                  type={"button"}
                  content={buttonCategories.erase[lang]}
                  width={"fit"}
                  color={"third"}
                  scale={"small"}
                  onClick={eraseAnswer}
                />
              </ResetButtonWrapper>
            }
        </Container>
    );
};

export default TestListItem;