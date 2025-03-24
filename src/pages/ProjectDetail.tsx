
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  BarChart3, 
  UploadCloud, 
  Image, 
  FileText, 
  ArrowLeft, 
  Clock, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import ImageUploader from "@/components/upload/ImageUploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for the project details
const projectsData = [
  {
    id: "1",
    title: "Coastal Apartments",
    description: "Multi-story residential complex with 120 units featuring modern amenities, swimming pool, garden areas, and underground parking. Located near the coastal area with sea views from most apartments.",
    progress: 65,
    status: "in-progress",
    imageSrc: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Mumbai, Maharashtra",
    startDate: "2022-07-10",
    estimatedCompletion: "2024-09-15",
    client: "Coastal Developers Ltd.",
    budget: "₹45.8 Crores",
    type: "Residential",
    teamMembers: [
      { name: "Raj Patel", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Priya Singh", role: "Site Engineer", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Vikram Malhotra", role: "Architect", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
      { name: "Meera Kapoor", role: "Interior Designer", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    ],
    progressHistory: [
      { date: "2022-08-15", progress: 5, note: "Foundation work started" },
      { date: "2022-11-20", progress: 15, note: "Basement completed" },
      { date: "2023-02-10", progress: 28, note: "Ground floor structure completed" },
      { date: "2023-05-05", progress: 40, note: "3rd floor reached" },
      { date: "2023-08-22", progress: 52, note: "External wall work started" },
      { date: "2023-11-15", progress: 65, note: "Electrical and plumbing work in progress" },
    ],
    constructionStages: [
      { id: "foundation", name: "Foundation", status: "completed", percentage: 100 },
      { id: "structure", name: "Structure", status: "in-progress", percentage: 75 },
      { id: "walls", name: "Walls", status: "in-progress", percentage: 60 },
      { id: "plumbing", name: "Plumbing", status: "in-progress", percentage: 45 },
      { id: "electrical", name: "Electrical", status: "in-progress", percentage: 40 },
      { id: "finishes", name: "Finishes", status: "not-started", percentage: 0 },
      { id: "interiors", name: "Interiors", status: "not-started", percentage: 0 },
    ],
    recentUpdates: [
      { 
        id: "1", 
        date: "2023-11-15", 
        type: "image",
        title: "Eastern facade progress",
        content: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
        analysis: {
          stage: "structure",
          progress: 75,
          issues: [],
        }
      },
      { 
        id: "2", 
        date: "2023-11-10", 
        type: "issue",
        title: "Plumbing issue detected",
        content: "AI analysis detected potential plumbing misalignment on 4th floor. Site inspection required.", 
        severity: "medium"
      },
      { 
        id: "3", 
        date: "2023-11-05", 
        type: "image",
        title: "Northern wing progress",
        content: "https://images.unsplash.com/photo-1517823249071-70f7bd526feb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
        analysis: {
          stage: "walls",
          progress: 60,
          issues: ["Minor alignment issue detected in north-east corner"],
        }
      },
      { 
        id: "4", 
        date: "2023-10-28", 
        type: "note",
        title: "Site meeting summary",
        content: "Team discussed accelerating the electrical work to meet the schedule. Additional electricians will join next week.", 
      },
    ],
    issues: [
      { 
        id: "1",
        title: "Plumbing misalignment on 4th floor",
        description: "AI detected potential misalignment in plumbing lines on 4th floor, north wing.",
        status: "open",
        severity: "medium",
        reportedDate: "2023-11-10",
        assignedTo: "Vikram Malhotra",
      },
      { 
        id: "2",
        title: "Minor wall alignment issue",
        description: "North-east corner wall shows slight deviation from plans, within 2cm tolerance.",
        status: "in-review",
        severity: "low",
        reportedDate: "2023-11-05",
        assignedTo: "Priya Singh",
      },
      { 
        id: "3",
        title: "Material quality concern",
        description: "Recent cement delivery showed inconsistent quality. Lab testing recommended.",
        status: "resolved",
        severity: "high",
        reportedDate: "2023-10-15",
        resolvedDate: "2023-10-20",
        assignedTo: "Raj Patel",
      },
    ]
  },
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  
  // Find the project by ID
  const project = projectsData.find(p => p.id === id) || projectsData[0];

  const handleUploadComplete = (result: { imageUrl: string; analysis: any }) => {
    setAnalysisResult(result);
    setTimeout(() => {
      setUploadDialogOpen(false);
    }, 1000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Medium</Badge>;
      case "low":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Open</Badge>;
      case "in-review":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Review</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Project header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/dashboard/projects">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight inline-flex items-center">
                {project.title}
                <Badge className="ml-4 bg-blue-500 hover:bg-blue-600">
                  {project.status === "in-progress" ? "In Progress" : project.status}
                </Badge>
              </h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
          
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UploadCloud className="h-4 w-4 mr-2" />
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
                <ImageUploader onUploadComplete={handleUploadComplete} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {analysisResult && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-green-700">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                Analysis Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img 
                    src={analysisResult.imageUrl} 
                    alt="Analyzed construction" 
                    className="rounded-md border border-green-200 h-48 w-full object-cover"
                  />
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-green-700">Construction Type</div>
                      <div className="text-base">{analysisResult.analysis.type}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-700">Current Stage</div>
                      <div className="text-base">{analysisResult.analysis.stage.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-700">Estimated Progress</div>
                      <div className="flex items-center">
                        <span className="text-base mr-2">{analysisResult.analysis.progress}%</span>
                        <Progress value={analysisResult.analysis.progress} className="h-2 flex-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Project tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Project details cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                      <div>{formatDate(project.startDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Estimated Completion</div>
                      <div>{formatDate(project.estimatedCompletion)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Client</div>
                    <div>{project.client}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Budget</div>
                    <div>{project.budget}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Type</div>
                    <div>{project.type}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Project Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>
            
            {/* Project image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Image className="h-5 w-5 mr-2 text-primary" />
                  Project Site
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <img 
                  src={project.imageSrc} 
                  alt={project.title} 
                  className="w-full h-80 object-cover" 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Current Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Progress History</h4>
                    <div className="space-y-4">
                      {project.progressHistory.map((entry, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-16 flex-shrink-0 text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="ml-2 w-12 flex-shrink-0 font-medium">
                            {entry.progress}%
                          </div>
                          <div className="ml-4 text-sm">
                            {entry.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Construction Stages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.constructionStages.map((stage) => (
                      <div key={stage.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{stage.name}</span>
                          <Badge
                            variant={stage.status === "completed" ? "default" : "outline"}
                            className={
                              stage.status === "completed"
                                ? "bg-green-500 hover:bg-green-600"
                                : stage.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }
                          >
                            {stage.status === "completed"
                              ? "Completed"
                              : stage.status === "in-progress"
                              ? "In Progress"
                              : "Not Started"}
                          </Badge>
                        </div>
                        <Progress value={stage.percentage} className="h-2" />
                        <div className="text-xs text-right text-muted-foreground">
                          {stage.percentage}% complete
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Recent Updates
                </CardTitle>
                <CardDescription>
                  Latest activities and updates from the construction site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-8">
                    {project.recentUpdates.map((update) => (
                      <div key={update.id} className="relative pl-6 border-l-2 border-muted pb-8 last:pb-0">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <div className="mb-2">
                          <div className="text-sm text-muted-foreground">
                            {new Date(update.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                          <h4 className="font-medium text-lg">{update.title}</h4>
                        </div>
                        
                        {update.type === "image" && (
                          <div className="space-y-3">
                            <div className="rounded-md overflow-hidden border">
                              <img 
                                src={update.content} 
                                alt={update.title} 
                                className="w-full h-64 object-cover" 
                              />
                            </div>
                            
                            {update.analysis && (
                              <div className="bg-secondary/30 rounded-md p-4">
                                <div className="font-medium mb-2">AI Analysis:</div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground">Stage</div>
                                    <div>{update.analysis.stage}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground">Progress</div>
                                    <div>{update.analysis.progress}%</div>
                                  </div>
                                </div>
                                
                                {update.analysis.issues && update.analysis.issues.length > 0 && (
                                  <div className="mt-3">
                                    <div className="text-sm text-muted-foreground">Issues Detected</div>
                                    <ul className="list-disc pl-5 text-sm">
                                      {update.analysis.issues.map((issue: string, i: number) => (
                                        <li key={i}>{issue}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {update.type === "note" && (
                          <div className="bg-secondary/20 rounded-md p-4">
                            <p>{update.content}</p>
                          </div>
                        )}
                        
                        {update.type === "issue" && (
                          <div className="bg-red-50 border border-red-100 rounded-md p-4">
                            <div className="flex items-start">
                              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="flex items-center">
                                  <span className="mr-2">Issue detected</span>
                                  {getSeverityBadge(update.severity)}
                                </div>
                                <p className="mt-1">{update.content}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  Construction Issues
                </CardTitle>
                <CardDescription>
                  Track and manage issues detected during construction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.issues.map((issue) => (
                    <div key={issue.id} className="border rounded-md overflow-hidden">
                      <div className="p-4 border-b bg-secondary/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{issue.title}</h4>
                            <div className="flex items-center mt-1 space-x-2">
                              <div className="text-sm text-muted-foreground">
                                Reported on {new Date(issue.reportedDate).toLocaleDateString()}
                              </div>
                              <div>·</div>
                              <div className="flex items-center">
                                <div className="text-sm text-muted-foreground mr-1">Severity:</div>
                                {getSeverityBadge(issue.severity)}
                              </div>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(issue.status)}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="mb-4">{issue.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center">
                            <div className="text-muted-foreground mr-1">Assigned to:</div>
                            <div className="font-medium">{issue.assignedTo}</div>
                          </div>
                          {issue.resolvedDate && (
                            <div className="text-green-600 flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Resolved on {new Date(issue.resolvedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {project.issues.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                      <h3 className="text-lg font-medium">No issues detected</h3>
                      <p className="text-muted-foreground mt-2">
                        There are currently no reported issues for this project.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
