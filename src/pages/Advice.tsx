
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AdviceCard from "@/components/AdviceCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, DollarSign } from "lucide-react";

const Advice = () => {
  const [selectedTab, setSelectedTab] = useState("insights");

  const taxInsights = [
    {
      title: "Potential Child Tax Credit",
      description: "Based on your dependents information, you may qualify for the Child Tax Credit worth up to $2,000 per qualifying child.",
      impact: "$4,000 potential savings",
      priority: "high" as const
    },
    {
      title: "Student Loan Interest Deduction",
      description: "You paid $2,500 in student loan interest but didn't claim this deduction. This could reduce your taxable income.",
      impact: "$550 potential savings",
      priority: "medium" as const
    },
    {
      title: "Retirement Contribution Opportunity",
      description: "Increasing your 401(k) contributions by 5% could save you approximately $1,200 in taxes next year.",
      impact: "$1,200 future savings",
      priority: "medium" as const
    },
    {
      title: "Home Office Deduction",
      description: "As a self-employed individual, you may be eligible to deduct home office expenses.",
      impact: "$800 potential savings",
      priority: "low" as const
    }
  ];

  const summaryData = {
    grossIncome: 85000,
    taxableIncome: 68500,
    totalTax: 12750,
    refund: 1842,
    effectiveTaxRate: "15.0%",
    keyDeductions: [
      { name: "Standard Deduction", amount: 12950 },
      { name: "Retirement Contributions", amount: 3500 }
    ]
  };

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-taxgray-800">Tax Insights</h1>
        <p className="text-taxgray-600 text-sm">
          Based on your tax document analysis
        </p>
      </div>

      <Tabs defaultValue="insights" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="bg-taxgreen-light p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-taxgreen mr-2" />
              <h3 className="font-medium">Potential Tax Savings</h3>
            </div>
            <p className="text-lg font-bold">$6,550</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-taxgray-800">Recommendations</h3>
              <Badge variant="outline" className="bg-taxblue-light text-taxblue border-none">
                4 Actions
              </Badge>
            </div>
            
            {taxInsights.map((insight, index) => (
              <AdviceCard
                key={index}
                title={insight.title}
                description={insight.description}
                impact={insight.impact}
                priority={insight.priority}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-taxgray-200">
                  <span className="text-taxgray-600">Gross Income:</span>
                  <span className="font-semibold">${summaryData.grossIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-taxgray-200">
                  <span className="text-taxgray-600">Taxable Income:</span>
                  <span className="font-semibold">${summaryData.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-taxgray-200">
                  <span className="text-taxgray-600">Total Tax:</span>
                  <span className="font-semibold">${summaryData.totalTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-taxgray-200">
                  <span className="text-taxgray-600">Refund Amount:</span>
                  <span className="font-semibold text-taxgreen">${summaryData.refund.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-taxgray-200">
                  <span className="text-taxgray-600">Effective Tax Rate:</span>
                  <span className="font-semibold">{summaryData.effectiveTaxRate}</span>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium text-taxgray-800 mb-2">Key Deductions</h4>
                  {summaryData.keyDeductions.map((deduction, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm text-taxgray-600">{deduction.name}:</span>
                      <span className="font-medium">${deduction.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-taxblue mr-2" />
                    <h4 className="font-medium text-taxgray-800">Important Dates</h4>
                  </div>
                  <div className="bg-taxgray-50 p-3 rounded-md">
                    <p className="text-sm mb-1">
                      <span className="font-medium">Tax Filing Deadline:</span> April 15, 2025
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Estimated Tax Payments:</span> June 15, 2024
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Advice;
