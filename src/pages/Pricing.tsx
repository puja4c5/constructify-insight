
import { CheckCircle2, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Pricing = () => {
  const [billingAnnually, setBillingAnnually] = useState(true);
  
  const plans = [
    {
      name: "Basic",
      description: "For small construction companies with limited projects",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "5 concurrent projects",
        "10 team members",
        "Basic AI analysis",
        "100 images/month",
        "Email support",
      ],
      notIncluded: [
        "Advanced analytics",
        "Plan comparison",
        "Error detection",
        "API access"
      ],
      cta: "Start Basic",
      featured: false,
    },
    {
      name: "Professional",
      description: "For growing construction firms with multiple projects",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "25 concurrent projects",
        "Unlimited team members",
        "Advanced AI analysis",
        "500 images/month",
        "Plan comparison",
        "Error detection",
        "Priority support",
      ],
      notIncluded: [
        "Custom ML models",
        "API access"
      ],
      cta: "Start Professional",
      featured: true,
    },
    {
      name: "Enterprise",
      description: "For large construction companies with complex needs",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Unlimited projects",
        "Unlimited team members",
        "Premium AI analysis",
        "Unlimited images",
        "Custom ML models",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Pricing header */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-secondary/70 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose the plan that best fits your construction monitoring needs.
              All plans include our core AI-powered construction analysis capabilities.
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <Label htmlFor="billing-toggle" className={`mr-2 ${!billingAnnually ? 'font-medium' : ''}`}>Monthly</Label>
              <Switch
                id="billing-toggle"
                checked={billingAnnually}
                onCheckedChange={setBillingAnnually}
              />
              <div className="ml-2 flex items-center">
                <Label htmlFor="billing-toggle" className={billingAnnually ? 'font-medium' : ''}>Annual</Label>
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                  Save 20%
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`rounded-xl p-1 ${
                    plan.featured 
                      ? 'bg-gradient-to-b from-primary to-primary/60 shadow-lg' 
                      : ''
                  }`}
                >
                  <div className={`h-full rounded-lg bg-card p-6 flex flex-col ${
                    plan.featured ? 'border-0' : 'border'
                  }`}>
                    {plan.featured && (
                      <Badge className="self-start mb-4">Most Popular</Badge>
                    )}
                    
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground mt-2 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${billingAnnually ? plan.annualPrice / 12 : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /month
                      </span>
                      {billingAnnually && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Billed ${plan.annualPrice} annually
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-start text-muted-foreground">
                          <X className="h-5 w-5 text-muted-foreground/70 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`mt-auto ${plan.featured ? '' : 'bg-primary/90 hover:bg-primary'}`}
                      size="lg"
                      asChild
                    >
                      <Link to={plan.name === "Enterprise" ? "/contact" : "/auth?type=register"}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Do you offer a free trial?</h3>
                <p className="text-muted-foreground">Yes, we offer a 14-day free trial on all plans so you can test our platform before committing.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">What types of construction projects are supported?</h3>
                <p className="text-muted-foreground">Our platform currently supports various building construction projects including residential, commercial, and industrial buildings.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">How accurate is the AI analysis?</h3>
                <p className="text-muted-foreground">Our AI models achieve an average accuracy of 90-95% for construction stage identification, depending on image quality and construction type.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
