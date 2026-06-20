// client\src\components\JobMatchCard.tsx
import { Briefcase, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface JobMatchCardProps {
  title: string;
  matchScore: number;
  company?: string;
  salary?: string;
  delay?: number;
}

export const JobMatchCard = ({ title, matchScore, company, salary, delay = 0 }: JobMatchCardProps) => {
  return (
    <Card className="rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 min-w-[280px] cursor-pointer group">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-2xl font-bold text-primary">{matchScore}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {company && (
          <p className="text-sm text-muted-foreground mb-1">{company}</p>
        )}
        
        {salary && (
          <p className="text-sm font-medium text-card-foreground">{salary}</p>
        )}
        
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};