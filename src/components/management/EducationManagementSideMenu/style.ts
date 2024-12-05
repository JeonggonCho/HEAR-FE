import styled from "@emotion/styled";


export const MenuButtonWrapper = styled.div`
    width: 28px;
    height: 28px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }

    svg {
        width: 100%;
        height: 100%;
        fill: #B0B8C1;
        transition: all 0.2s ease-in-out 0s;
    }
`;