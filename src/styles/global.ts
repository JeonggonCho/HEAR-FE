import { css } from "@emotion/react"

export const global = (theme: any) => css`
    .app {
        transition: all 0.2s ease-in-out 0s;
        background-color: ${theme.colors.bg.main};
        color: ${theme.colors.font.main};
    }
`;