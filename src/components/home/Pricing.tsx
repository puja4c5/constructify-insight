
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, X, ArrowRight, BadgePercent, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      featured: false,
      mostPopular: false
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
      featured: true,
      mostPopular: true
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
      featured: false,
      mostPopular: false
    },
  ];

  const featureExplanations = {
    "AI construction analysis": "Our AI analyzes construction site images to identify the stage of construction and track progress.",
    "Progress tracking": "Compare current status with previous site images to quantify progress over time.",
    "Error detection": "AI identifies potential construction errors, misalignments, and quality issues.",
    "Advanced analytics": "Detailed reports, trends, and insights about your construction progress.",
    "Custom ML models": "Tailored machine learning models specific to your construction types and needs.",
    "API access": "Integrate ConstructInsight with your existing software and workflows.",
  };

  return (
    <section id="pricing" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the plan that best fits your construction monitoring needs.
            All plans include our core AI-powered construction analysis capabilities.
          </p>
          
          <div className="flex items-center justify-center">
            <div className={`mr-3 ${!annual ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>Monthly</div>
            <Switch 
              checked={annual}
              onCheckedChange={setAnnual}
            />
            <div className="ml-3 flex items-center">
              <span className={annual ? 'font-semibold text-primary' : 'text-muted-foreground'}>Annual</span>
              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200 flex items-center">
                <BadgePercent className="h-3.5 w-3.5 mr-1" />
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
                {plan.mostPopular && (
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
                  <TooltipProvider>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                        {featureExplanations[feature as keyof typeof featureExplanations] && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="ml-1 text-muted-foreground inline-flex">
                                <HelpCircle className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                {featureExplanations[feature as keyof typeof featureExplanations]}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start text-muted-foreground">
                        <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                        {featureExplanations[feature as keyof typeof featureExplanations] && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="ml-1 text-muted-foreground inline-flex">
                                <HelpCircle className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                {featureExplanations[feature as keyof typeof featureExplanations]}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </TooltipProvider>
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
          <div className="bg-card border rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Enterprise Features</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom AI model training</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>On-premises deployment option</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>24/7 premium support</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Service level agreements (SLAs)</span>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Our Sales Team</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to get started."
              },
              {
                question: "What happens if I exceed my monthly image limit?",
                answer: "You'll be notified when you reach 80% of your limit. Additional images are charged at $0.10 per image."
              },
              {
                question: "Do you offer discounts for non-profits or educational institutions?",
                answer: "Yes, we offer special pricing for non-profits, educational institutions, and government organizations. Contact our sales team."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card border rounded-lg p-5">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
