import {createContext} from "react";
import {
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue,
    UseFormWatch,
    Control,
} from "react-hook-form";


const defaultRegister = (() => ({
    onChange: async () => Promise.resolve(),
    onBlur: async () => Promise.resolve(),
    ref: () => {},
    name: "content"
})) as unknown as UseFormRegister<any>;


const EducationContext = createContext<{
    register: UseFormRegister<any>;
    handleSubmit: UseFormHandleSubmit<any>;
    setValue: UseFormSetValue<any>;
    getValues: UseFormGetValues<any>;
    reset: () => void;
    watch: UseFormWatch<any>;
    control: Control<any>;
}>({
    register: defaultRegister,
    handleSubmit: (() => Promise.resolve()) as unknown as UseFormHandleSubmit<any>,
    setValue: (() => {}) as unknown as UseFormSetValue<any>,
    getValues: (() => ({})) as unknown as UseFormGetValues<any>,
    reset: (() => {}) as unknown as UseFormReset<any>,
    watch: (() => {}) as unknown as UseFormWatch<any>,
    control: {} as Control<any>,
});

export default EducationContext;