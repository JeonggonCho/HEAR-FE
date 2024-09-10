import {Theme} from "@emotion/react";

export const lightTheme:Theme = {
    colors: {
        font: {
            main: "black",
            sub: "#999999",
            placeholder: "#E2E2E2",
            primary: "#2B65FC",
            danger: "#FF8585",
        },
        bg: {
            main: "white",
            sub: "#F2F4F6",
            shadow: "rgba(0, 0, 0, 0.1)",
            splash: "linear-gradient(150deg, #E2E3F7 8.51%, #FFFFFF 35.48%, #C6D6FF 61.62%, #EEFAFF 84.02%)",
        },
        line: {
            main: "#E2E2E2",
            primary: "#2B65FC",
            second: "#999999",
            danger: "#FF8585",
        },
        icon: {
            fill: "#C7CBCF",
        },
        button: {
            primary: "#2B65FC",
            approval: "#E1E9FF",
            second: "#C7CBCF",
            third: "#F2F3F5",
            danger: "#FFEAEA",
        }
    },
};

export const darkTheme:Theme = {
    colors: {
        font: {
            main: "white",
            sub: "#999999",
            placeholder: "#46464F",
            primary: "#2B65FC",
            danger: "#E07070",
        },
        bg: {
            main: "#1E1E24",
            sub: "#17171C",
            shadow: "rgba(0, 0, 0, 0.3)",
            splash: "linear-gradient(164.81deg, #2E2E41 8.51%, #000000 36.17%, #38466B 63.83%, #222729 91.49%)",
        },
        line: {
            main: "#292932",
            primary: "#1949C6",
            second: "#999999",
            danger: "#E07070",
        },
        icon: {
            fill: "#4B4B53",
        },
        button: {
            primary: "#1949C6",
            approval: "#252C40",
            second: "#3D3D43",
            third: "#2C2C35",
            danger: "#492F2F",
        }
    },
};