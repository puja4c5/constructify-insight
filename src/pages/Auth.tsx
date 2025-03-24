
import { Link } from "react-router-dom";
import AuthForms from "@/components/auth/AuthForms";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <div className="container flex flex-col flex-1 items-center justify-center py-12 px-4">
        <Link to="/" className="mb-8 flex items-center">
          <span className="sr-only">Back to homepage</span>
          <span className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center mr-2">CI</span>
          <span className="text-xl font-bold">ConstructInsight</span>
        </Link>
        
        <AuthForms />
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;
