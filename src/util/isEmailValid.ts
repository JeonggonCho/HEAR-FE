import {EMAIL_REGEX} from "@constants/regex.ts";

const isEmailValid = (value: string): boolean => {
    return EMAIL_REGEX.test(value);
};

export default isEmailValid;
