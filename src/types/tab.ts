import React from "react";

// tab 메뉴
export interface ITab {
    name: string;
    content?: React.ReactElement;
    path?: string;
}