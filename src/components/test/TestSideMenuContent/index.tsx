import {useContext} from "react";
import {
    AnswerWrapper,
    SideMenuAnswerWrapper,
    SideMenuQuestionsWrapper,
    SideMenuQuestionWrapper
} from "./style.ts";
import TestContext from "@context/TestContext.ts";
import {EducationType} from "@/types/education.ts";


interface ITestSideMenuContentProps {
    questions: EducationType[];
    moveQuestionHandler: (index: number) => void;
}


const TestSideMenuContent = ({questions, moveQuestionHandler}: ITestSideMenuContentProps) => {
    const {register, getValues} = useContext(TestContext);
    const answers = getValues();

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
                                  {question.options.map((opt, index) => (
                                      <input
                                          key={index}
                                          type={question.questionType === "singleChoice" ? "radio" : "checkbox"}
                                          value={opt.optionId}
                                          id={opt.optionId}
                                          defaultChecked={
                                              question.questionType === "singleChoice"
                                                  ? answer === opt.optionId
                                                  : Array.isArray(answer) && answer.includes(opt.optionId)
                                          }
                                          {...register(question._id)}
                                          onClick={e => e.stopPropagation()}
                                          readOnly
                                      />
                                  ))}
                              </AnswerWrapper>
                            )  : null}
                        </SideMenuAnswerWrapper>
                    </SideMenuQuestionWrapper>
                );
            })}
        </SideMenuQuestionsWrapper>
    );
};

export default TestSideMenuContent;