import {FC} from "react";
import {ReactSVG} from "react-svg";

import useListCollapse from "@hooks/useListCollapse.ts";
import {QuestionResultType} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {
    AnswersWrapper,
    Container,
    ExplanationWrapper, LabelAndMoreWrapper, MyAnswer,
    OptionListItemWrapper,
    QuestionWrapper, ShortAnswer, ShortAnswerWrapper, SolutionWrapper,
} from "./style.ts";

import more from "@assets/icons/arrow_down.svg";
import check from "@assets/icons/check.svg";
import circle from "@assets/icons/circle.svg";
import close from  "@assets/icons/close.svg";


const GradingAnswerListItem:FC<QuestionResultType & {index:number}> = ({index, question, explanation, questionType, options, answer, myAnswer, isCorrect}) => {
    const {lang} = useThemeStore();
    const {isOpen, listRef, maxHeight, handleList} = useListCollapse();

    return (
        <Container>
            <LabelAndMoreWrapper
                onClick={handleList}
                isOpen={isOpen}
                isCorrect={isCorrect}
            >
                <label>{index + 1}</label>
                <div>
                    <span>{isCorrect ? cardCategories.correct[lang] : cardCategories.incorrect[lang]}</span> <ReactSVG src={isCorrect ? circle : close}/>
                </div>
                <div>
                    <ReactSVG src={more}/>
                </div>
            </LabelAndMoreWrapper>

            <SolutionWrapper
                isOpen={isOpen}
                maxHeight={isOpen ? `${maxHeight}px` : "0"}
                ref={listRef}
            >
                <div>
                    <QuestionWrapper>
                    <span>Q. </span> <p>{question}</p>
                    </QuestionWrapper>

                    {explanation && <ExplanationWrapper>{explanation}</ExplanationWrapper>}

                    <AnswersWrapper>
                        {questionType === "shortAnswer" ?
                            <ShortAnswerWrapper>
                                <ShortAnswer>
                                    <span>{`${inputCategories.answer[lang]} : `}</span>
                                    <span>{answer}</span>
                                </ShortAnswer>
                                <MyAnswer isCorrect={isCorrect}>
                                    <span>{`${inputCategories.submittedAnswer[lang]} : `}</span>
                                    <span>{myAnswer}</span>
                                </MyAnswer>
                            </ShortAnswerWrapper>
                            : questionType === "singleChoice" || questionType === "multipleChoice" ?
                                <ul>
                                    {options?.map((opt, index) => (
                                        <OptionListItemWrapper
                                            key={index}
                                            isAnswer={opt.isAnswer}
                                            isChecked={opt.isChecked}
                                        >
                                            <p>{opt.content}</p>
                                            <div>
                                                <ReactSVG src={check}/>
                                            </div>
                                        </OptionListItemWrapper>
                                    ))}
                                </ul>
                                : null
                        }
                    </AnswersWrapper>
                </div>
            </SolutionWrapper>
        </Container>
    );
};

export default GradingAnswerListItem;