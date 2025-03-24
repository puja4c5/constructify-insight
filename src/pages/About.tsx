
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Revolutionizing construction monitoring with advanced AI technology that makes tracking
                progress simple, accurate, and accessible for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Image/Illustration Side */}
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="relative">
                  <div className="relative z-10 rounded-2xl overflow-hidden border border-border shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                      alt="Construction team"
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="lg:w-1/2 order-1 lg:order-2">
                <h2 className="text-3xl font-semibold mb-6">
                  Our Story
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  ConstructInsight was born from a simple observation: monitoring construction projects
                  traditionally requires frequent site visits by technical experts, which becomes impractical
                  with the rapid urban development in Indian cities.
                </p>
                
                <p className="text-muted-foreground mb-4">
                  Founded in 2021 by a team of construction engineers and AI specialists, our platform 
                  addresses the challenge of efficiently monitoring multiple construction sites simultaneously
                  without compromising on accuracy or detail.
                </p>
                
                <p className="text-muted-foreground mb-6">
                  Our AI technology has been trained on thousands of construction images from various stages 
                  and types of buildings, allowing it to identify progress with remarkable precision. Today,
                  we serve hundreds of construction companies, government agencies, and real estate developers.
                </p>
                
                <Button asChild>
                  <Link to="/demo">See Our Platform in Action</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl p-6 shadow-sm border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/>
                    <path d="M10 22h4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously push the boundaries of what's possible with AI in construction monitoring,
                  always seeking better ways to serve our clients.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Reliability</h3>
                <p className="text-muted-foreground">
                  We build solutions you can depend on, with accuracy and consistency at the core
                  of everything we do.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in working closely with our clients, understanding their unique needs,
                  and building solutions that truly work for them.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Leadership Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Co-Founder & CEO",
                  image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  bio: "Former construction engineer with 15 years of experience in large-scale infrastructure projects."
                },
                {
                  name: "Priya Singh",
                  role: "Co-Founder & CTO",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  bio: "AI specialist with a PhD in Computer Vision and previous experience at leading tech companies."
                },
                {
                  name: "Amit Patel",
                  role: "Chief Product Officer",
                  image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  bio: "Product leader who has built multiple successful SaaS platforms for the construction industry."
                }
              ].map((member, index) => (
                <div key={index} className="bg-background rounded-xl p-6 shadow-sm border">
                  <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[120px] mx-auto">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-center mb-1">{member.name}</h3>
                  <p className="text-primary text-center mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Join Us on Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience how ConstructInsight can transform your construction monitoring 
              process and save valuable time and resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/auth?type=register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
