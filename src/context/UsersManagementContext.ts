import {createContext, Dispatch, SetStateAction} from "react";
import {IUserInfo} from "@/types/user.ts";


const UsersManagementContext = createContext<{
    userList: IUserInfo[];
    setUserList: Dispatch<SetStateAction<IUserInfo[]>>;
}>({
    userList: [],
    setUserList: () => {},
});

export default UsersManagementContext;