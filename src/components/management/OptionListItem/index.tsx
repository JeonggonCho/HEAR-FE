import {ReactSVG} from "react-svg";
import {Draggable} from "@hello-pangea/dnd";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {useThemeStore} from "@store/useThemeStore.ts";
import {OptionListItemWrapper} from "./style.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import drag from "@assets/icons/drag.svg";
import remove from "@assets/icons/remove.svg";


interface IOptionListItem {
    questionType: "singleChoice" | "multipleChoice";
    index: number;
    option: {
        optionId: string;
        content: string;
        isAnswer?: boolean;
    };
    changeOptionContentHandler: (targetOptionId: string, content: string) => void;
    changeChoiceAnswerHandler: (targetOptionId: string) => void;
    removeOption: (targetOptionId: string) => void;
}


const OptionListItem = (
    {
        questionType,
        index,
        option,
        changeOptionContentHandler,
        changeChoiceAnswerHandler,
        removeOption,
    }: IOptionListItem
) => {
    const {lang} = useThemeStore();

    return (
        <Draggable draggableId={option.optionId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{...provided.draggableProps.style}}
                >
                    <OptionListItemWrapper isDragging={snapshot.isDragging}>
                        <div {...provided.dragHandleProps}>
                            <ReactSVG src={drag}/>
                        </div>
                        <Input
                            placeholder={placeholderCategories.optionContent[lang]}
                            type={"text"}
                            id={"option"}
                            name={"option"}
                            value={option.content}
                            onChange={e => changeOptionContentHandler(option.optionId, e.target.value as string)}
                        />
                        {questionType === "singleChoice" ?
                            <input
                                type={"radio"}
                                onChange={() => changeChoiceAnswerHandler(option.optionId as string)}
                                checked={option.isAnswer}
                                id={option.optionId}
                            />
                            :
                            <input
                                type={"checkbox"}
                                onChange={() => changeChoiceAnswerHandler(option.optionId as string)}
                                checked={option.isAnswer}
                                id={option.optionId}
                            />
                        }
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"fit"}
                            color={"third"}
                            size={"sm"}
                            onClick={() => removeOption(option.optionId)}
                        >
                            <ReactSVG src={remove}/>
                        </Button>
                    </OptionListItemWrapper>
                </div>
            )}
        </Draggable>
    );
};

export default OptionListItem;