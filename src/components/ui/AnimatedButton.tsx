
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({
  children,
  className,
  to,
  variant = "default",
  size = "default",
  onClick,
  disabled,
  type = "button",
}: AnimatedButtonProps) => {
  const classes = cn(
    "relative overflow-hidden transition-all duration-300 ease-out group hover:shadow-md",
    "after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-10",
    className
  );

  if (to) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={classes} 
        asChild
        disabled={disabled}
      >
        <Link to={to}>
          <span className="relative z-10">{children}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default AnimatedButton;
