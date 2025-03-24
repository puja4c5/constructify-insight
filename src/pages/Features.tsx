
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Camera, Upload, BarChart3, Building2, BrainCircuit } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const [activeTab, setActiveTab] = useState<string>("monitoring");

  const features = [
    {
      id: "monitoring",
      title: "Real-Time Monitoring",
      description: "Continuous monitoring of construction sites through AI-powered image analysis",
      icon: <Camera className="h-10 w-10 text-primary" />,
      benefits: [
        "Daily progress tracking without site visits",
        "Automated stage identification",
        "Historical comparison with previous states",
        "Error detection and quality control"
      ],
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: "analysis",
      title: "AI Construction Analysis",
      description: "Advanced machine learning algorithms that understand construction phases and components",
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      benefits: [
        "Specialized models for different construction types",
        "Automated progress percentage calculation",
        "Deviation detection from building plans",
        "Construction quality assessment"
      ],
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: "management",
      title: "Project Management",
      description: "Comprehensive tools to manage multiple construction projects efficiently",
      icon: <Building2 className="h-10 w-10 text-primary" />,
      benefits: [
        "Centralized project dashboard",
        "Team collaboration features",
        "Document and plan management",
        "Progress reports and analytics"
      ],
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: "reporting",
      title: "Advanced Reporting",
      description: "Detailed insights and visualizations of construction progress over time",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      benefits: [
        "Customizable progress reports",
        "Timeline visualization",
        "Comparative analysis with projections",
        "Stakeholder-ready presentations"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    }
  ];
  
  const activeFeature = features.find(feature => feature.id === activeTab) || features[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-24 pb-12 md:py-32 px-4 bg-gradient-to-br from-primary/5 to-secondary">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Revolutionize Construction Monitoring
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our AI-powered platform transforms how you track and analyze construction progress,
                turning site images into actionable insights without requiring physical visits.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features tabs section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Tabs navigation */}
              <div className="md:col-span-4 lg:col-span-3 space-y-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeTab === feature.id
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 ${activeTab === feature.id ? "text-white" : "text-primary"}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Feature content */}
              <div className="md:col-span-8 lg:col-span-9">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl overflow-hidden border shadow-sm"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3">{activeFeature.title}</h2>
                    <p className="text-muted-foreground mb-6">{activeFeature.description}</p>
                    
                    <h4 className="font-medium mb-4">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {activeFeature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your construction monitoring?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of construction professionals who are saving time and improving project outcomes with ConstructInsight.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/auth?type=register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/demo">See Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
