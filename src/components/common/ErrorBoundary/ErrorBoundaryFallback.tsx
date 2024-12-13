import {ReactNode} from "react";


interface IErrorBoundaryFallbackProps {
    children: ReactNode;
    onError: (error: Error) => void;
}


const ErrorBoundaryFallback = ({children, onError}: IErrorBoundaryFallbackProps) => {
    try {
        return children;
    } catch (error) {
        onError(error as Error);
        return null;
    }
};

export default ErrorBoundaryFallback;