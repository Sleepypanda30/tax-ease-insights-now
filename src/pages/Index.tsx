
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, UploadCloud, MessageSquare, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout hideNav={true}>
      <div className="flex flex-col items-center h-full">
        {/* Hero section */}
        <div className="text-center py-10 space-y-4">
          <div className="bg-taxblue-light p-3 rounded-full inline-block mb-2">
            <FileText className="h-10 w-10 text-taxblue" />
          </div>
          <h1 className="text-3xl font-bold text-taxgray-800">TaxEase</h1>
          <p className="text-taxgray-600 max-w-xs mx-auto">
            Upload your tax transcript and get personalized insights powered by AI
          </p>
          <Button 
            className="bg-taxblue hover:bg-taxblue-dark mt-4 px-8 py-6 text-lg"
            onClick={() => navigate("/upload")}
          >
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="w-full px-4 py-6 bg-taxgray-50 rounded-t-3xl mt-4 flex-grow">
          <h2 className="text-xl font-semibold text-center mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <FeatureCard
              icon={<UploadCloud className="h-6 w-6 text-taxblue" />}
              title="Upload Your Tax Document"
              description="Simply upload your tax transcript, W-2, or 1099 form"
            />
            
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-taxgreen" />}
              title="Secure AI Analysis"
              description="Our AI securely analyzes your document to find opportunities"
              className="animate-delay-300"
            />
            
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-amber-500" />}
              title="Get Personalized Insights"
              description="Receive tailored tax insights and potential savings"
              className="animate-delay-600"
            />
            
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-purple-500" />}
              title="Ask Questions"
              description="Chat with our AI assistant about your specific tax situation"
              className="animate-delay-900"
            />
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              className="bg-taxblue hover:bg-taxblue-dark"
              onClick={() => navigate("/upload")}
            >
              Start Now
            </Button>
            <p className="text-xs text-taxgray-500 mt-4">
              Your data is securely processed and never stored.
              <br />Powered by AWS and NVIDIA technology.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => {
  return (
    <Card className={`p-4 border border-taxgray-200 animate-slide-up ${className}`}>
      <div className="flex items-start">
        <div className="bg-taxgray-100 p-2 rounded-full mr-4">{icon}</div>
        <div>
          <h3 className="font-medium text-taxgray-800">{title}</h3>
          <p className="text-sm text-taxgray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default Index;
