
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AdviceCardProps {
  title: string;
  description: string;
  impact: string;
  actionLabel?: string;
  onAction?: () => void;
  priority?: "high" | "medium" | "low";
}

const AdviceCard: React.FC<AdviceCardProps> = ({
  title,
  description,
  impact,
  actionLabel = "Learn More",
  onAction,
  priority = "medium"
}) => {
  // Determine color based on priority
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500";
      case "medium":
        return "border-l-4 border-l-amber-500";
      case "low":
        return "border-l-4 border-l-taxgreen";
      default:
        return "border-l-4 border-l-taxgray-400";
    }
  };

  return (
    <Card className={`shadow-sm mb-4 hover:shadow-md transition-shadow ${getPriorityColor()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription className="text-taxgray-600 font-medium">
          Potential impact: {impact}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-taxgray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-taxblue hover:text-taxblue-dark flex items-center text-sm font-medium"
          onClick={onAction}
        >
          {actionLabel} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdviceCard;
