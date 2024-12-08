import {Dispatch, SetStateAction} from "react";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import QuestionListItem from "@components/management/QuestionListItem";
import {EducationType} from "@/types/education.ts";


interface IQuestionListContentProps {
    onDragEnd: (result: any) => void;
    questions: EducationType[];
    removeQuestion: (targetIndex: string) => void;
    setQuestions: Dispatch<SetStateAction<EducationType[]>>;
}


const QuestionListContent = (
    {
        onDragEnd,
        questions,
        removeQuestion,
        setQuestions,
    }: IQuestionListContentProps
) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="questions">
                <Droppable droppableId="questions">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{display: "flex", flexDirection: "column", gap: "20px"}}
                        >
                            {questions.map((question, index) => (
                                <QuestionListItem
                                    key={question._id}
                                    index={index}
                                    removeQuestion={removeQuestion}
                                    question={question}
                                    setQuestions={setQuestions}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default QuestionListContent;