import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            font: {
                main: string;
                sub: string;
                placeholder: string;
                primary: string;
                danger: string;
            };
            bg: {
                main: string;
                sub: string;
                shadow: string;
                splash: string;
            };
            line: {
                main: string;
                primary: string,
                second: string,
                danger: string,
            },
            icon: {
                fill: string
            },
            button: {
                primary: string,
                approval: string,
                second: string,
                third: string,
                danger: string,
                green: string,
            },
            chart: {
                primary: string,
                green: string,
                danger: string,
                orange: string,
                purple: string,
            },
        },
        fontSize: {
            desktop: {
                small: string
                body: string
                title: string
            },
            mobile: {
                small: string
                body: string
                title: string
            },
        },
    }
}