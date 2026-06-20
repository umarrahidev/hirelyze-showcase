import { Code, Database, Cloud, Palette, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillGapSectionProps {
  analysisData?: {
    strengths?: string[];
    weaknesses?: string[];
    tips?: string[];
    skillGap?: { name: string; type: string; priority: string }[];
  };
  delay?: number;
}

const SkillGapSection = ({ analysisData, delay = 0 }: SkillGapSectionProps) => {
  // Use dynamic skill gap data if available, otherwise fallback to parsing weaknesses
  const missingSkills = analysisData?.skillGap?.map(skill => ({
    name: skill.name,
    priority: skill.priority,
    icon: Code // Default icon, logic below can refine this
  })) || (analysisData?.weaknesses || []).map((weakness, index) => {
    // Extract skill name from weakness description
    const skillName = weakness.replace("Could benefit from", "").replace("Missing experience with", "").trim();
    const priority = index < 2 ? "High" : index < 4 ? "Medium" : "Low";
    return {
      name: skillName,
      priority,
      icon: Code
    };
  });

  // Map icons
  const skillsWithIcons = missingSkills.map(skill => {
    const iconMap: Record<string, any> = {
      "backend": Cloud,
      "typescript": Code,
      "containerization": Cloud,
      "design": Palette,
      "leadership": Users,
      "react": Code,
      "database": Database,
      "node": Cloud,
      "python": Code,
      "mysql": Database,
      "mongodb": Database,
      "javascript": Code,
      "html": Code,
      "css": Code,
      "bootstrap": Code,
      "tailwind": Code,
    };

    const matchedIcon = Object.keys(iconMap).find(key => skill.name.toLowerCase().includes(key));
    return {
      ...skill,
      icon: matchedIcon ? iconMap[matchedIcon] : Code
    };
  });

  return (
    <Card className="rounded-2xl p-8 shadow-sm">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Skill Gap Analysis</CardTitle>
            <p className="text-muted-foreground">
              Skills that could boost your marketability
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 mb-6">
          {skillsWithIcons.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <skill.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${skill.priority === "High"
                      ? "bg-destructive/10 text-destructive"
                      : skill.priority === "Medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {skill.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapSection;