// client\src\components\ScoreCircle.tsx
import { Card, CardContent } from "@/components/ui/card";

interface ScoreCircleProps {
  score: number;
}

export const ScoreCircle = ({ score }: ScoreCircleProps) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="flex flex-col items-center gap-4 rounded-2xl p-6 border shadow-sm">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="hsl(var(--primary))"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDashoffset={offset}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gradient">
            {score}
          </span>
          <span className="text-sm text-muted-foreground">out of 100</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold">Overall Score</h3>
    </Card>
  );
};