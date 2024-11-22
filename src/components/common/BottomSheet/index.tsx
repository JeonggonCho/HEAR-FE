import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";


const moveUp = keyframes`
    0% {
        transform: translateX(-50%) translateY(200%);
    }
    80% {
        transform: translateX(-50%) translateY(-8%);
    }
    100% {
        transform: translateX(-50%) translateY(0%);
    }
`;

const BottomSheetWrapper = styled.div`
    width: 100%;
    padding: 12px 0 80px 0;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 24px 24px 0 0;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -68px;
    overflow: hidden;
    animation: ${moveUp} 0.4s;

    @media (max-width: 600px) {
        max-width: 100vw;
    }

    // bottom sheet 그랩 바
    & > div:first-of-type {
        width: 40px;
        height: 6px;
        background-color: ${({theme}) => theme.colors.line.main};
        margin: auto auto 8px auto;
        border-radius: 3px;
        cursor: pointer;
    }
    
    // 타이틀 및 닫기 버튼 부분
    & > div:nth-of-type(2) {
        width: 100%;
        margin-bottom: 8px;
        padding-bottom: 12px;
        padding-left: 28px;
        padding-right: 28px;
        border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            margin: 0;
            color: ${({theme}) => theme.colors.font.main};
            font-size: 1.25rem;
        }
        
        // 닫기
        & > div:last-of-type {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${({theme}) => theme.colors.button.third};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                svg {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
            
            svg {
                margin-top: 2px;
                fill: ${({theme}) => theme.colors.icon.fill};
                transition: all 0.2s ease-in-out 0s;
            }
        }
    }
`;



const BottomSheet = () => {
    return (
        <BottomSheetWrapper>
            {}
        </BottomSheetWrapper>
    );
};

export default BottomSheet;