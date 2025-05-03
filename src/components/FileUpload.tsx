
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  // Handle the file
  const handleFile = (file: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, JPG, or PNG file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    // Pass the file to parent component
    onFileSelected(file);
  };
  
  // Handle button click
  const handleButtonClick = () => {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };
  
  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className="w-full"
    >
      <Card className={`border-2 border-dashed p-6 text-center transition-colors ${dragActive ? 'border-taxblue bg-taxblue-light' : 'border-taxgray-300'}`}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-taxblue-light p-4 rounded-full">
            <Upload className="w-10 h-10 text-taxblue" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Upload Tax Document</h3>
            <p className="text-taxgray-500 text-sm mt-1">
              Drag & drop your tax document, or click to browse
            </p>
            <p className="text-taxgray-400 text-xs mt-1">
              Supports PDF, JPG, PNG (max 10MB)
            </p>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
            disabled={isLoading}
          />
          <Button 
            onClick={handleButtonClick}
            disabled={isLoading}
            className="bg-taxblue hover:bg-taxblue-dark transition-colors"
          >
            {isLoading ? "Uploading..." : "Select File"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FileUpload;
