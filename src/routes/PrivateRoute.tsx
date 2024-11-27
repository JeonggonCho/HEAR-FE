import {Outlet, Navigate} from "react-router-dom";


interface IPrivateRouteProps {
    role: "admin" | "student" | "assistant" | null;
}


const PrivateRoute = ({role}: IPrivateRouteProps) => {
    return role ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;