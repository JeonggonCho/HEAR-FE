import React, {FC} from "react";
import {Button, Container, NavWrapper} from "./style.ts";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";
import {navCategories} from "@constants/navCategories.ts";


const Nav: FC = () => {
    const {pathname} = useLocation();

    return (
        <Container>
            <NavWrapper>
                {navCategories.map((category, index) => (
                    <Button
                        to={category.path}
                        key={index}
                        active={(pathname.includes(category.path)).toString()}
                    >
                        <ReactSVG src={category.icon} />
                        {category.label}
                    </Button>
                ))}
            </NavWrapper>
        </Container>
    );
};

export default React.memo(Nav);