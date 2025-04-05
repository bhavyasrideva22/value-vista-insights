
import React from "react";
import Layout from "@/components/Layout";
import LTVCalculator from "@/components/calculators/LTVCalculator";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Customer Lifetime Value Calculator
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Make data-driven decisions by understanding how valuable your customers 
            are throughout their entire relationship with your business.
          </p>
        </div>
        
        <Separator className="my-8" />
        
        <LTVCalculator />
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-12">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Make Better Business Decisions with LTV Analysis
          </h2>
          
          <div className="prose prose-green max-w-none">
            <p>
              In today's competitive market landscape, understanding the long-term value of your customers 
              is essential for sustainable growth. The Customer Lifetime Value (LTV) metric provides a 
              comprehensive view of customer relationships beyond single transactions, helping you prioritize 
              acquisition channels, optimize marketing spending, and identify your most valuable customer segments.
            </p>
            
            <h3>Key Benefits of LTV Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-cream rounded-lg p-5">
                <h4 className="font-semibold text-primary mb-2">Informed Acquisition Strategy</h4>
                <p className="text-sm">
                  By understanding how much revenue customers generate over their lifetime, you can set appropriate 
                  customer acquisition costs and identify which marketing channels deliver the highest-value customers.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-5">
                <h4 className="font-semibold text-primary mb-2">Targeted Retention Efforts</h4>
                <p className="text-sm">
                  LTV analysis helps you identify which customer segments are worth investing in with retention 
                  programs, loyalty initiatives, and personalized engagement strategies.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-5">
                <h4 className="font-semibold text-primary mb-2">Product Development Focus</h4>
                <p className="text-sm">
                  Understanding what drives customer value helps prioritize product features and improvements 
                  that will resonate with your most valuable customer segments.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-5">
                <h4 className="font-semibold text-primary mb-2">Accurate Growth Forecasting</h4>
                <p className="text-sm">
                  LTV provides a foundation for reliable revenue projections, helping you make confident 
                  decisions about business expansion and investment opportunities.
                </p>
              </div>
            </div>
            
            <h3>How to Improve Your Customer Lifetime Value</h3>
            
            <p>
              Once you've calculated your Customer Lifetime Value using our calculator, consider these 
              strategies to increase this crucial metric:
            </p>
            
            <ol>
              <li>
                <strong>Enhance customer onboarding</strong> to ensure new customers quickly realize the 
                value of your product or service, reducing early churn.
              </li>
              <li>
                <strong>Implement a customer loyalty program</strong> that rewards repeat purchases and 
                long-term relationships with your brand.
              </li>
              <li>
                <strong>Focus on upselling and cross-selling</strong> to increase the average purchase value 
                of each transaction.
              </li>
              <li>
                <strong>Gather and act on customer feedback</strong> to continuously improve your offerings 
                and address pain points that might cause customers to leave.
              </li>
              <li>
                <strong>Create personalized communication strategies</strong> that speak directly to the 
                needs and preferences of different customer segments.
              </li>
            </ol>
            
            <p>
              Regular LTV analysis should be a cornerstone of your business strategy. By revisiting this 
              calculation quarterly or annually, you can track the effectiveness of your customer-focused 
              initiatives and make data-driven adjustments to your business strategy.
            </p>
            
            <h3>Start Your LTV Analysis Today</h3>
            
            <p>
              Use our free Customer Lifetime Value Calculator above to gain valuable insights into your 
              business. Enter your data, analyze the results, and download or email your personalized 
              report to share with your team. If you have questions about interpreting your results or 
              implementing strategies to improve your LTV, our team of business analysts is here to help.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
