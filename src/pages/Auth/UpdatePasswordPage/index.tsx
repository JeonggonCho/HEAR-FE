import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import {Container} from "./style.ts";

const UpdatePasswordPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"비밀번호 변경"}/>
        </Container>
    );
};

export default UpdatePasswordPage;