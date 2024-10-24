import styled from "@emotion/styled";

export const Container = styled.p<{type: "error" | "approval"}>`
    font-size: 0.9rem;
    margin: 0 0 0 6px;
    color: ${({theme, type}) => type === "approval"? theme.colors.button.green : theme.colors.font.danger};
`;