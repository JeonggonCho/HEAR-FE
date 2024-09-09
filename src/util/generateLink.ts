const generateLink = (text: string): string => {
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)(?!\S)/g;

    return text.replace(urlPattern, (url) => {
        const createdLink = url.startsWith("http") ? url : `http://${url}`;
        return `<a href="${createdLink}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
};

export default generateLink;
