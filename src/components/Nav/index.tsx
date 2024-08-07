import {FC} from "react";
import {Button, Container} from "./style.ts";
import home from "../../assets/icons/home.svg";
import note from "../../assets/icons/note.svg";
import reservation from "../../assets/icons/reservation.svg";
import question from "../../assets/icons/question.svg";
import account from "../../assets/icons/account.svg";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

interface Category {
    [key: string]: string[];
}

const categories: Category[] = [
    {"홈": [home, "/main"]},
    {"사용법": [note, "/instruction"]},
    {"예 약": [reservation, "/reservation"]},
    {"문 의": [question, "/qna"]},
    {"내정보": [account, "/account"]},
];

const Nav: FC = () => {
    const {pathname} = useLocation();
    console.log(pathname)

    return (
        <Container>
            {categories.map((category, index) => {
                const key = Object.keys(category)[0];
                const value = category[key];
                return (
                    <Button to={value[1]} key={index} isActive={pathname.includes(value[1])}>
                        <ReactSVG src={value[0]}/>
                        {key}
                    </Button>
                );
            })}
        </Container>
    );
};

export default Nav;