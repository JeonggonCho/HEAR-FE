import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";

const NotFoundPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"404 페이지"}/>
            해당 페이지를 찾을 수 없습니다
            <ColoredBtn type={"link"} text={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"} to={"/"}/>
        </div>
    );
};

export default NotFoundPage;