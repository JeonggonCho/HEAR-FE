import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 132px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 18px;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${({theme}) => theme.colors.bg.main};

    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
        
        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
        
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }

    h3 {
        font-size: 1.25rem;
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        margin: 0 0 8px;
        transition: all 0.2s ease-in-out 0s;
    }

    &:active {
        transform: scale(0.9);
    }
    
    span {
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    h4 {
        font-size: 1.15rem;
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        margin: 0;
    }
    
    svg {
        color: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
`;