import {useContext} from "react";
import {useWatch} from "react-hook-form";
import Input from "@components/common/Input";
import {
    AnswerWrapper,
    SideMenuAnswerWrapper,
    SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper
} from "./style.ts";
import EducationContext from "@context/EducationContext.ts";
import {EducationType} from "@/types/education.ts";


interface IEducationSideMenuContentProps {
    questions: EducationType[];
    moveQuestionHandler: (index: number) => void;
}


const EducationSideMenuContent = ({questions, moveQuestionHandler}: IEducationSideMenuContentProps) => {
    const {register, control} = useContext(EducationContext);
    const answers = useWatch({control});

    return (
        <SideMenuQuestionsWrapper>
            {questions.map((question, index) => {
                const answer = answers[question._id];

                return (
                    <SideMenuQuestionWrapper
                        key={index}
                        onClick={() => moveQuestionHandler(index)}
                        filled={((Array.isArray(answer) && answer.length > 0) || (typeof answer === "string" && answer.trim() !== "")) ? "true" : "false"}
                    >
                        <label>{index + 1}</label>
                        <SideMenuAnswerWrapper>
                            {question && question.questionType === "shortAnswer" && answer ? (
                                <p>{answer.toString() as string}</p>
                            ) : question && (question.questionType === "singleChoice" || question.questionType === "multipleChoice") ? (
                                <AnswerWrapper>
                                  {question.options.map((opt) => {
                                      const isChecked =
                                          question.questionType === "singleChoice"
                                              ? answers[question._id] === opt.optionId
                                              : Array.isArray(answers[question._id]) && answers[question._id].includes(opt.optionId);

                                      return (
                                          <div key={opt.optionId}>
                                              <Input
                                                  type={question.questionType === "singleChoice" ? "radio" : "checkbox"}
                                                  value={opt.optionId}
                                                  name={question._id}
                                                  id={`${question._id}-side-${opt.optionId}`}
                                                  register={register}
                                                  checked={isChecked}
                                                  onClick={e => e.stopPropagation()}
                                              />
                                          </div>
                                      );
                                  })}
                              </AnswerWrapper>
                            )  : null}
                        </SideMenuAnswerWrapper>
                    </SideMenuQuestionWrapper>
                );
            })}
        </SideMenuQuestionsWrapper>
    );
};

export default EducationSideMenuContent;