import {useCallback, useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Button from "@components/common/Button";
import Empty from "@components/common/Empty";
import Icon from "@components/common/Icon";
import QuestionListContent from "@components/management/QuestionListContent";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import Card from "@components/common/Card";
import EducationManagementMenu from "@components/management/EducationManagementMenu";
import EducationManagementSave from "@components/management/EducationManagementSave";
import EducationManagementSideMenu from "@components/management/EducationManagementSideMenu";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {EducationType, IEducationSettings} from "@/types/education.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationManagementContext from "@context/EducationManagementContext.ts";
import {MenusWrapper, QuestionsWrapper, ResetButtonWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import add from "@assets/icons/add.svg";
import reset from "@assets/icons/reset.svg";


const EducationManagementPage = () => {
    const [questions, setQuestions] = useState<EducationType[]>([]);
    const [initialQuestions, setInitialQuestions] = useState<EducationType[]>([]);
    const [settings, setSettings] = useState<IEducationSettings>({startDate: "", endDate: "", status: false, cutOffPoint: ""});
    const [initialDateSetting, setInitialDateSetting] = useState<{startDate: string | undefined, endDate: string | undefined}>({startDate: "", endDate: ""});
    const [initialCutOffPoint, setInitialCutOffPoint] = useState<{cutOffPoint: string}>({cutOffPoint: ""});
    const [isModified, setIsModified] = useState<boolean>(false);

    const {lang, isDarkMode} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

    // 문제 조회
    const fetchQuestions = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/education",
            });
            if (response.data) {
                const {questions, settings} = response.data;
                setQuestions(questions);
                setInitialQuestions(questions);
                setSettings({...settings, cutOffPoint: settings.cutOffPoint.toString()});
                setInitialDateSetting({startDate: settings.startDate, endDate: settings.endDate});
                setInitialCutOffPoint({cutOffPoint: settings.cutOffPoint.toString()});
            }
        } catch (err) {
            console.error("문제 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // 문제 추가하기
    const addQuestion = () => {
        const newQuestion: EducationType = {
            _id: uuidv4(),
            questionType: "shortAnswer",
            question: "",
            explanation: "",
            answer: "",
        };
        setQuestions(prevState => [...prevState, newQuestion]);
    };

    // 문제 목록 드래그
    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        if (!destination) return; // 유효하지 않은 위치일 경우,
        if (destination.index === source.index) return; // 동일한 위치일 경우,

        // 위치 업데이트
        const updatedQuestions = Array.from(questions);
        const [movedItem] = updatedQuestions.splice(source.index, 1);
        updatedQuestions.splice(destination.index, 0, movedItem);
        setQuestions(updatedQuestions);
    };

    // 문제 제거하기
    const removeQuestion = (targetIndex: string) => {
        const remainedQuestions = questions.filter((question) => question._id !== targetIndex);
        setQuestions(remainedQuestions);
    };

    // 문제 원래대로 초기화하기
    const resetQuestions = () => {
        // TODO 문제 유형이 기존과 다를 경우, 제대로 초기화가 안 됨

        setQuestions(initialQuestions);
    };

    // 문제 목록 변경 여부 체크
    useEffect(() => {
        if (JSON.stringify(questions) !== JSON.stringify(initialQuestions)) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }
    }, [questions, initialQuestions]);


    return (
        <>
            <HeadTag title={headerCategories.educationManagementHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.educationManagementHeader[lang]}</h2>
                    </Header.Center>
                    <Header.Right>
                        <EducationManagementSideMenu/>
                    </Header.Right>
                </Grid>
            </Header>

            <EducationManagementContext.Provider value={{
                questions,
                setInitialQuestions,
                settings,
                setSettings,
                initialDateSetting,
                setInitialDateSetting,
                initialCutOffPoint,
                setInitialCutOffPoint,
                isModified,
            }}>
                <MenusWrapper>
                    <EducationManagementMenu/>

                    <div>
                        <ResetButtonWrapper
                            onClick={resetQuestions}
                            modified={isModified.toString()}
                            darkmode={isDarkMode.toString()}
                        >
                            <span>{buttonCategories.reset[lang]}</span> <Icon svg={reset}/>
                        </ResetButtonWrapper>

                        <EducationManagementSave/>
                    </div>
                </MenusWrapper>

                <QuestionsWrapper>
                    {isLoading ?
                        <Card padding={0} borderRadius={0} bgColor={"sub"}>
                            <Flex align={"center"} justify={"center"} style={{height: "80vh"}}>
                                <LoadingLoop/>
                            </Flex>
                        </Card>
                        :
                        <>
                            {questions.length > 0 ?
                                <QuestionListContent
                                    onDragEnd={onDragEnd}
                                    questions={questions}
                                    removeQuestion={removeQuestion}
                                    setQuestions={setQuestions}
                                />
                                :
                                <Empty title={messageCategories.emptyQuestion[lang]}/>
                            }
                            <Button
                                type={"button"}
                                variant={"filled"}
                                width={"full"}
                                size={"lg"}
                                color={"second"}
                                onClick={addQuestion}
                            >
                                <Icon svg={add} size={24}/>
                            </Button>
                        </>
                    }
                </QuestionsWrapper>
            </EducationManagementContext.Provider>
        </>
    );
};

export default EducationManagementPage;