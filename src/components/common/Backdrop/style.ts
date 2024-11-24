import styled from "@emotion/styled";

export const BackdropWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    width: 600px;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    backdrop-filter: blur(2px);
    z-index: 5;
`;