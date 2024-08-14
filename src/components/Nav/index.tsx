import React, {FC} from "react";
import {Button, Container} from "./style.ts";
import home from "../../assets/icons/home.svg";
import note from "../../assets/icons/note.svg";
import reservation from "../../assets/icons/reservation.svg";
import question from "../../assets/icons/question.svg";
import account from "../../assets/icons/account.svg";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

interface ICategory {
    label: string;
    icon: string;
    path: string;
}

const categories: ICategory[] = [
    { label: "홈", icon: home, path: "/main" },
    { label: "사용법", icon: note, path: "/instruction" },
    { label: "예 약", icon: reservation, path: "/reservation" },
    { label: "문 의", icon: question, path: "/qna" },
    { label: "내정보", icon: account, path: "/account" },
];

const Nav: FC = () => {
    const {pathname} = useLocation();
    console.log(pathname)

    return (
        <Container>
            {categories.map((category, index) => (
                <Button
                    to={category.path}
                    key={index}
                    isActive={pathname.includes(category.path)}
                >
                    <ReactSVG src={category.icon} />
                    {category.label}
                </Button>
            ))}
        </Container>
    );
};

export default React.memo(Nav);