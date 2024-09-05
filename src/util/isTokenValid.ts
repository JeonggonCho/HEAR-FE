const isTokenValid = (token: string | null) => {
    if (!token) {
        return false;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp > now;
};

export default isTokenValid;