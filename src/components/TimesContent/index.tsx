import {FC, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {v4 as uuidv4} from "uuid";
import {ReactSVG} from "react-svg";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import TimeListItem from "@components/TimeListItem";
import Button from "@components/Button";

import {timeRangeSchema} from "@schemata/machineSchema.ts";
import useListCollapse from "@hooks/useListCollapse.ts";

import {Container, TimeSelectsWrapper, ErrorMessage, MoreWrapper, TimesWrapper} from "./style.ts";

import more from "@assets/icons/arrow_down.svg";

const TimesContent:FC = () => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [timeList, setTimeList] = useState<{id: string; startTime: string; endTime: string}[]>([]);

    const {isOpen, listRef, maxHeight, handleList} = useListCollapse(timeList.length);

    type TimeFormData = z.infer<typeof timeRangeSchema>;

    // 시간 목록 생성 useForm
    const {
        register: timeRegister,
        handleSubmit: timeHandleSubmit,
        formState:{errors: timeErrors},
    } = useForm<TimeFormData>({
        resolver: zodResolver(timeRangeSchema),
        defaultValues: {
            startTime: "",
            endTime: "",
        },
    })

    // 목록에 시간 추가
    const addTime = (data: any) => {
        if (data.startTime && data.endTime) {
            const validationResult = timeRangeSchema.safeParse({ startTime, endTime });
            if (validationResult.success) {
                setTimeList(prevState => [...prevState, {id: uuidv4(), startTime, endTime }]);
                setStartTime("");
                setEndTime("");
            } else {
                console.error(validationResult.error.format());
            }
        }
    };

    // 시간 삭제
    const removeTime = (id: string) => {
        setTimeList(prevState => prevState.filter(time => time.id !== id));
    };

    // 목록을 드래그 앤 드롭 시 순서 변경
    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const newTimeList = Array.from(timeList);
        const [removed] = newTimeList.splice(result.source.index, 1);
        newTimeList.splice(result.destination.index, 0, removed);
        setTimeList(newTimeList);
    };

    return (
        <Container>
            <div onClick={handleList}>
                <label>시간 목록</label>
                <MoreWrapper isOpen={isOpen}>
                    <ReactSVG src={more}/>
                </MoreWrapper>
            </div>

            <TimesWrapper
                ref={listRef}
                isOpen={isOpen}
                maxHeight={isOpen ? `${maxHeight}px` : "0"}
            >
                <TimeSelectsWrapper>
                    <div>
                        <select
                            {...timeRegister("startTime")}
                            value={startTime}
                            id={"laser-start-time"}
                            onChange={(e) => setStartTime(e.target.value)}
                        >
                            <option value={""}>시작 시간</option>
                            <option value={"08:00"}>08:00</option>
                            <option value={"09:00"}>09:00</option>
                            <option value={"10:00"}>10:00</option>
                            <option value={"11:00"}>11:00</option>
                            <option value={"12:00"}>12:00</option>
                            <option value={"13:00"}>13:00</option>
                            <option value={"14:00"}>14:00</option>
                            <option value={"15:00"}>15:00</option>
                            <option value={"16:00"}>16:00</option>
                            <option value={"17:00"}>17:00</option>
                            <option value={"18:00"}>18:00</option>
                            <option value={"19:00"}>19:00</option>
                            <option value={"20:00"}>20:00</option>
                            <option value={"21:00"}>21:00</option>
                            <option value={"22:00"}>22:00</option>
                            <option value={"23:00"}>23:00</option>
                        </select>
                    </div>

                    <div>
                        <select
                            {...timeRegister("endTime")}
                            value={endTime}
                            id={"laser-end-time"}
                            onChange={(e) => setEndTime(e.target.value)}
                        >
                            <option value={""}>종료 시간</option>
                            <option value={"08:00"}>08:00</option>
                            <option value={"09:00"}>09:00</option>
                            <option value={"10:00"}>10:00</option>
                            <option value={"11:00"}>11:00</option>
                            <option value={"12:00"}>12:00</option>
                            <option value={"13:00"}>13:00</option>
                            <option value={"14:00"}>14:00</option>
                            <option value={"15:00"}>15:00</option>
                            <option value={"16:00"}>16:00</option>
                            <option value={"17:00"}>17:00</option>
                            <option value={"18:00"}>18:00</option>
                            <option value={"19:00"}>19:00</option>
                            <option value={"20:00"}>20:00</option>
                            <option value={"21:00"}>21:00</option>
                            <option value={"22:00"}>22:00</option>
                            <option value={"23:00"}>23:00</option>
                        </select>
                    </div>

                    <Button
                        type={"button"}
                        content={"추가"}
                        width={"full"}
                        color={"approval"}
                        scale={"small"}
                        onClick={timeHandleSubmit(addTime)}
                    />
                </TimeSelectsWrapper>

                {timeErrors.startTime?.message && <ErrorMessage>{timeErrors.startTime.message}</ErrorMessage>}
                {timeErrors.endTime?.message && <ErrorMessage>{timeErrors.endTime.message}</ErrorMessage>}


                    {timeList.length !== 0 ?
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="times">
                                <Droppable droppableId="times">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {timeList.map((t, index) => (
                                                <TimeListItem
                                                    key={t.id}
                                                    id={t.id}
                                                    index={index}
                                                    startTime={t.startTime}
                                                    endTime={t.endTime}
                                                    onDelete={() => removeTime(t.id)}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </DragDropContext>
                        :
                        <p>시간 목록이 없습니다</p>
                    }
            </TimesWrapper>
        </Container>
    );
};

export default TimesContent;