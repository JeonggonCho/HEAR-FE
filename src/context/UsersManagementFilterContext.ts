import {createContext, Dispatch, SetStateAction} from "react";
import {IUserFilter} from "@/types/user.ts";


const UsersManagementFilterContext = createContext<{
    filter: IUserFilter;
    setFilter: Dispatch<SetStateAction<IUserFilter>>;
}>({
    filter: {year: ["all"], passEducation: ["all"], countOfWarning:["all"]},
    setFilter: () => {},
});

export default UsersManagementFilterContext;