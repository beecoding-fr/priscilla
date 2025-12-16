"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          success:
            "!group-[.toaster]:bg-white !group-[.toaster]:text-[oklch(0.45_0.16_250)] !group-[.toaster]:border-[oklch(0.45_0.16_250)] [&>svg]:!text-[oklch(0.45_0.16_250)]",
          error:
            "!group-[.toaster]:bg-white !group-[.toaster]:text-destructive !group-[.toaster]:border-destructive [&>svg]:!text-destructive",
          warning:
            "!group-[.toaster]:bg-white !group-[.toaster]:text-warning-foreground !group-[.toaster]:border-warning [&>svg]:!text-warning",
          info: "!group-[.toaster]:bg-white !group-[.toaster]:text-[oklch(0.45_0.16_250)] !group-[.toaster]:border-[oklch(0.45_0.16_250)] [&>svg]:!text-[oklch(0.45_0.16_250)]",
        },
      }}
      style={
        {
          "--normal-bg": "white",
          "--normal-text": "oklch(0.15 0.015 250)",
          "--normal-border": "oklch(0.92 0.008 250)",
          "--border-radius": "0.625rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
