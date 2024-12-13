import { Component, ReactNode } from "react";
import { useErrorStore, RequestErrorType } from "@store/useErrorStore.ts";
import { useToastStore } from "@store/useToastStore.ts";


interface ErrorBoundaryProps {
    children: ReactNode;
}


interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        const { setError } = useErrorStore.getState();
        const { showToast } = useToastStore.getState();

        // 에러 객체
        const errorData: RequestErrorType = {
            name: error.name || "에러",
            message: error.message || "알 수 없는 오류 발생",
            displayMode: "toast", // toast 또는 fallback 처리
        };
        setError(errorData);
        showToast(error.message, "error");
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>에러가 발생했습니다</h1>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
