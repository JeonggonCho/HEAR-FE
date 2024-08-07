import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 140px;
    border-radius: 16px;
    background-color: white;
    padding: 18px;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

        h3 {
            color: #2B65FC;
        }

        svg {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    h3 {
        line-height: 1.5;
        margin: 0;
    }
    
    & > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: end;
    }

    svg {
        fill: #999999;
        transition: all 0.2s ease-in-out 0s;
    }
`;