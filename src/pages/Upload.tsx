
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import { toast } from "@/hooks/use-toast";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState("Preparing document");
  const navigate = useNavigate();
  
  // Handle file upload
  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: "Your document has been uploaded and is now being processed.",
      });
      
      // Start processing
      startProcessing();
    }, 1500);
  };
  
  // Simulate processing with progress updates
  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const statusMessages = [
      "Preparing document for analysis",
      "Extracting text with OCR",
      "Identifying tax information",
      "Analyzing tax data",
      "Finding potential savings",
      "Generating personalized insights",
      "Finalizing results"
    ];
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Navigate to advice page when done
        setTimeout(() => {
          navigate("/advice");
        }, 500);
        
        return;
      }
      
      // Update progress
      currentProgress += Math.random() * 5 + 1;
      currentProgress = Math.min(currentProgress, 100);
      setProcessingProgress(currentProgress);
      
      // Update status message based on progress
      const statusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusMessages.length),
        statusMessages.length - 1
      );
      setProcessingStatus(statusMessages[statusIndex]);
    }, 800);
  };
  
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-taxgray-800">Upload Document</h1>
          <p className="text-taxgray-600 text-sm">
            Upload your tax transcript, W-2, or 1099 form to get started
          </p>
        </div>
        
        {isProcessing ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ProcessingAnimation 
              status={processingStatus} 
              progress={processingProgress} 
            />
          </div>
        ) : (
          <div className="flex-1">
            <FileUpload 
              onFileSelected={handleFileSelected} 
              isLoading={isUploading}
            />
            
            <div className="mt-6 p-4 bg-taxgray-50 rounded-lg">
              <h3 className="text-sm font-medium text-taxgray-700 mb-2">Supported documents</h3>
              <ul className="text-sm text-taxgray-600 space-y-1 list-disc pl-5">
                <li>IRS tax transcript</li>
                <li>Form 1040 (U.S. Individual Income Tax Return)</li>
                <li>Form W-2 (Wage and Tax Statement)</li>
                <li>Form 1099 (Miscellaneous Income)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Upload;
