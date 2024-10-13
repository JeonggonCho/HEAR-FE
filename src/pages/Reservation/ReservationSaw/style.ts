import styled from "@emotion/styled";

export const Container = styled.div<{tooltip: boolean}>`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }

    form {
        padding: 24px;
        background-color: ${({theme}) => theme.colors.bg.main};
        display: flex;
        flex-direction: column;
        gap: ${({tooltip}) => tooltip ? "48px" : "32px"};
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.bg.sub};

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin: 24px 0;
    }
`;

export const TimeWrapper = styled.div<{tooltip: boolean}>`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: ${({tooltip}) => tooltip ? "-16px" : "0"};
    margin-top: ${({tooltip}) => tooltip ? "48px" : "0"};
    
    & > div:first-of-type {
        position: relative;

        & > label {
            margin-left: 6px;
            color: ${({theme}) => theme.colors.font.sub};
        }

        & > div:first-of-type {
            width: 260px;
            display: flex;
            gap: 8px;
            position: absolute;
            padding: 8px;
            border-radius: 8px;
            bottom: 36px;
            left: 10px;
            background-color: ${({theme}) => theme.colors.button.approval};
            z-index: 2;

            &:after {
                position: absolute;
                content: "";
                border-top: 12px solid ${({theme}) => theme.colors.button.approval};
                border-left: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 8px solid transparent;
                bottom: -18px;
                left: 30px;
            }

            & > span:first-of-type {
                text-wrap: wrap;
                word-break: manual;
                font-size: 0.9rem;
                line-height: 1.5;
                color: ${({theme}) => theme.colors.font.primary};
            }

            svg {
                width: 20px;
                height: 20px;
                fill: ${({theme}) => theme.colors.font.primary};
                transition: all 0.2s ease-in-out 0s;
                cursor: pointer;

                &:hover {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }

    & > div:last-of-type {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;

        select {
            width: 100%;
            padding: 8px;
            font-size: 1rem;
            border-radius: 6px;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.main};
            color: ${({theme}) => theme.colors.font.main};

            &:focus {
                outline: ${({theme}) => theme.colors.line.primary};
            }
        }
    }
`;

export const ErrorMessage = styled.span`
    font-size: 0.9rem;
    display: inline-block;
    color: ${({theme}) => theme.colors.font.danger};
    margin-left: 4px;
    margin-top: 4px;
    
    & + & {
        margin-bottom: 8px;
    }
`;