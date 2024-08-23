import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../Nav";
import {Container, OutletWrapper} from "./style.ts";

const Layout: FC = () => {
    return (
        <Container>
            <OutletWrapper>
                <Outlet/>
            </OutletWrapper>
            <Nav/>
        </Container>
    );
};

export default Layout;