
import { useState } from "react";
import { Building2, Upload, Plus, BarChart3, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProgressCard from "@/components/dashboard/ProgressCard";
import ImageUploader from "@/components/upload/ImageUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for projects
const projectsData = [
  {
    id: 1,
    title: "Coastal Apartments",
    description: "Multi-story residential complex with 120 units",
    progress: 65,
    status: "in-progress" as const,
    imageSrc: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Tech Park Phase II",
    description: "Commercial office space spanning 50,000 sq ft with modern amenities",
    progress: 32,
    status: "in-progress" as const,
    imageSrc: "https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Riverside Mall",
    description: "Shopping mall with food court and entertainment zone",
    progress: 18,
    status: "pending" as const,
    imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    lastUpdated: "3 weeks ago",
  },
  {
    id: 4,
    title: "Central Hospital",
    description: "300-bed hospital with specialized medical departments",
    progress: 78,
    status: "in-progress" as const,
    imageSrc: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
    lastUpdated: "Yesterday",
  },
  {
    id: 5,
    title: "Green Valley Homes",
    description: "Eco-friendly residential development with 80 villas",
    progress: 100,
    status: "completed" as const,
    imageSrc: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    lastUpdated: "1 month ago",
  },
  {
    id: 6,
    title: "Metro Extension",
    description: "Urban transit infrastructure project spanning 15km",
    progress: 45,
    status: "in-progress" as const,
    imageSrc: "https://images.unsplash.com/photo-1517823249071-70f7bd526feb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "4 days ago",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const statCards = [
    {
      title: "Total Projects",
      value: "12",
      description: "3 active, 2 pending, 7 completed",
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Progress",
      value: "68%",
      description: "Average across all active projects",
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Recent Updates",
      value: "8",
      description: "In the last 7 days",
      icon: <Upload className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[768px]">
                <DialogHeader>
                  <DialogTitle>Upload Construction Images</DialogTitle>
                  <DialogDescription>
                    Upload images from your construction site to analyze progress and identify the current stage.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <ImageUploader 
                    onUploadComplete={() => {
                      setTimeout(() => setUploadDialogOpen(false), 1500);
                    }} 
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tabs */}
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Updates</TabsTrigger>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsData.map((project) => (
                <ProgressCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  progress={project.progress}
                  status={project.status}
                  imageSrc={project.imageSrc}
                  lastUpdated={project.lastUpdated}
                />
              ))}
              
              <Card className="flex flex-col justify-center items-center p-6 h-full border-dashed border-2">
                <Plus size={24} className="text-muted-foreground mb-4" />
                <h3 className="font-medium">New Project</h3>
                <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
                  Add a new construction project to track
                </p>
                <Button variant="outline">Create Project</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsData
                .slice()
                .sort((a, b) => {
                  // Sort by "days/hours ago" (just for demo)
                  const aTime = a.lastUpdated.includes("day") ? parseInt(a.lastUpdated) * 24 : parseInt(a.lastUpdated);
                  const bTime = b.lastUpdated.includes("day") ? parseInt(b.lastUpdated) * 24 : parseInt(b.lastUpdated);
                  return aTime - bTime;
                })
                .slice(0, 3)
                .map((project) => (
                  <ProgressCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    progress={project.progress}
                    status={project.status}
                    imageSrc={project.imageSrc}
                    lastUpdated={project.lastUpdated}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsData
                .filter((project) => project.status === "in-progress")
                .map((project) => (
                  <ProgressCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    progress={project.progress}
                    status={project.status}
                    imageSrc={project.imageSrc}
                    lastUpdated={project.lastUpdated}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
