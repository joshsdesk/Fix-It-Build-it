import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border text-card-foreground shadow-sm transition-all text-left",
  {
    variants: {
      variant: {
        default: "bg-white/5 border-white/10",
        wizard: "bg-black/40 backdrop-blur-xl border-white/10 rounded-3xl shadow-2xl p-6 md:p-10",
        "wizard-selectable": "bg-white/5 border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 cursor-pointer min-h-[48px]",
        "wizard-selected": "bg-fibi-purple/20 border-fibi-purple min-h-[48px]",
        recommendation: "bg-fibi-purple/10 border-fibi-purple/20 p-8",
        gate: "bg-black/60 border-fibi-purple/30 p-8 backdrop-blur-md"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
