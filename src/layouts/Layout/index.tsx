import {useEffect, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Nav from "@components/common/Nav";
import {Container, OutletWrapper} from "./style.ts";


interface ILayoutProps {
    showNav?: boolean;
}


const Layout = ({showNav = true}: ILayoutProps) => {
    const location = useLocation();
    const [showBackground, setShowBackground] = useState<boolean>(true);

    const hideBackgroundRoutes:string[] = [
        "/account",
        "/setting",
        "/management/machines",
        "/reservation/laser",
        "/reservation/3d-printer",
        "/reservation/heat",
        "/reservation/saw",
        "/reservation/vacuum",
        "/reservation/cnc",
        "/management/users",
        "/board/notice",
        "/instruction/laser",
        "/instruction/3d-printer",
        "/instruction/heat",
        "/instruction/saw",
        "/instruction/vacuum",
        "/instruction/cnc",
    ];

    useEffect(() => {
        if (hideBackgroundRoutes.includes(location.pathname)) {
            setShowBackground(false);
        } else {
            setShowBackground(true);
        }
    }, [location.pathname]);

    return (
        <Container>
            <OutletWrapper background={showBackground}>
                <Outlet/>
            </OutletWrapper>
            {showNav && <Nav/>}
        </Container>
    );
};

export default Layout;