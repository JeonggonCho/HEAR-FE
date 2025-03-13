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
            fill: "#999999",
        },
        button: {
            primary: "#2B65FC",
            approval: "#E1E9FF",
            second: "#C7CBCF",
            third: "#F2F3F5",
            danger: "#FFEAEA",
            green: "#2ED058",
        },
        chart: {
            primary: "#2B65FC",
            green: "#2ED058",
            danger: "#FF3D3D",
            orange: "#FFA500",
            purple: "#9B59B6",
        },
    },
    fontSize: {
        desktop: {
            small: "0.875rem",  // 14px
            body: "1rem",        // 16px
            title: "1.25rem",    // 20px
        },
        mobile: {
            small: "0.75rem",    // 12px
            body: "0.875rem",    // 14px
            title: "1rem",       // 16px
        },
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
            main: "#1F1F27",
            sub: "#17171C",
            shadow: "rgba(0, 0, 0, 0.3)",
            splash: "linear-gradient(164.81deg, #2E2E41 8.51%, #000000 36.17%, #38466B 63.83%, #222729 91.49%)",
        },
        line: {
            main: "#2E2E39",
            primary: "#1949C6",
            second: "#999999",
            danger: "#E07070",
        },
        icon: {
            fill: "#999999",
        },
        button: {
            primary: "#1949C6",
            approval: "#252C40",
            second: "#3D3D43",
            third: "#2C2C35",
            danger: "#492F2F",
            green: "#2CAD4E",
        },
        chart: {
            primary: "#1949C6",
            green: "#2CAD4E",
            danger: "#FF6F61",
            orange: "#FF8C00",
            purple: "#6A5ACD",
        },
    },
    fontSize: {
        desktop: {
            small: "0.875rem",  // 14px
            body: "1rem",        // 16px
            title: "1.25rem",    // 20px
        },
        mobile: {
            small: "0.75rem",    // 12px
            body: "0.875rem",    // 14px
            title: "1rem",       // 16px
        },
    },
};