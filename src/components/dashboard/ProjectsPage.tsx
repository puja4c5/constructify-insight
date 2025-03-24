
import { useState } from "react";
import { Plus, Filter, Search, LayoutGrid, List, Building2, Calendar, Clock, Upload, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for projects
const initialProjects = [
  {
    id: "1",
    title: "Coastal Apartments",
    description: "Multi-story residential complex with 120 units",
    progress: 65,
    status: "in-progress",
    imageSrc: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "2 days ago",
    location: "Mumbai, MH",
    type: "Residential",
  },
  {
    id: "2",
    title: "Tech Park Phase II",
    description: "Commercial office space spanning 50,000 sq ft with modern amenities",
    progress: 32,
    status: "in-progress",
    imageSrc: "https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "1 week ago",
    location: "Bengaluru, KA",
    type: "Commercial",
  },
  {
    id: "3",
    title: "Riverside Mall",
    description: "Shopping mall with food court and entertainment zone",
    progress: 18,
    status: "pending",
    imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    lastUpdated: "3 weeks ago",
    location: "Delhi, DL",
    type: "Commercial",
  },
  {
    id: "4",
    title: "Central Hospital",
    description: "300-bed hospital with specialized medical departments",
    progress: 78,
    status: "in-progress",
    imageSrc: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
    lastUpdated: "Yesterday",
    location: "Chennai, TN",
    type: "Healthcare",
  },
  {
    id: "5",
    title: "Green Valley Homes",
    description: "Eco-friendly residential development with 80 villas",
    progress: 100,
    status: "completed",
    imageSrc: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    lastUpdated: "1 month ago",
    location: "Pune, MH",
    type: "Residential",
  },
  {
    id: "6",
    title: "Metro Extension",
    description: "Urban transit infrastructure project spanning 15km",
    progress: 45,
    status: "in-progress",
    imageSrc: "https://images.unsplash.com/photo-1517823249071-70f7bd526feb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lastUpdated: "4 days ago",
    location: "Hyderabad, TS",
    type: "Infrastructure",
  },
];

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, statusFilter, typeFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status, typeFilter);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    applyFilters(searchQuery, statusFilter, type);
  };

  const applyFilters = (query: string, status: string, type: string) => {
    let filtered = projects;

    // Apply search query filter
    if (query) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((project) => project.status === status);
    }

    // Apply type filter
    if (type !== "all") {
      filtered = filtered.filter((project) => project.type === type);
    }

    setFilteredProjects(filtered);
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.type || !newProject.location) {
      alert("Please fill all required fields");
      return;
    }

    // Choose a random image from the existing projects
    const randomIndex = Math.floor(Math.random() * initialProjects.length);
    const randomImage = initialProjects[randomIndex].imageSrc;

    const project = {
      id: (projects.length + 1).toString(),
      title: newProject.title,
      description: newProject.description,
      progress: 0,
      status: "pending",
      imageSrc: randomImage,
      lastUpdated: "Just now",
      location: newProject.location,
      type: newProject.type,
    };

    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    
    // Apply current filters to updated projects
    applyFilters(searchQuery, statusFilter, typeFilter);
    
    setNewProject({
      title: "",
      description: "",
      type: "",
      location: "",
    });
    setNewProjectDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-orange-500 border-orange-300">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <Dialog open={newProjectDialog} onOpenChange={setNewProjectDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new construction project to your dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Enter project name"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Brief project description"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, type: value })
                    }
                    value={newProject.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={newProject.location}
                    onChange={(e) =>
                      setNewProject({ ...newProject, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewProjectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 sm:flex-initial">
            <Select value={typeFilter} onValueChange={handleTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-0">
            <div className="border rounded-md flex">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-r-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-l-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button onClick={() => setNewProjectDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-card rounded-lg border overflow-hidden shadow-sm">
              <div className="h-48 bg-secondary relative">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(project.status)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">Last updated: {project.lastUpdated}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Progress: {project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 mb-4" />
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center">
                    <Building2 className="h-3 w-3 mr-1" />
                    {project.type}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/dashboard/projects/${project.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-sm font-medium">
            <div className="col-span-5">Project</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-2">Last Updated</div>
            <div className="col-span-1"></div>
          </div>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-4 p-4 border-t items-center"
            >
              <div className="col-span-5">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded bg-secondary flex-shrink-0 overflow-hidden mr-3">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-muted-foreground text-sm truncate">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">{getStatusBadge(project.status)}</div>
              <div className="col-span-2">
                <div className="w-full">
                  <Progress value={project.progress} className="h-2 mb-1" />
                  <span className="text-xs text-muted-foreground">
                    {project.progress}% Complete
                  </span>
                </div>
              </div>
              <div className="col-span-2 text-muted-foreground text-sm">
                {project.lastUpdated}
              </div>
              <div className="col-span-1 text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/dashboard/projects/${project.id}`}>Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
