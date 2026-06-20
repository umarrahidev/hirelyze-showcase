import toast from "react-hot-toast";

// Helper to download content as PDF
export const downloadAsPDF = async (content: string, filename: string) => {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    let y = 20; // Start Y position
    const lineHeight = 10;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const maxLineWidth = pageWidth - margin * 2;

    const addText = (
      text: string,
      fontSize: number,
      isBold: boolean = false
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("roboto", isBold ? "bold" : "normal");

      const lines = doc.splitTextToSize(text, maxLineWidth);

      // Check for page break - simple check, might need more robust handling for very long logic
      // But following the user's provided logic which commented out page add
    //   if (
    //     y + lines.length * lineHeight >
    //     doc.internal.pageSize.height - margin
    //   ) {
    //     doc.addPage();
    //     y = 20;
    //   }

      doc.text(lines, margin, y);
      y += lines.length * lineHeight + 5;
    };

    if (content) {
      addText(content, 11);
    } else {
      addText("No content available.", 11);
    }

    doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to download PDF");
  }
};

// Helper to download content as Text
export const downloadAsText = (content: string, filename: string) => {
  try {
    if (!content) {
      toast.error("No content to download");
      return;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Text file downloaded successfully!");
  } catch (error) {
    console.error("Text download error:", error);
    toast.error("Failed to download text file");
  }
};
