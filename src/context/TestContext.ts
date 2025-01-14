import {createContext} from "react";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form";


const defaultRegister = (() => ({
    onChange: async () => Promise.resolve(),
    onBlur: async () => Promise.resolve(),
    ref: () => {},
    name: "content"
})) as unknown as UseFormRegister<any>;


const TestContext = createContext<{
    // testAnswers: ITestAnswer[];
    // setTestAnswers: Dispatch<SetStateAction<ITestAnswer[]>>;
    register: UseFormRegister<any>;
    handleSubmit: UseFormHandleSubmit<any>;
}>({
    // testAnswers: [],
    // setTestAnswers: () => {},
    register: defaultRegister,
    handleSubmit: (() => Promise.resolve()) as unknown as UseFormHandleSubmit<any>,
});

export default TestContext;