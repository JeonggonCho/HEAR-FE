import {FC} from "react";
import {Outlet, Navigate} from "react-router-dom";

interface IPrivateRouteProps {
    role: "admin" | "student" | "assistant" | null;
}

const PrivateRoute:FC<IPrivateRouteProps> = ({role}) => {
    return role ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;