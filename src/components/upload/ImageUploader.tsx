
import { useState, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  onUploadComplete?: (result: { imageUrl: string; analysis: any }) => void;
}

const constructionTypes = [
  { id: "foundation", label: "Foundation" },
  { id: "superstructure", label: "Super Structure" },
  { id: "facade", label: "Facade" },
  { id: "interiors", label: "Interiors" },
  { id: "landscaping", label: "Landscaping" },
];

const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [constructionType, setConstructionType] = useState<string>("foundation");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if the file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      // Check if the file is not too large (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
      setUploadStatus("idle");
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check if the file is an image
      if (!droppedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      setFile(droppedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(droppedFile);
      setUploadStatus("idle");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setUploadStatus("uploading");
    
    // Simulate upload progress
    const intervalId = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    // Simulate upload and processing delay
    setTimeout(() => {
      clearInterval(intervalId);
      setUploadProgress(100);
      setUploading(false);
      
      // Mock analysis result based on construction type
      const mockAnalysis = {
        type: constructionType,
        confidence: 0.87,
        stage: constructionType === "foundation" ? "excavation" : 
               constructionType === "superstructure" ? "columns_and_beams" :
               constructionType === "facade" ? "exterior_walls" :
               constructionType === "interiors" ? "framing" : "soil_preparation",
        progress: Math.floor(Math.random() * 100),
        estimated_completion: "2023-12-15",
      };
      
      setUploadStatus("success");
      
      if (onUploadComplete) {
        onUploadComplete({
          imageUrl: preview as string,
          analysis: mockAnalysis,
        });
      }
      
      toast({
        title: "Analysis complete",
        description: `Image analyzed as ${constructionType} at ${mockAnalysis.progress}% completion`,
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg ${
              preview ? "border-border" : "border-primary/40"
            } transition-colors p-4 h-64 flex items-center justify-center relative overflow-hidden`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
                
                {uploadStatus === "success" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 flex items-center max-w-xs">
                      <CheckCircle2 className="text-green-500 mr-2" size={20} />
                      <span className="text-sm font-medium">Analysis complete!</span>
                    </div>
                  </div>
                )}
                
                {uploadStatus === "error" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 flex items-center max-w-xs">
                      <AlertCircle className="text-red-500 mr-2" size={20} />
                      <span className="text-sm font-medium">Error processing image</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="mt-2 text-sm font-medium">Drag and drop or click to upload</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, JPEG up to 10MB
                </p>
                <Button onClick={handleBrowseClick} variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </div>
            )}
          </div>
          
          {file && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium truncate max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
              
              {uploadStatus === "uploading" && (
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Uploading and analyzing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-medium text-lg mb-4">Construction Type</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the type of construction activity shown in the image for more accurate analysis
          </p>
          
          <RadioGroup
            value={constructionType}
            onValueChange={setConstructionType}
            className="space-y-3"
          >
            {constructionTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-8"
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Analyze Image"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
