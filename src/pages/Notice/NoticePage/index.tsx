import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import {Container} from "./style.ts";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";

const dummy = [
    {
        id: 1,
        title: "모형제작실 교육",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 2,
        title: "경고 조치",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 3,
        title: "청소의 당부",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 4,
        title: "방학기간 사용",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 5,
        title: "예약 안내",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 6,
        title: "기기 수리 조치",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 7,
        title: "모형제작실 교육",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 8,
        title: "고장날 수 있으니 주의",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 9,
        title: "교육을 꼭 이수할 필요가 있음",
        author: "조정곤",
        date: "2024.08.18",
    },
    {
        id: 10,
        title: "모형제작실 교육",
        author: "조정곤",
        date: "2024.08.18",
    },
];

const NoticePage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항"}/>

            {dummy.length !== 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>제목</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummy.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.title}</td>
                                    <td>{value.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                :
                <Empty title={"작성된 공지사항이 없습니다"}/>
            }

            <CreateBtn to={"/notice/new"}/>
        </Container>
    );
};

export default NoticePage;