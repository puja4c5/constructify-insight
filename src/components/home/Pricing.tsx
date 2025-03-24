
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: "Basic",
      description: "For small construction companies",
      price: annual ? 29 : 39,
      features: [
        "5 active projects",
        "AI construction analysis",
        "Progress tracking",
        "100 images/month",
        "Email support",
      ],
      notIncluded: [
        "Advanced analytics",
        "Error detection",
        "API access",
      ],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Pro",
      description: "For growing construction firms",
      price: annual ? 79 : 99,
      features: [
        "25 active projects",
        "AI construction analysis",
        "Progress tracking",
        "500 images/month",
        "Error detection",
        "Advanced analytics",
        "Priority support",
      ],
      notIncluded: [
        "API access",
      ],
      cta: "Get Started",
      featured: true
    },
    {
      name: "Enterprise",
      description: "For large construction companies",
      price: annual ? 199 : 249,
      features: [
        "Unlimited projects",
        "AI construction analysis",
        "Progress tracking",
        "Unlimited images",
        "Error detection",
        "Advanced analytics",
        "Custom ML models",
        "API access",
        "Dedicated support",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      featured: false
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the plan that best fits your construction monitoring needs.
            All plans include our core AI-powered construction analysis capabilities.
          </p>
          
          <div className="flex items-center justify-center">
            <div className={`mr-3 ${!annual ? 'font-semibold' : ''}`}>Monthly</div>
            <Switch 
              checked={annual}
              onCheckedChange={setAnnual}
            />
            <div className="ml-3 flex items-center">
              <span className={annual ? 'font-semibold' : ''}>Annual</span>
              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl p-1 ${
                plan.featured 
                  ? 'bg-gradient-to-b from-primary to-primary/60 shadow-lg' 
                  : ''
              }`}
            >
              <div className={`h-full rounded-xl bg-card p-6 md:p-8 flex flex-col ${
                plan.featured ? 'border-0' : 'border'
              }`}>
                {plan.featured && (
                  <Badge className="absolute top-4 right-4">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-5">{plan.description}</p>
                
                <div className="mb-5">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                  {annual && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.price * 12}/year)
                    </p>
                  )}
                </div>
                
                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.featured 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : ''
                  }`}
                  variant={plan.featured ? "outline" : "default"}
                  asChild
                >
                  <Link to="/pricing" className="group">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom plan for your specific requirements?
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Our Sales Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
