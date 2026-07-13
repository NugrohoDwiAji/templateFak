import { type HTMLAttributes } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
}

function Alert({ variant = "info", className, children, ...props }: AlertProps) {
  const variants = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Info className="h-4 w-4" />,
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="h-4 w-4" />,
    },
  };

  const config = variants[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        config.container,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export { Alert };
