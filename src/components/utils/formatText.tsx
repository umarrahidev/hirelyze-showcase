// utils/formatText.tsx
export const formatText = (text: string) => {
    if (!text) return "";

    // Split by lines and process each
    return text.split("\n").map((line, index) => {
        // Handle headers (## or ###)
        if (line.startsWith("### ")) {
            return (
                <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
                    {line.replace("### ", "")}
                </h3>
            );
        }
        if (line.startsWith("## ")) {
            return (
                <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                    {line.replace("## ", "")}
                </h2>
            );
        }
        if (line.startsWith("# ")) {
            return (
                <h1 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {line.replace("# ", "")}
                </h1>
            );
        }

        // Handle bold text (**text**)
        const boldRegex = /\*\*(.*?)\*\*/g;
        let boldIndex = 0;
        const boldParts = line.split(boldRegex).map((part, i) => {
            if (i % 2 === 1) {
                return <span key={boldIndex++} className="font-bold">{part}</span>;
            }
            return part;
        });

        // Handle italic text (*text*)
        const italicRegex = /\*(.*?)\*/g;
        let italicIndex = 0;
        const italicParts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        
        for (const part of boldParts) {
            if (typeof part === 'string') {
                let match;
                let lastItalicIndex = 0;
                
                while ((match = italicRegex.exec(part)) !== null) {
                    const before = part.substring(lastItalicIndex, match.index);
                    const italicText = match[1];
                    
                    if (before) italicParts.push(before);
                    italicParts.push(<em key={italicIndex++} className="italic">{italicText}</em>);
                    
                    lastItalicIndex = match.index + match[0].length;
                }
                
                const remaining = part.substring(lastItalicIndex);
                if (remaining) italicParts.push(remaining);
            } else {
                italicParts.push(part);
            }
        }

        // Handle bullet points
        if (line.trim().startsWith("- ")) {
            return (
                <li key={index} className="ml-4 mb-1 list-disc">
                    {italicParts}
                </li>
            );
        }

        // Handle numbered lists
        // if (/^\d+\.\s/.test(line.trim())) {
        //     return (
        //         <li key={index} className="ml-4 mb-1 list-decimal">
        //             {italicParts}
        //         </li>
        //     );
        // }

        // Regular paragraph
        return line.trim() ? (
            <p key={index} className="mb-2">
                {italicParts}
            </p>
        ) : (
            <br key={index} />
        );
    });
};