import {useContext, memo} from "react";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import TestContext from "@context/TestContext.ts";
import {EducationType} from "@/types/education.ts";
import {ChoiceWrapper, Container, ResetButtonWrapper, ShortAnswerWrapper} from "./style.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface ITestListItemProps {
    question: EducationType;
}


const TestListItem = ({question}: ITestListItemProps) => {
    const {lang} = useThemeStore();
    const {scrollbarWidth} = useScrollbarSize();
    const {register, getValues, setValue} = useContext(TestContext);

    // 답안이 채워져 있는지 확인하는 함수
    const isAnswerFilled = (question: EducationType) => {
        const answer = getValues(question._id);
        return !!answer;
    };

    // 답안 지우기 함수
    const eraseAnswer = (question: EducationType) => {
        const resetAnswer = question.questionType === "shortAnswer" || "singleChoice" ? "" : [];
        setValue(question._id, resetAnswer);
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
                        id={question._id}
                        name={question._id}
                        register={register}
                    />
                </ShortAnswerWrapper>
                : question.questionType === "singleChoice" || "multipleChoice" ?
                    <ChoiceWrapper>
                        {question.options.map((opt, index) => (
                            <div key={index}>
                                <input
                                    type={question.questionType === "singleChoice" ? "radio" : "checkbox"}
                                    id={opt.optionId}
                                    value={opt.optionId}
                                    {...register(question._id)}
                                    readOnly
                                />
                                <label htmlFor={opt.optionId}>{opt.content}</label>
                            </div>
                        ))}
                    </ChoiceWrapper>
                    : null
            }

            {isAnswerFilled(question) &&
              <ResetButtonWrapper>
                <Button
                  type={"button"}
                  variant={"filled"}
                  width={"fit"}
                  color={"third"}
                  size={"sm"}
                  onClick={() => eraseAnswer(question)}
                >
                    {buttonCategories.erase[lang]}
                </Button>
              </ResetButtonWrapper>
            }
        </Container>
    );
};

export default memo(TestListItem);