
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee } from "lucide-react";

interface LTVData {
  averagePurchaseValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  acquisitionCost: number;
  ltv: number;
  roi: number;
}

interface LTVChartProps {
  data: LTVData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-sm">Year {label}</p>
        <p className="text-primary flex items-center">
          <span className="mr-1">LTV:</span>
          <IndianRupee className="h-3 w-3 inline" />
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-blue">
          ROI: {payload[1].value.toFixed(2)}%
        </p>
      </div>
    );
  }

  return null;
};

const LTVChart: React.FC<LTVChartProps> = ({ data }) => {
  // Process data for charts
  const chartData = data.map((item, index) => ({
    year: index + 1,
    ltv: item.ltv,
    roi: item.roi,
    cumulativeRevenue: item.ltv,
    acquisitionCost: item.acquisitionCost,
    profit: item.ltv - item.acquisitionCost
  }));

  return (
    <div className="w-full">
      <Tabs defaultValue="combined">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="combined">Combined View</TabsTrigger>
          <TabsTrigger value="ltv">LTV Growth</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combined" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
              <YAxis yAxisId="left" orientation="left" stroke="#245e4f" label={{ value: 'LTV (₹)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#4a8fe7" label={{ value: 'ROI (%)', angle: 90, position: 'insideRight' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="ltv" name="LTV (₹)" fill="#245e4f" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="roi" name="ROI (%)" fill="#4a8fe7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="ltv" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Value (₹)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cumulativeRevenue" name="Cumulative Revenue" stroke="#7ac9a7" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="acquisitionCost" name="Acquisition Cost" stroke="#e9c46a" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="profit" name="Profit" stroke="#245e4f" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="roi" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roi" name="ROI (%)" stroke="#4a8fe7" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LTVChart;
