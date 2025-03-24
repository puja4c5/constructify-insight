
import { 
  Building, 
  BarChart3, 
  Upload, 
  Workflow, 
  Eye, 
  AlertCircle, 
  Clock, 
  Camera 
} from "lucide-react";

const featuresData = [
  {
    icon: <Upload className="w-6 h-6" />,
    title: "Image Upload",
    description: "Upload site images and categorize by construction type and stage"
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Construction Analysis",
    description: "AI identifies current construction stage and activities from images"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Progress Tracking",
    description: "Compare current status with previous images to measure progress"
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Smart Validation",
    description: "Automatically flags incorrect or irrelevant image uploads"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Monitoring",
    description: "Get instant insights without waiting for manual site inspections"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Remote Inspection",
    description: "Monitor multiple projects from anywhere, anytime"
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Unified Dashboard",
    description: "Centralized view of all projects with detailed progress metrics"
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Stage Recognition",
    description: "Specialized detection for foundation, superstructure, and interiors"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5">Features</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
            AI-Powered Construction Monitoring
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our platform uses advanced machine learning to revolutionize how construction projects are monitored, saving time and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
