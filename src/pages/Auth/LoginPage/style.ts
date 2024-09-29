import styled from "@emotion/styled";

export const Container = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    
    & > div:nth-of-type(2) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 32px;

        div {
            width: 64px;
            height: 64px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        
        h3 {
            font-size: 1.5rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.primary};
            margin: 0;
        }
    }
`;