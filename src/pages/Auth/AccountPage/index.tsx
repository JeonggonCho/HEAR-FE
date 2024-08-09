import Header from "../../../components/Header";
import {FC} from "react";
import {UserName} from "./style.ts";

const AccountHeaderLeft: FC = () => {
    return (
        <h2><UserName>조정곤</UserName>님 안녕하세요</h2>
    );
};

const AccountPage = () => {
    return (
        <div>
            <Header leftChild={<AccountHeaderLeft/>}/>
            내정보
        </div>
    );
};

export default AccountPage;