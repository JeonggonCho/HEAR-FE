import {ChangeEvent, FC, useState} from "react";
import {ReactSVG} from "react-svg";

import Input from "@components/common/Input";

import {IEducation} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {filterCategories} from "@constants/filterCategories.ts";

import {Container, DragIndicator, IndexWrapper, RemoveWrapper, TextAnswerWrapper} from "./style.ts";

import close from "@assets/icons/close.svg";
import drag from "@assets/icons/drag_line.svg";


const QuestionListItem:FC<{index: number, removeQuestion: (questionId: string) => void, question: IEducation}> = ({index, questionId, removeQuestion, question}) => {
    const [questionType, setQuestionType] = useState(question.educationType || "shortAnswer");

    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <DragIndicator>
                    <ReactSVG src={drag}/>
                </DragIndicator>
                <IndexWrapper>{index + 1}</IndexWrapper>
                <RemoveWrapper onClick={() => removeQuestion(question._id)}>
                    <ReactSVG src={close}/>
                </RemoveWrapper>
            </div>

            <div>
                <Input
                    placeholder={placeholderCategories.question[lang]}
                    type={"text"}
                    id={"question"}
                    name={"question"}
                />
                <select
                    defaultValue={"shortAnswer"}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setQuestionType(e.target.value as "shortAnswer" | "singleChoice" | "multipleChoice");
                    }}
                >
                    <option value={"shortAnswer"}>{filterCategories.short[lang]}</option>
                    <option value={"singleChoice"}>{filterCategories.single[lang]}</option>
                    <option value={"multipleChoice"}>{filterCategories.multiple[lang]}</option>
                </select>
            </div>

            <Input
                placeholder={placeholderCategories.explanation[lang]}
                type={"text"}
                id={"description"}
                name={"description"}
            />

            {questionType === "shortAnswer" ?
                <TextAnswerWrapper>
                    <Input
                        placeholder={placeholderCategories.answer[lang]}
                        type={"text"}
                        id={"단답형"}
                        name={"단답형"}
                    />
                </TextAnswerWrapper> :
                questionType === "singleChoice" ?
                    <div>
                        <p>단일 선택형</p>
                    </div> :
                questionType === "multipleChoice" ?
                    <div>
                        <p>다중 선택형</p>
                    </div> :
                    <></>
            }
        </Container>
    );
};

export default QuestionListItem;