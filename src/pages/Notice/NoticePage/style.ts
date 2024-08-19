import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    
    table {
        width: 100%;
        
        thead {
            background-color: #F0F4FF;
        }
        
        tbody {
            background-color: white;
            
            tr {
                & > td:first-child {
                    text-align: center;
                }

                & > td:nth-child(3) {
                    text-align: center;
                }
            }
        }
    }
`;