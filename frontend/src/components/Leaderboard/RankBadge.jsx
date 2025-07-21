import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Renders a badge based on the user's rank.
 * Top 3 ranks receive special colored badges.
 * Others receive a neutral badge with their rank number.
 */
export default function RankBadge({ rank, className }) {
  /**
   * Returns the badge styles based on the rank.
   * Gold, Silver, and Bronze colors are applied to ranks 1-3.
   */
  const getBadgeStyle = () => {
    const baseClasses =
      "inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-white shadow-md";

    switch (rank) {
      case 1:
        return cn(
          baseClasses,
          "bg-gradient-to-br from-yellow-400 to-yellow-500",
          "shadow-[0_0_8px_rgba(234,179,8,0.6)]",
          className
        );
      case 2:
        return cn(
          baseClasses,
          "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800",
          "shadow-[0_0_8px_rgba(209,213,219,0.6)]",
          className
        );
      case 3:
        return cn(
          baseClasses,
          "bg-gradient-to-br from-amber-500 to-amber-600",
          "shadow-[0_0_8px_rgba(217,119,6,0.6)]",
          className
        );
      default:
        return cn(baseClasses, "bg-gray-100 text-gray-800", className);
    }
  };

  /**
   * Returns a label for tooltip display based on the rank.
   */
  const getRankLabel = () => {
    switch (rank) {
      case 1:
        return "Gold Medal (1st Place)";
      case 2:
        return "Silver Medal (2nd Place)";
      case 3:
        return "Bronze Medal (3rd Place)";
      default:
        return `Rank ${rank}`;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={getBadgeStyle()}>{rank}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{getRankLabel()}</p>
      </TooltipContent>
    </Tooltip>
  );
}
