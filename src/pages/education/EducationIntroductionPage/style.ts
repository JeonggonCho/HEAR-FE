import styled from "@emotion/styled";


export const Container = styled.div`
    width: 100%;
`;

export const ContentWrapper = styled.div`
    margin: 12px 32px;

    // 교육 일러스트 이미지
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            margin-left: 8px;
            width: 20%;
            object-fit: contain;

            @media (max-width: 400px) {
                width: 25%;
            }
        }
    }

    // 교육 기간
    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 28px;

        label {
            font-size: 1.15rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.main};
        }

        span {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
    
    // 교육 대상, 커트라인
    & > div:nth-of-type(3),
    & > div:nth-of-type(4) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 28px;

        label {
            font-size: 1.15rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.main};
        }

        span {
            line-height: 1.3;
            color: ${({theme}) => theme.colors.font.main};
        }
    }

    // 주의 사항
    & > div:last-of-type {
        background-color: ${({theme}) => theme.colors.bg.main};
        border-radius: 12px;
        padding: 4px 12px;
        margin-bottom: 28px;

        ul {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin: 0;
            padding: 12px;


            li {
                list-style: disc;
                text-wrap: wrap;
                word-break: manual;
                color: ${({theme}) => theme.colors.font.main};
                line-height: 1.3;
            }

            & > li:last-of-type {
                color: ${({theme}) => theme.colors.font.danger};
            }
        }
    }
`;