const isNumber = (value: string) => {
    return /^[0-9]+$/.test(value);
};

export default isNumber;