import {Dispatch, SetStateAction} from "react";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {EducationType, ITestAnswer} from "@/types/education.ts";
import {ChoiceWrapper, Container, ResetButtonWrapper, ShortAnswerWrapper} from "./style.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface ITestListItemProps {
    question: EducationType;
    testAnswers: ITestAnswer[];
    setTestAnswers: Dispatch<SetStateAction<ITestAnswer[]>>;
    isAnswerFilled: boolean;
    inputAnswer: (e: any, question: EducationType) => void;
    isChecked: (optionId: string, question:EducationType) => boolean;
}


const TestListItem = (
    {
        question,
        testAnswers,
        setTestAnswers,
        isAnswerFilled,
        inputAnswer,
        isChecked}: ITestListItemProps
) => {
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
                        : null
            }

            {isAnswerFilled &&
              <ResetButtonWrapper>
                <Button
                  type={"button"}
                  variant={"filled"}
                  width={"fit"}
                  color={"third"}
                  size={"sm"}
                  onClick={eraseAnswer}
                >
                    {buttonCategories.erase[lang]}
                </Button>
              </ResetButtonWrapper>
            }
        </Container>
    );
};

export default TestListItem;