const generateLinksAndLineBreaks = (text: string): string => {
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)(?!\S)/g;

    const textWithLinks = text.replace(urlPattern, (url) => {
        const createdLink = url.startsWith("http") ? url : `http://${url}`;
        return `<a href="${createdLink}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return textWithLinks.replace(/\n/g, "<br>");
};

export default generateLinksAndLineBreaks;
