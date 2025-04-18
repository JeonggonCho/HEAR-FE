import styled from "@emotion/styled";

export const Container = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding: 8px 0;

    // 캐로젤 영역

    & > div:first-of-type {
        padding-bottom: 32px;
        
        // 캐로젤 컨텐츠 영역

        & > div:first-of-type {
            margin-top: 12px;
            display: flex;
            align-items: center;

            // 각각의 컨텐츠

            & > div {
                width: 80%;
                padding: 16px;
                border-radius: 20px;
                cursor: grab;
                background-color: ${({theme}) => theme.colors.bg.main};
                box-shadow: 0 0 1px ${({theme}) => theme.colors.bg.shadow};
                border: 1px solid ${({theme}) => theme.colors.bg.main};

                @media (max-width: 500px) {
                    width: 85%;
                }
            }
        }

        // 왼쪽 화살표 버튼

        & > div:nth-of-type(2) {
            margin-left: -4px;
            margin-top: -32px;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                scale: 1.05;
                color: ${({theme}) => theme.colors.font.main};
            }

            &:active {
                scale: 0.85;
            }

            &:after {
                font-size: 1.5rem;
            }

            @media (max-width: 500px) {
                display: none;
            }
        }

        // 오른쪽 화살표 버튼

        & > div:nth-of-type(3) {
            margin-right: -4px;
            margin-top: -32px;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                scale: 1.05;
                color: ${({theme}) => theme.colors.font.main};
            }

            &:active {
                scale: 0.85;
            }

            &:after {
                font-size: 1.5rem;
            }

            @media (max-width: 500px) {
                display: none;
            }
        }

        // 페이지네이션 영역

        & > div:nth-of-type(4) {
            bottom: 0;
            & > span {
                margin: 0 6px;
                transition: all 0.2s ease-in-out 0s;
                background-color: ${({theme}) => theme.colors.font.sub};
            }

            span[class="swiper-pagination-bullet swiper-pagination-bullet-active"] {
                width: 20px;
                border-radius: 4px;
            }
        }
    }
`;