import styled from "@emotion/styled";


export const UsernameWrapper = styled.h3`
    margin: 0;
    font-weight: 500;
`;

export const TableWrapper = styled.div`
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    overflow: hidden;
    margin-bottom: 12px;
`;

export const FieldWrapper = styled.div`
    display: flex;
    height: 100%;

    & > div:first-of-type {
        width: 82px !important;
        min-width: 82px !important;
        padding: 14px 16px 14px 10px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        font-size: 1rem;
        line-height: 1.3;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: wrap;
    }

    & > span:first-of-type {
        font-size: 1rem;
        margin: 12px;
        word-break: break-all;
        text-wrap: wrap;
        color: ${({theme}) => theme.colors.font.main};
        line-height: 1.2;
    }

    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;

export const WarningWrapper = styled.div`
    height: 100%;
    display: flex;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};

    & > div:first-of-type {
        width: 82px;
        min-width: 82px;
        padding: 20px 16px 0 12px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: nowrap;
    }

    & > div:nth-of-type(2) {
        padding: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        & > span:first-of-type {
            font-size: 1rem;
            word-break: break-all;
            text-wrap: wrap;
            color: ${({theme}) => theme.colors.font.main};
            line-height: 1.2;
            flex-grow: 1;
        }
    }

    & > form:first-of-type {
        padding: 12px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        & > div:last-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
`;

export const PassWrapper = styled.div`
    height: 100%;
    display: flex;

    & > div:first-of-type {
        width: 82px;
        min-width: 82px;
        padding: 20px 16px 0 12px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: nowrap;
    }

    & > div:nth-of-type(2) {
        padding: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > span:first-of-type {
            font-size: 1rem;
            word-break: break-all;
            text-wrap: wrap;
            color: ${({theme}) => theme.colors.font.main};
            line-height: 1.2;
            flex-grow: 1;
        }
    }
`;

export const PassTag = styled.span<{pass: boolean}>`
    color: ${({theme, pass}) => pass ? theme.colors.font.primary : theme.colors.font.danger} !important;
`;
