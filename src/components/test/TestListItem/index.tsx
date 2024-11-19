import {FC} from "react";

import Input from "@components/common/Input";
import Button from "@components/common/Button";

import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import {ITestListItemProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {ChoiceWrapper, Container, ResetButtonWrapper, ShortAnswerWrapper} from "./style.ts";


const TestListItem:FC<ITestListItemProps> = ({question, testAnswers, setTestAnswers, isAnswerFilled, inputAnswer, isChecked}) => {
    const {lang} = useThemeStore();
    const {scrollbarWidth} = useScrollbarSize();

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
                        onChange={e => inputAnswer(e, question)}
                        value={initialShortAnswer()}
                    />
                </ShortAnswerWrapper>
                : question.questionType === "singleChoice" ?
                    <ChoiceWrapper>
                        {question.options.map((opt, index) => (
                            <div key={index}>
                                <input
                                    type={"radio"}
                                    name={`testList ${question._id}`}
                                    id={`testList ${opt.optionId}`}
                                    checked={isChecked(opt.optionId, question)}
                                    onClick={e => inputAnswer(e, question)}
                                    readOnly
                                />
                                <label htmlFor={`testList ${opt.optionId}`}>{opt.content}</label>
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
                                        checked={isChecked(opt.optionId, question)}
                                        onClick={e => inputAnswer(e, question)}
                                        readOnly
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