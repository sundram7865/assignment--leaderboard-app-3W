import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

export default function LeaderFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Today</DropdownMenuItem>
        <DropdownMenuItem>This Week</DropdownMenuItem>
        <DropdownMenuItem>This Month</DropdownMenuItem>
        <DropdownMenuItem>All Time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}