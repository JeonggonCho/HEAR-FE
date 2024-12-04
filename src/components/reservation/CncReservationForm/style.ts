import styled from "@emotion/styled";


export const CncCheckWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > div:first-of-type {
        width: fit-content;
        margin-left: 4px;

        & > input {
            display: none;
        }

        & > label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            color: ${({theme}) => theme.colors.font.main};
            cursor: pointer;

            & > div:first-of-type {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                border: 1px solid ${({theme}) => theme.colors.font.sub};

                svg {
                    margin-top: 2px;
                    fill: ${({theme}) => theme.colors.line.main};

                }
            }
        }

        & > input[type="checkbox"]:checked + label > div:first-of-type {
            border: 2px solid ${({theme}) => theme.colors.font.primary};
            background-color: ${({theme}) => theme.colors.button.primary};
            
            svg {
                fill: white;
            }
        }
    }

    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        padding: 16px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        border-radius: 12px;

        & > span {
            font-size: 0.9rem;
            display: inline-block;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > p {
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
            color: ${({theme}) => theme.colors.font.main};
            text-wrap: pretty;
            word-break: break-word;
        }
    }
    
    & > p:last-of-type {
        margin: 0 0 0 6px;
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.danger};
    }
`;