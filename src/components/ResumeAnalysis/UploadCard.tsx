// client\src\components\UploadCard.tsx
import { Upload, FileText, Cloud, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

interface UploadCardProps {
  onUpload: (file: File) => void;
}

export const UploadCard = ({ onUpload }: UploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  return (
    <Card className="rounded-2xl p-8 border shadow-sm">
      <div
        className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-input hover:border-primary/50"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
            <Cloud className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-card-foreground mb-3">Upload Your Resume</h3>
            <p className="text-muted-foreground mb-2">
              Drag and drop your PDF resume here
            </p>
            {/* <p className="text-sm text-yellow-500 mb-4">
              Maximum file size: 10MB
            </p> */}

            <div className="flex items-center justify-center gap-2">
              <CircleAlert className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-orange-500">
                Supports PDF files only
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
    </Card>
  );
};