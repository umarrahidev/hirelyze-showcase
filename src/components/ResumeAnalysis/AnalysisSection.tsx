// // client\src\components\AnalysisSection.tsx
// import { CheckCircle2, XCircle, Lightbulb, LucideIcon } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface AnalysisSectionProps {
//   title: string;
//   items: string[];
//   type: "strengths" | "weaknesses" | "tips";
//   delay?: number;
// }

// const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
//   strengths: {
//     icon: CheckCircle2,
//     color: "text-emerald-600 dark:text-emerald-400",
//     bg: "bg-emerald-100 dark:bg-emerald-500/10",
//   },
//   weaknesses: {
//     icon: XCircle,
//     color: "text-red-600 dark:text-red-400",
//     bg: "bg-red-100 dark:bg-red-500/10",
//   },
//   tips: {
//     icon: Lightbulb,
//     color: "text-amber-600 dark:text-amber-400",
//     bg: "bg-amber-100 dark:bg-amber-500/10",
//   },
// };

// const AnalysisSection = ({ title, items, type, delay = 0 }: AnalysisSectionProps) => {
//   const { icon: Icon, color, bg } = iconMap[type];

//   return (
//     <Card className="rounded-2xl p-6 border shadow-sm">
//       <CardHeader className="p-0 mb-4">
//         <div className="flex items-center gap-3">
//           <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
//             <Icon className={`w-5 h-5 ${color}`} />
//           </div>
//           <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ul className="space-y-3">
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-start gap-3 p-3 rounded-md border border-input bg-background hover:bg-accent/50 transition-colors"
//             >
//               <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} />
//               <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// };

// export default AnalysisSection;

// client/src/components/AnalysisSection.tsx
import { CheckCircle2, XCircle, Lightbulb, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisSectionProps {
  title: string;
  items: string[];
  type: "strengths" | "weaknesses" | "tips";
  delay?: number;
}

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  strengths: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
  },
  weaknesses: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-500/10",
  },
  tips: {
    icon: Lightbulb,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-500/10",
  },
};

const AnalysisSection = ({ title, items, type, delay = 0 }: AnalysisSectionProps) => {
  const { icon: Icon, color, bg } = iconMap[type];

  return (
    <Card className="rounded-2xl p-6 border shadow-sm">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-md border border-input bg-background hover:bg-accent/50 transition-colors"
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} />
              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AnalysisSection;