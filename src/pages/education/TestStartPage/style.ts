import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    
    & > div:last-of-type {
        margin: 24px;
    }
`;

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

export const MenusWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 4px 24px;
    position: sticky;
    top: 72px;
    
    // 현재 문제 번호 및 제출 버튼
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        span {
            background-color: ${({theme}) => theme.colors.button.approval};
            padding: 8px 12px;
            border-radius: 6px;
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;

export const QuestionsWrapper = styled.div<{currentQuestion: number, scrollbarWidth: number}>`
    width: 100%;
    overflow: hidden;
    margin-bottom: 24px;
    
    & > div:first-of-type {
        width: 100%;
        display: flex;
        gap: 12px;
        transition: all 1s ease-in-out 0s;
        transform: ${({ currentQuestion }) => `translateX(-${currentQuestion * (550 + 12)}px)`};

        @media (max-width: 615px) {
            transform: ${({ currentQuestion, scrollbarWidth }) => `translateX(-${currentQuestion * (100 * (window.innerWidth / 100) - 50 + 12 - scrollbarWidth)}px)`};
        }
    }
`;

export const QuestionWrapper = styled.div<{scrollbarWidth: number}>`
    min-width: 550px;
    padding: 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    border-radius:12px;
    
    @media (max-width: 615px) {
        min-width: ${({scrollbarWidth}) => `calc(100vw - 50px - ${scrollbarWidth}px)`};
    }
`;

export const BtnsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;