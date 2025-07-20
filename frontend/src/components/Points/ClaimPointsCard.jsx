import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserDropdown from "../users/UserDropdown";

export default function ClaimPointsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Your Points</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserDropdown />
        <Button className="w-full">🎯 Claim Random Points</Button>
        <p className="text-sm text-muted-foreground">
          Points will be awarded between 1-10 randomly
        </p>
      </CardContent>
    </Card>
  );
}