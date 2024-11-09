import {FC} from "react";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

import OptionListItem from "@components/management/OptionListItem";

import {IOptionListContentProps} from "@/types/componentProps.ts";
import {IMultipleChoice, ISingleChoice} from "@/types/education.ts";


const OptionListContent: FC<IOptionListContentProps> = (
    {
        onDragEnd,
        question,
        questionType,
        changeOptionContentHandler,
        changeChoiceAnswerHandler,
        removeOption,
    }
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