import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Nav from "../Nav";
import {OutletWrapper} from "./style.ts";

const Layout: FC = () => {
    return (
        <div>
            <OutletWrapper>
                <Outlet/>
            </OutletWrapper>
            <Nav/>
        </div>
    );
};

export default Layout;