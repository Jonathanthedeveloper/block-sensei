import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type AccordionContextValue = {
  value: string | null;
  onValueChange: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined
);

interface AccordionProps {
  type: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Accordion = ({
  type = "single",
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange: onControlledValueChange,
  children,
  className,
}: AccordionProps) => {
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue || null
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = (value: string) => {
    if (isControlled) {
      onControlledValueChange?.(value);
    } else {
      if (value === currentValue && collapsible) {
        setInternalValue(null);
      } else {
        setInternalValue(value);
      }
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={cn("space-y-1", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem = ({
  value,
  children,
  className,
}: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border border-border rounded-md", className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger = ({
  children,
  className,
}: AccordionTriggerProps) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { value: contextValue, onValueChange } = context;
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { value } = itemContext;
  const isOpen = contextValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={cn(
        "flex justify-between w-full font-medium text-left py-4 px-5 hover:bg-muted/10 transition-all",
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen ? "transform rotate-180" : ""
        )}
      />
    </button>
  );
};

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext = createContext<
  AccordionItemContextValue | undefined
>(undefined);

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent = ({
  children,
  className,
}: AccordionContentProps) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { value: contextValue } = context;
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { value } = itemContext;
  const isOpen = contextValue === value;

  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        isOpen ? "max-h-full" : "max-h-0"
      )}
      aria-hidden={!isOpen}
    >
      {isOpen && <div className={cn("pb-4 pt-0", className)}>{children}</div>}
    </div>
  );
};
