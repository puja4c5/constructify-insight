
import AnimatedButton from "../ui/AnimatedButton";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image/Illustration Side */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-border shadow-lg">
                <div className="aspect-[4/3] bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col justify-between border border-border">
                      <div className="h-20 bg-blue-100 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col justify-between border border-border">
                      <div className="h-20 bg-indigo-100 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col justify-between border border-border">
                      <div className="h-20 bg-purple-100 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col justify-between border border-border">
                      <div className="h-20 bg-cyan-100 rounded-md mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span className="text-sm font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5">About Us</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Revolutionizing Construction Monitoring with AI
            </h2>
            
            <p className="mt-6 text-muted-foreground">
              ConstructInsight was born from a simple observation: monitoring construction projects
              traditionally requires frequent site visits by technical experts, which becomes impractical
              with the rapid urban development in Indian cities.
            </p>
            
            <p className="mt-4 text-muted-foreground">
              Our platform uses advanced machine learning algorithms to analyze construction site images,
              automatically identifying the stage of construction and tracking progress over time. This
              enables urban local bodies, state agencies, and central agencies to monitor projects
              remotely without compromising on accuracy.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="font-medium">Time Saving</h4>
                <p className="text-sm text-muted-foreground mt-1">Reduce need for physical site visits</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="font-medium">Accuracy</h4>
                <p className="text-sm text-muted-foreground mt-1">AI-powered precision in progress tracking</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="font-medium">Scalability</h4>
                <p className="text-sm text-muted-foreground mt-1">Monitor multiple projects simultaneously</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h4 className="font-medium">Transparency</h4>
                <p className="text-sm text-muted-foreground mt-1">Clear reporting for all stakeholders</p>
              </div>
            </div>
            
            <div className="mt-8">
              <AnimatedButton to="/auth?type=register">
                Join Our Platform
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
