
import { Check, X, Clock, UploadCloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProgressCardProps {
  title: string;
  description: string;
  progress: number;
  status: "in-progress" | "completed" | "pending" | "error";
  imageSrc?: string;
  lastUpdated: string;
}

const ProgressCard = ({
  title,
  description,
  progress,
  status,
  imageSrc,
  lastUpdated,
}: ProgressCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <Check size={12} className="mr-1" /> Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
            <Clock size={12} className="mr-1" /> In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-orange-500 border-orange-300">
            <Clock size={12} className="mr-1" /> Pending
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <X size={12} className="mr-1" /> Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border border-border/80">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {imageSrc ? (
          <div className="relative h-48 bg-muted">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-4 w-full">
                <div className="flex justify-between items-center text-white mb-1">
                  <span className="font-medium">Construction Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/30" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-muted flex flex-col items-center justify-center p-4">
            <UploadCloud size={40} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">No image uploaded yet</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-3 flex justify-between items-center text-sm text-muted-foreground">
        <span>Last updated: {lastUpdated}</span>
        <span className="font-medium text-foreground">{progress}% complete</span>
      </CardFooter>
    </Card>
  );
};

export default ProgressCard;
