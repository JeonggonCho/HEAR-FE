import styled from "@emotion/styled";


export const TableHeadsWrapper = styled.div`
    background-color: ${({theme}) => theme.colors.button.third};
    padding: 12px 24px;
    margin-bottom: 8px;
    position: sticky;
    top: 126px;
    color: ${({theme}) => theme.colors.font.sub};
    font-size: 0.9rem;
    z-index: 3;

    span:first-of-type {
        width: 25%;
    }

    span:nth-of-type(2) {
        width: 20%;
        text-align: center;
    }

    span:nth-of-type(3) {
        width: 20%;
        text-align: center;
    }

    span:nth-of-type(4) {
        width: 20%;
        text-align: center;
    }

    span:nth-of-type(5) {
        width: 15%;
        text-align: center;
    }
`;

export const UserControlWrapper = styled.div<{usernameInputText: string}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px 8px 24px;
    position: sticky;
    top: 72px;
    background-color: ${({theme}) => theme.colors.bg.main};
    z-index: 3;
        
    & > span:first-of-type {
        font-size: 1rem;
    }
        
    & > form:first-of-type {
        display: flex;
        align-items: center;
        gap: 8px;
            
        // 유저 이름 검색 관련
        & > div:first-of-type {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.main};
            border-radius: 8px;
            
            &:focus-within {
                border-color: ${({theme}) => theme.colors.line.primary};
            }
                
            input {
                border: none;
                height: 36px;
                width: 128px;
                margin: 0;
                    
                &:focus {
                    outline: none;
                }
            }

            & > div:last-of-type {
                width: 24px;
                height: 24px;
                visibility: ${({usernameInputText}) => usernameInputText !== "" ? "block" : "hidden"};
                    
                svg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    fill: ${({theme}) => theme.colors.font.placeholder};
                    cursor: pointer;
                    transition: all 0.2s ease-in-out 0s;

                    &:hover {
                        fill: ${({theme}) => theme.colors.font.main};
                    }
                }
            }
                
            button {
                width: 36px;
                height: 36px;
                background-color: ${({theme}) => theme.colors.bg.main};
                padding: 5px;

                svg {
                    fill: ${({theme}) => theme.colors.font.sub};
                    cursor: pointer;
                    transition: all 0.2s ease-in-out 0s;

                    &:hover {
                        fill: ${({theme}) => theme.colors.font.main};
                    }
                }
            }
        }

        // 필터 관련
        & > div:last-of-type {
            cursor: pointer;
            position: relative;
                
            svg {
                width: 32px;
                height: 32px;
                fill: ${({theme}) => theme.colors.font.sub};
                transition: all 0.2s ease-in-out 0s;
                    
                &:hover {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }
`;

export const UserListItem = styled.div<{pass: boolean}>`
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 20px 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    & > span:first-of-type {
        width: 25%;
        line-height: 1.3;
    }

    & > span:nth-of-type(2) {
        width: 20%;
        text-align: center;
    }

    & > span:nth-of-type(3) {
        width: 20%;
        text-align: center;
    }

    & > span:nth-of-type(4) {
        width: 20%;
        text-align: center;
        color: ${({pass, theme}) => pass ? theme.colors.font.primary : theme.colors.font.danger};
    }

    & > div:first-of-type {
        width: 15%;
    }
`;