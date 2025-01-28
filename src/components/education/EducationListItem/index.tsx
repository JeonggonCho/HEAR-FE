import {useContext, memo} from "react";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import useScrollbarSize from "@hooks/useScrollbarSize.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationContext from "@context/EducationContext.ts";
import {EducationType} from "@/types/education.ts";
import {ChoiceWrapper, Container, ResetButtonWrapper, ShortAnswerWrapper} from "./style.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useWatch} from "react-hook-form";


interface IEducationListItemProps {
    question: EducationType;
}


const EducationListItem = ({question}: IEducationListItemProps) => {
    const {lang} = useThemeStore();
    const {scrollbarWidth} = useScrollbarSize();
    const {register, setValue, control} = useContext(EducationContext);
    const answers = useWatch({control});

    // 답안이 채워져 있는지 확인하는 함수
    const isAnswerFilled = (question: EducationType) => {
        const answer = answers[question._id];
        return (Array.isArray(answer) && answer.length > 0) || (typeof answer === "string" && answer.trim() !== "");
    };

    // 답안 지우기 함수
    const eraseAnswer = (question: EducationType) => {
        const resetAnswer = question.questionType === "shortAnswer" || question.questionType === "singleChoice" ? "" : [];
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
                : question.questionType === "singleChoice" || question.questionType === "multipleChoice" ?
                    <ChoiceWrapper>
                        {question.options.map((opt) => {
                            const isChecked =
                                question.questionType === "singleChoice"
                                    ? answers[question._id] === opt.optionId
                                    : Array.isArray(answers[question._id]) && answers[question._id].includes(opt.optionId);

                            return (
                                <div key={opt.optionId}>
                                    <Input
                                        type={question.questionType === "singleChoice" ? "radio" : "checkbox"}
                                        id={`${question._id}-list-${opt.optionId}`}
                                        name={question._id}
                                        value={opt.optionId}
                                        register={register}
                                        checked={isChecked}
                                    />
                                    <label htmlFor={`${question._id}-list-${opt.optionId}`}>{opt.content}</label>
                                </div>
                            );
                        })}
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

export default memo(EducationListItem);