import {createContext, Dispatch, SetStateAction} from "react";
import {ITestAnswer} from "@/types/education.ts";


const TestContext = createContext<{
    testAnswers: ITestAnswer[];
    setTestAnswers: Dispatch<SetStateAction<ITestAnswer[]>>;
}>({
    testAnswers: [],
    setTestAnswers: () => {},
});

export default TestContext;