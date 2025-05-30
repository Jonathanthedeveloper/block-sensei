import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn(className)}>
      <img
        src="/logo.png"
        className="h-full w-auto object-contain"
        alt="Block sensei logo"
      />
    </Link>
  );
}
