import styled from "@emotion/styled";

export const HistoryListItemWrapper = styled.div`
    margin: 8px 24px;
`;

export const UsageControlWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 28px;
    position: sticky;
    top: 72px;
    gap: 12px;
    background-color: ${({theme}) => theme.colors.bg.sub};

    & > select {
        margin-left: auto;
        padding: 4px;
        border-radius: 6px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
        background-color: ${({theme}) => theme.colors.bg.main};

        &:focus {
            outline: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
`;