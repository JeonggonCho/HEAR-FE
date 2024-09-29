import {FC} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {v4 as uuidv4} from "uuid";
import {DragDropContext, Droppable} from '@hello-pangea/dnd';

import TimeListItem from "@components/TimeListItem";
import Button from "@components/Button";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import {timeRangeSchema} from "@schemata/machineSchema.ts";
import {ITimeListContentProps} from "@/types/componentProps.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, TimeSelectsWrapper, ErrorMessage,} from "./style.ts";


const TimeListContent:FC<ITimeListContentProps> = ({timeList, setTimeList}) => {
    const {errorText, sendRequest, clearError} = useRequest();

    type TimeFormData = z.infer<typeof timeRangeSchema>;

    // 시간 목록 생성 useForm
    const {
        register: timeRegister,
        handleSubmit: timeHandleSubmit,
        formState:{errors: timeErrors},
        setValue,
    } = useForm<TimeFormData>({
        resolver: zodResolver(timeRangeSchema),
        defaultValues: {
            startTime: "",
            endTime: "",
        },
    })

    // 목록에 시간 추가
    const addTime = async (data: TimeFormData) => {
        const validationResult = timeRangeSchema.safeParse(data);
        if (validationResult.success) {
            try {
                const id = uuidv4();
                const response = await sendRequest({
                   url: "/machines/lasers/times",
                   method: "post",
                   data: {id, ...data},
                });
                if (response.data) {
                    const {laserTime} = response.data;
                    setTimeList && setTimeList(prevState => [...prevState, {...laserTime}]);
                } else {
                    console.error("레이저 커팅기 시간 목록 추가 중 서버 오류 발생: ", response.data?.message || response.statusText);
                }
            } catch (err) {
                console.error("레이저 커팅기 시간 목록 추가 중 에러 발생: ", err);
            }
        } else {
            console.error(validationResult.error.format());
        }
    };

    // 시간 삭제
    const removeTime = async (id: string) => {
        try {
            await sendRequest({
                url: `/machines/lasers/times/${id}`,
                method: "delete",
            });
            setTimeList && setTimeList(prevState => prevState.filter(time => time.id !== id));
        } catch (err) {
            console.error("레이저 커팅기 시간 목록 삭제 중 에러 발생: ", err)
        }
    };

    // 목록을 드래그 앤 드롭 시 순서 변경
    const onDragEnd = async (result: any) => {
        // 영역 이외의 곳으로 드래그앤드롭 시, 적용 안 됨
        if (!result.destination) return;
        // 새로운 시간 목록 생성하기
        const newTimeList = Array.from(timeList);
        // 드래그한 항목 제거 후, 새로운 위치에 삽입하기
        const [removed] = newTimeList.splice(result.source.index, 1);
        newTimeList.splice(result.destination.index, 0, removed);

        setTimeList && setTimeList(newTimeList);
        try {
            await sendRequest({
                url: "/machines/lasers/times",
                method: "patch",
                data: newTimeList.map((t) => (
                    {
                        id: t.id,
                        startTime: t.startTime,
                        endTime: t.endTime
                    }
                )),
            });
        } catch (err) {
            console.error("레이저 커팅기 시간 목록 수정 중 에러 발생: ", err);
            setTimeList && setTimeList(timeList);
        }
    };

    return (
        <Container>
            <label>시간 목록</label>

            <TimeSelectsWrapper>
                <div>
                    <select
                        {...timeRegister("startTime")}
                        onChange={(e) => setValue("startTime", e.target.value)}
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
                        onChange={(e) => setValue("endTime", e.target.value)}
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

            {errorText &&
                <Modal
                  content={<ErrorContent text={errorText} closeModal={clearError}/>}
                  setModal={clearError}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default TimeListContent;