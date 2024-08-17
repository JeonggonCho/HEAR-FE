import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid white;
    
    h3 {
        margin: 0;
    }
    
    & > div:first-child {
        display: flex;
        align-items: center;
        gap: 10px;
        
        img {
            width: 28px;
        }
    }
    
    & > div:last-child {
        display: flex;
        justify-content: space-between;
        
        div {
            display: flex;
            align-items: end;
            gap: 8px;

            span {
                margin-bottom: 4px;
            }
            
            & > span:last-child {
                font-size: 14px;
                color: #999999;
                margin-bottom: 5px;
            }
        }
    }
`;