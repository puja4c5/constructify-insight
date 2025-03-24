
import { useState } from "react";
import { PlayCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState<number>(1);

  const demoSteps = [
    {
      id: 1,
      title: "Upload Site Images",
      description: "Easily upload construction site images from any device",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - would be replaced with actual demo video
      thumbnail: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Watch as our AI analyzes and identifies construction progress",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Track Progress",
      description: "Monitor construction progress with detailed insights",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      thumbnail: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    }
  ];

  const keyFeatures = [
    "AI-powered construction stage identification",
    "Progress tracking and comparison over time",
    "Defect and error detection",
    "Building plan comparison",
    "Team collaboration tools",
    "Detailed analytics and reporting"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">See ConstructInsight in Action</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Watch how our AI platform revolutionizes construction progress monitoring and quality control.
            </p>
            <Button size="lg" className="group">
              Request a Personalized Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>

        {/* Demo video section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-4">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                
                {demoSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveDemo(step.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeDemo === step.id
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          activeDemo === step.id 
                            ? "bg-white text-primary" 
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {step.id}
                      </div>
                      <div>
                        <h3 className="font-medium">{step.title}</h3>
                        <p className={`text-sm mt-1 ${activeDemo === step.id ? "text-white/80" : "text-muted-foreground"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-card rounded-xl overflow-hidden border shadow-sm">
                  <div className="relative aspect-video bg-black">
                    {demoSteps.map((step) => (
                      <div 
                        key={step.id}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          activeDemo === step.id ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <img 
                          src={step.thumbnail} 
                          alt={step.title} 
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                                <PlayCircle className="h-6 w-6 mr-2" />
                                Watch Demo
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden">
                              <div className="aspect-video w-full">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={step.videoSrc}
                                  title={`${step.title} Demo Video`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {demoSteps.find(step => step.id === activeDemo)?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {demoSteps.find(step => step.id === activeDemo)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key features */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Key Platform Features</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="bg-card rounded-lg p-4 shadow-sm flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to experience the future of construction monitoring?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/auth?type=register">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
