import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import OptionListItem from "@components/management/OptionListItem";
import {EducationType, IMultipleChoice, ISingleChoice} from "@/types/education.ts";


interface IOptionListContentProps {
    onDragEnd: (result: any) => void;
    question: EducationType;
    questionType: "singleChoice" | "multipleChoice";
    changeOptionContentHandler: (targetOptionId: string, content: string) => void;
    changeChoiceAnswerHandler: (targetOptionId: string) => void;
    removeOption: (targetOptionId: string) => void;
}


const OptionListContent = (
    {
        onDragEnd,
        question,
        questionType,
        changeOptionContentHandler,
        changeChoiceAnswerHandler,
        removeOption,
    }: IOptionListContentProps
) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="options">
                <Droppable droppableId="options">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {(question as ISingleChoice | IMultipleChoice).options.map((option, index) => (
                                <OptionListItem
                                    key={option.optionId}
                                    questionType={questionType}
                                    index={index}
                                    option={option}
                                    changeOptionContentHandler={changeOptionContentHandler}
                                    changeChoiceAnswerHandler={changeChoiceAnswerHandler}
                                    removeOption={removeOption}
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

export default OptionListContent;