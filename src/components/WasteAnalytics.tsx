
import { useState } from "react";
import { menuItems } from "@/data/menuItems";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import WasteTracker from "./WasteTracker";

// Add sample waste data for demonstration
const menuItemsWithWaste = menuItems.map(item => ({
  ...item,
  wasteData: {
    averageWastePercentage: Math.floor(Math.random() * 30),
    lastUpdated: new Date().toISOString()
  }
}));

// Calculate overall average waste
const overallWaste = menuItemsWithWaste.reduce((acc, item) => 
  acc + (item.wasteData?.averageWastePercentage || 0), 0
) / menuItemsWithWaste.length;

// Sort items by waste percentage
const sortedByWaste = [...menuItemsWithWaste].sort(
  (a, b) => (b.wasteData?.averageWastePercentage || 0) - (a.wasteData?.averageWastePercentage || 0)
);

// Group data by category
const categoryData = menuItemsWithWaste.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = {
      name: item.category,
      items: [],
      totalWaste: 0,
      count: 0
    };
  }
  
  acc[item.category].items.push(item);
  acc[item.category].totalWaste += item.wasteData?.averageWastePercentage || 0;
  acc[item.category].count += 1;
  
  return acc;
}, {} as Record<string, {name: string, items: typeof menuItemsWithWaste, totalWaste: number, count: number}>);

const categoryWasteData = Object.values(categoryData).map(cat => ({
  name: cat.name === 'main-courses' ? 'Main Courses' : 
        cat.name === 'appetizers' ? 'Appetizers' :
        cat.name === 'desserts' ? 'Desserts' :
        cat.name === 'beverages' ? 'Beverages' : 
        cat.name === 'sides' ? 'Sides' : cat.name,
  value: cat.totalWaste / cat.count,
  items: cat.items
}));

// Colors for the charts
const COLORS = ['#FF6B35', '#8E4A29', '#F7C59F', '#FFF8F0', '#403233'];

export default function WasteAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="by-item">By Item</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Food Waste</CardTitle>
                <CardDescription>Average waste percentage across all menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-52">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-restaurant-primary mb-2">
                      {overallWaste.toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Average Waste</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Waste by Category</CardTitle>
                <CardDescription>Distribution of waste across menu categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryWasteData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#FF6B35"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {categoryWasteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}%`, 'Waste']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Actionable information to reduce food waste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-restaurant-light rounded-md">
                <h4 className="font-semibold text-restaurant-dark">Top Wasted Items</h4>
                <p className="text-sm mt-1">
                  {sortedByWaste.slice(0, 3).map(item => item.name).join(", ")} have the highest waste percentages.
                  Consider adjusting portion sizes or ingredients for these items.
                </p>
              </div>
              
              <div className="p-4 bg-restaurant-light rounded-md">
                <h4 className="font-semibold text-restaurant-dark">Category Insights</h4>
                <p className="text-sm mt-1">
                  {categoryWasteData.sort((a, b) => b.value - a.value)[0].name} has the highest average waste.
                  Consider reviewing recipes and portion sizes in this category.
                </p>
              </div>
              
              <div className="p-4 bg-restaurant-light rounded-md">
                <h4 className="font-semibold text-restaurant-dark">Customer Feedback</h4>
                <p className="text-sm mt-1">
                  Customers who leave waste feedback often mention portion sizes are too large.
                  Consider offering size options for high-waste menu items.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="by-category">
          <Card>
            <CardHeader>
              <CardTitle>Waste by Menu Category</CardTitle>
              <CardDescription>Comparison of waste percentages across different menu sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryWasteData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Waste %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Average Waste']} />
                    <Bar dataKey="value" fill="#FF6B35" name="Average Waste %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {categoryWasteData.map((category) => (
                  <div key={category.name} className="p-4 border rounded-md">
                    <h4 className="font-semibold">{category.name}</h4>
                    <WasteTracker percentage={category.value} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {category.items.length} items in this category
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="by-item">
          <Card>
            <CardHeader>
              <CardTitle>Individual Item Waste Analysis</CardTitle>
              <CardDescription>Detailed waste data for each menu item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedByWaste.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 border rounded-md hover:bg-restaurant-light/50">
                    <div className="h-12 w-12 rounded overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="w-32">
                      <WasteTracker 
                        percentage={item.wasteData?.averageWastePercentage || 0}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
