import {FC} from "react";
import {ReactSVG} from "react-svg";

import useListCollapse from "@hooks/useListCollapse.ts";
import {QuestionResultType} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {
    AnswersWrapper,
    Container,
    ExplanationWrapper, MyAnswer,
    OptionListItemWrapper,
    QuestionWrapper, ShortAnswer,
} from "./style.ts";

import more from "@assets/icons/arrow_down.svg";
import check from "@assets/icons/check.svg";


const GradingAnswerListItem:FC<QuestionResultType> = ({question, explanation, questionType, options, answer, myAnswer, isCorrect}) => {
    const {lang} = useThemeStore();
    const {isOpen, listRef, maxHeight, handleList} = useListCollapse();

    return (
        <Container
            isOpen={isOpen}
            maxHeight={isOpen ? `${maxHeight}px` : "0"}
        >
            <div ref={listRef}>
                <div>
                    <QuestionWrapper>
                        <span>Q. </span> <p>{question}</p>
                    </QuestionWrapper>

                    {explanation && <ExplanationWrapper>{explanation}</ExplanationWrapper>}

                    <AnswersWrapper>
                        {questionType === "shortAnswer" ?
                            <>
                                <ShortAnswer><span>{`${inputCategories.answer[lang]} :`}</span> <span>{answer}</span></ShortAnswer>
                                <MyAnswer isCorrect={isCorrect}><span>{`${inputCategories.submittedAnswer[lang]} :`}</span> <span>{myAnswer}</span></MyAnswer>
                            </>
                            : questionType === "singleChoice" || questionType === "multipleChoice" ?
                                <ul>
                                    {options?.map((opt, index) => (
                                        <OptionListItemWrapper key={index} isAnswer={opt.isAnswer} isChecked={opt.isChecked}>
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
            </div>

            <div onClick={handleList}>
                <span>{isOpen ? buttonCategories.close[lang] : cardCategories.view[lang]}</span>
                <ReactSVG src={more}/>
            </div>
        </Container>
    );
};

export default GradingAnswerListItem;