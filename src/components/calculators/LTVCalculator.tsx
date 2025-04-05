
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail, IndianRupee } from "lucide-react";
import LTVChart from "./LTVChart";
import EmailModal from "./EmailModal";
import { generatePDF } from "@/lib/pdfGenerator";

interface LTVData {
  averagePurchaseValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  acquisitionCost: number;
  ltv: number;
  roi: number;
}

const LTVCalculator: React.FC = () => {
  const { toast } = useToast();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [calculatedLTV, setCalculatedLTV] = useState<number | null>(null);
  const [calculatedROI, setCalculatedROI] = useState<number | null>(null);
  const [ltvInputs, setLtvInputs] = useState({
    averagePurchaseValue: 2000,
    purchaseFrequency: 4,
    customerLifespan: 3,
    acquisitionCost: 1500,
  });
  const [ltvData, setLtvData] = useState<LTVData[]>([]);
  const [activeTab, setActiveTab] = useState("calculator");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLtvInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateLTV = () => {
    const { averagePurchaseValue, purchaseFrequency, customerLifespan, acquisitionCost } = ltvInputs;
    
    // Basic formula: LTV = Average Purchase Value × Purchase Frequency × Customer Lifespan
    const ltv = averagePurchaseValue * purchaseFrequency * customerLifespan;
    const roi = ((ltv - acquisitionCost) / acquisitionCost) * 100;
    
    setCalculatedLTV(ltv);
    setCalculatedROI(roi);

    // Generate data for chart
    const newData = [];
    for (let year = 1; year <= customerLifespan; year++) {
      newData.push({
        averagePurchaseValue,
        purchaseFrequency,
        customerLifespan,
        acquisitionCost,
        ltv: averagePurchaseValue * purchaseFrequency * year,
        roi: ((averagePurchaseValue * purchaseFrequency * year - acquisitionCost) / acquisitionCost) * 100
      });
    }
    setLtvData(newData);

    toast({
      title: "LTV Calculated Successfully",
      description: `Customer Lifetime Value: ₹${ltv.toLocaleString()}, ROI: ${roi.toFixed(2)}%`,
    });
  };

  const handleDownload = async () => {
    if (calculatedLTV === null) {
      toast({
        title: "No data to download",
        description: "Please calculate LTV first",
        variant: "destructive",
      });
      return;
    }

    try {
      await generatePDF({
        fileName: "LTV_Calculator_Results.pdf",
        ltvData: {
          ...ltvInputs,
          ltv: calculatedLTV,
          roi: calculatedROI || 0,
        },
      });

      toast({
        title: "PDF Downloaded",
        description: "Your LTV calculation results have been downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was a problem generating your PDF",
        variant: "destructive",
      });
    }
  };

  const handleEmailOpen = () => {
    if (calculatedLTV === null) {
      toast({
        title: "No data to email",
        description: "Please calculate LTV first",
        variant: "destructive",
      });
      return;
    }
    setShowEmailModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl">Customer Lifetime Value (LTV) Calculator</CardTitle>
          <CardDescription className="text-gray-100">
            Calculate how valuable customers are to your business over their entire relationship
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="about">About LTV</TabsTrigger>
              <TabsTrigger value="guide">How to Use</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-primary">Input Values</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="averagePurchaseValue" className="text-charcoal">
                        Average Purchase Value (₹)
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="averagePurchaseValue"
                          name="averagePurchaseValue"
                          type="number"
                          className="pl-10"
                          value={ltvInputs.averagePurchaseValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purchaseFrequency" className="text-charcoal">
                        Purchase Frequency (per year)
                      </Label>
                      <Input
                        id="purchaseFrequency"
                        name="purchaseFrequency"
                        type="number"
                        value={ltvInputs.purchaseFrequency}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerLifespan" className="text-charcoal">
                        Customer Lifespan (years)
                      </Label>
                      <Input
                        id="customerLifespan"
                        name="customerLifespan"
                        type="number"
                        value={ltvInputs.customerLifespan}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="acquisitionCost" className="text-charcoal">
                        Customer Acquisition Cost (₹)
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="acquisitionCost"
                          name="acquisitionCost"
                          type="number"
                          className="pl-10"
                          value={ltvInputs.acquisitionCost}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateLTV} 
                      className="w-full bg-accent hover:bg-accent/90 text-charcoal mt-4"
                    >
                      Calculate LTV
                    </Button>
                  </div>
                  
                  {calculatedLTV !== null && (
                    <div className="bg-secondary/20 p-4 rounded-lg space-y-4 mt-6 animate-slide-up">
                      <h3 className="text-lg font-medium text-primary">Results</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Customer Lifetime Value</p>
                          <p className="text-2xl font-bold text-primary flex items-center">
                            <IndianRupee className="h-5 w-5 mr-1" />
                            {calculatedLTV.toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Return on Investment (ROI)</p>
                          <p className="text-2xl font-bold text-primary">
                            {calculatedROI !== null ? `${calculatedROI.toFixed(2)}%` : "N/A"}
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleDownload} 
                          variant="outline" 
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        
                        <Button 
                          onClick={handleEmailOpen} 
                          variant="outline" 
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email Results
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-primary mb-4">LTV Visualization</h3>
                  {ltvData.length > 0 ? (
                    <LTVChart data={ltvData} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <p className="text-center">Calculate LTV to see visualization</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-6">
              <div className="prose prose-green max-w-none">
                <h3 className="text-xl font-semibold text-primary">Understanding Customer Lifetime Value (LTV)</h3>
                
                <p>
                  Customer Lifetime Value (LTV) is one of the most critical metrics for businesses across all industries. 
                  It represents the total revenue a business can reasonably expect from a single customer throughout 
                  their relationship with the company. Understanding LTV helps businesses make informed decisions about 
                  customer acquisition costs, marketing strategies, and resource allocation.
                </p>
                
                <h4 className="text-lg font-medium text-primary mt-6">Why LTV Matters for Your Business</h4>
                
                <p>
                  LTV is a powerful metric that provides insights into the health and sustainability of your business model:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Long-term perspective:</strong> LTV shifts focus from short-term transactions to building 
                    lasting customer relationships.
                  </li>
                  <li>
                    <strong>Improved marketing efficiency:</strong> By understanding how much a customer is worth, 
                    you can set appropriate customer acquisition costs and allocate your marketing budget more effectively.
                  </li>
                  <li>
                    <strong>Customer segmentation:</strong> LTV helps identify high-value customer segments, allowing 
                    you to tailor your marketing and product development strategies.
                  </li>
                  <li>
                    <strong>Growth prediction:</strong> Accurately calculating LTV helps forecast revenue and growth 
                    potential with greater precision.
                  </li>
                  <li>
                    <strong>Retention optimization:</strong> Understanding LTV emphasizes the importance of customer 
                    retention, which is typically more cost-effective than acquisition.
                  </li>
                </ul>
                
                <h4 className="text-lg font-medium text-primary mt-6">The LTV Formula Explained</h4>
                
                <p>
                  In its simplest form, the Customer Lifetime Value formula is:
                </p>
                
                <div className="bg-cream p-4 rounded-lg my-4 text-center">
                  <p className="font-medium">LTV = Average Purchase Value × Purchase Frequency × Customer Lifespan</p>
                </div>
                
                <p>Where:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Average Purchase Value:</strong> The average amount spent by a customer per transaction.
                  </li>
                  <li>
                    <strong>Purchase Frequency:</strong> The average number of purchases made by a customer in a given time period (usually a year).
                  </li>
                  <li>
                    <strong>Customer Lifespan:</strong> The average number of years a customer continues to purchase from your business.
                  </li>
                </ul>
                
                <p>
                  The Customer Acquisition Cost (CAC) is another important metric that, when compared with LTV, 
                  gives you the ROI of your customer acquisition efforts:
                </p>
                
                <div className="bg-cream p-4 rounded-lg my-4 text-center">
                  <p className="font-medium">ROI = ((LTV - CAC) / CAC) × 100%</p>
                </div>
                
                <h4 className="text-lg font-medium text-primary mt-6">Industry Benchmarks and Best Practices</h4>
                
                <p>
                  While LTV varies significantly across industries, a general rule of thumb is that your LTV:CAC ratio 
                  should be at least 3:1 for a sustainable business model. This means that a customer should generate 
                  at least three times the cost of acquiring them.
                </p>
                
                <p>
                  Strategies to improve your LTV include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Increasing average order value through upselling and cross-selling</li>
                  <li>Improving customer retention through exceptional service and loyalty programs</li>
                  <li>Reducing churn by addressing customer pain points and improving product quality</li>
                  <li>Optimizing pricing strategies based on customer value perception</li>
                  <li>Creating personalized marketing campaigns that resonate with high-value segments</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="guide" className="space-y-6">
              <div className="prose prose-green max-w-none">
                <h3 className="text-xl font-semibold text-primary">How to Use the LTV Calculator</h3>
                
                <p>
                  Our Customer Lifetime Value Calculator is designed to be intuitive and easy to use, while providing 
                  valuable insights for your business. Follow these steps to get the most out of this tool:
                </p>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 1: Gather Your Data</h4>
                
                <p>Before using the calculator, you'll need to collect the following information:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Average Purchase Value:</strong> Calculate the average amount customers spend per transaction. 
                    You can find this by dividing your total revenue by the number of orders over a specific period.
                  </li>
                  <li>
                    <strong>Purchase Frequency:</strong> Determine how many times a customer purchases from you in a year. 
                    Divide the total number of purchases by the number of unique customers during that period.
                  </li>
                  <li>
                    <strong>Customer Lifespan:</strong> Estimate how many years a customer continues to do business with you. 
                    This might require historical data analysis or industry benchmarks if you're a newer business.
                  </li>
                  <li>
                    <strong>Customer Acquisition Cost (CAC):</strong> Calculate how much it costs to acquire a new customer 
                    by dividing your total marketing and sales expenses by the number of new customers acquired during that period.
                  </li>
                </ul>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 2: Input Your Values</h4>
                
                <p>
                  Enter your gathered data into the calculator fields. If you're unsure about some values, our calculator 
                  provides reasonable defaults as starting points that you can adjust.
                </p>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 3: Calculate and Analyze</h4>
                
                <p>
                  Click the "Calculate LTV" button to process your inputs. The calculator will display your Customer Lifetime 
                  Value and Return on Investment (ROI). Additionally, our interactive chart will visualize how your LTV 
                  grows over the customer lifespan.
                </p>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 4: Interpret Your Results</h4>
                
                <p>
                  The results provide several key insights:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Customer Lifetime Value (LTV):</strong> This represents the total revenue you can expect from a 
                    typical customer throughout their relationship with your business.
                  </li>
                  <li>
                    <strong>Return on Investment (ROI):</strong> This percentage indicates how efficiently you're acquiring 
                    customers. A higher percentage means better returns on your acquisition efforts.
                  </li>
                  <li>
                    <strong>LTV:CAC Ratio:</strong> Although not explicitly displayed, you can calculate this by dividing 
                    LTV by CAC. A healthy business typically aims for a ratio of 3:1 or higher.
                  </li>
                </ul>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 5: Save and Share Your Results</h4>
                
                <p>
                  Once you've calculated your LTV:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Download as PDF:</strong> Save your results with our professionally designed PDF report, 
                    which includes detailed analysis and visualizations.
                  </li>
                  <li>
                    <strong>Email Results:</strong> Share your findings with team members, stakeholders, or clients 
                    directly from the calculator.
                  </li>
                </ul>
                
                <h4 className="text-lg font-medium text-primary mt-6">Step 6: Experiment with Different Scenarios</h4>
                
                <p>
                  Use the calculator to run "what-if" scenarios by adjusting your inputs:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>How would increasing your average purchase value affect your LTV?</li>
                  <li>What if you could improve customer retention and extend the customer lifespan?</li>
                  <li>How would reducing your acquisition costs impact your ROI?</li>
                </ul>
                
                <p>
                  These scenario analyses can help guide your business strategies and prioritize initiatives that will have 
                  the greatest impact on your customer lifetime value.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {showEmailModal && (
        <EmailModal
          data={{
            ...ltvInputs,
            ltv: calculatedLTV || 0,
            roi: calculatedROI || 0,
          }}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

export default LTVCalculator;
