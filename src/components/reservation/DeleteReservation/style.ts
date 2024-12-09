import styled from "@emotion/styled";


export const DeleteBtnWrapper = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: auto;

    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }

    svg {
        transition: all 0.2s ease-in-out 0s;
        fill: ${({theme}) => theme.colors.icon.fill};
    }
`;