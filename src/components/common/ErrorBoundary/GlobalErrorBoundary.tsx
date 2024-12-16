import {Component, ErrorInfo, ReactNode} from "react";
import Flex from "@components/common/Flex";


interface ErrorBoundaryProps {
    children: ReactNode;
}


interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}


class GlobalErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log("에러: ", error)
        console.log("에러 정보: ", errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Flex
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    gap={32}
                    style={{height: "100vh"}}
                >
                    <h1>에러가 발생했습니다</h1>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </Flex>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
