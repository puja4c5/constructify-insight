
import { ArrowRight } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <div
              className="opacity-0 animated-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="bg-primary/10 text-primary font-medium rounded-full py-1 px-4 text-sm">
                AI-Powered Construction Monitoring
              </span>
            </div>

            <h1
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight opacity-0 animated-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Monitor Construction{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Progress
              </span>{" "}
              in Real-Time
            </h1>

            <p
              className="mt-6 text-lg text-muted-foreground max-w-lg opacity-0 animated-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Our AI solution allows urban agencies to remotely monitor building
              construction projects through image analysis, eliminating the need
              for constant site visits.
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 animated-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <AnimatedButton to="/auth?type=register" size="lg">
                Get Started{" "}
                <ArrowRight size={16} className="ml-2 inline-block" />
              </AnimatedButton>
              <AnimatedButton to="/#features" variant="outline" size="lg">
                Learn More
              </AnimatedButton>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div
              className="relative z-10 rounded-2xl shadow-xl overflow-hidden bg-white border border-border opacity-0 animated-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="aspect-[4/3] relative bg-gradient-to-tr from-gray-100 to-white flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="animate-pulse flex space-x-4 mb-4 justify-center">
                    <div className="rounded-full bg-blue-100 h-12 w-12"></div>
                    <div className="h-12 flex items-center justify-center">
                      <div className="h-2 w-24 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex justify-between mt-4">
                    <div className="w-28 h-6 bg-gray-200 rounded"></div>
                    <div className="w-16 h-6 bg-blue-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/3 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-5 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
