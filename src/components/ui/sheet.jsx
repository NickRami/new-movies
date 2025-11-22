import * as React from "react"
import { cn } from "../../lib/utils"

const Sheet = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed z-50 gap-4 bg-background p-6 shadow-lg transition", className)}
    {...props}
  />
))
Sheet.displayName = "Sheet"

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef(({ className, children, side = "left", ...props }, ref) => (
  <Sheet
    ref={ref}
    className={cn(
      "inset-y-0 z-50 w-3/4 border-r sm:max-w-sm",
      side === "left" && "left-0",
      side === "right" && "right-0",
      className
    )}
    {...props}
  >
    {children}
  </Sheet>
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetOverlay, SheetContent }

