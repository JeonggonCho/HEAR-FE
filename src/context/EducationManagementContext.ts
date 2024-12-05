import {createContext, Dispatch, SetStateAction} from "react";
import {EducationType, IEducationSettings} from "@/types/education.ts";


const EducationManagementContext = createContext<{
    questions: EducationType[],
    setInitialQuestions: Dispatch<SetStateAction<EducationType[]>>,
    settings: IEducationSettings,
    setSettings: Dispatch<SetStateAction<IEducationSettings>>,
    initialDateSetting: {startDate: string | undefined, endDate: string | undefined},
    setInitialDateSetting: Dispatch<SetStateAction<{
        startDate: string | undefined,
        endDate: string | undefined
    }>>,
    initialCutOffPoint: {cutOffPoint: string},
    setInitialCutOffPoint: Dispatch<SetStateAction<{cutOffPoint: string}>>
    isModified: boolean;
}>({
    questions: [],
    setInitialQuestions: () => {},
    settings: {startDate: "", endDate: "", status: false, cutOffPoint: ""},
    setSettings: () => {},
    initialDateSetting: {startDate: "", endDate: ""},
    setInitialDateSetting: () => {},
    initialCutOffPoint: {cutOffPoint: ""},
    setInitialCutOffPoint: () => {},
    isModified: false,
});

export default EducationManagementContext;