import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

/**
 * LeaderFilter component
 * Provides a dropdown filter for leaderboard view (e.g., Today, Week, Month)
 */
export default function LeaderFilter() {
  return (
    <DropdownMenu>
      {/* Trigger button with icon */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto gap-1"
          aria-label="Filter leaderboard"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown options */}
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Today</DropdownMenuItem>
        <DropdownMenuItem>This Week</DropdownMenuItem>
        <DropdownMenuItem>This Month</DropdownMenuItem>
        <DropdownMenuItem>All Time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
