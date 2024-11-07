import styled from "@emotion/styled";

export const Container = styled.form`
    display: flex;
    gap: 12px;
    margin: 28px 24px 24px;
    padding: 12px 0;
    position: sticky;
    top: 72px;
    background-color: ${({theme}) => theme.colors.bg.sub};
    z-index: 3;
    
    & > div:first-of-type {
        margin-top: 5px;
    }
`;

export const TextareaWrapper = styled.div<{textLength: number}>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    height: ${({textLength}) => textLength > 0 ? "auto" : "40px"};
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 8px;
    padding: 6px;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colors.line.main};

    &:focus-within {
        outline: 1px solid ${({theme}) => theme.colors.line.primary};
        height: auto;
    }
    
    & > div {
        textarea {
            padding: 0;
            background: none;
            border-radius: 0;
            width: 100%;
            border: none;
            
            &:focus {
                outline: none;
            }
        }
    }
    
    button {
        margin-left: auto;
        padding: 2px 10px;
    }
`;

export const CommentListWrapper = styled.div`
    margin: 0 24px;
`;

export const EmptyMessage = styled.p`
    margin-top: 56px;
    text-align: center;
    color: ${({theme}) => theme.colors.font.sub};
`;