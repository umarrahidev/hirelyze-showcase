// client\src\components\ResumeAnalysis\InterviewPrepSection.tsx
import { MessageSquare, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InterviewPrepSectionProps {
  delay?: number;
  interviewPrep?: { question: string; answer: string }[];
}

const InterviewPrepSection = ({ delay = 0, interviewPrep }: InterviewPrepSectionProps) => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const questions = interviewPrep || [];

  if (questions.length === 0) return null;

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="rounded-2xl p-8 shadow-sm">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Interview Prep Questions</CardTitle>
            <p className="text-muted-foreground">
              AI-generated questions based on your resume
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-3">
          {questions.map((item, index) => (
            <Collapsible
              key={index}
              open={openQuestions.includes(index)}
              onOpenChange={() => toggleQuestion(index)}
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className="flex items-center justify-between p-4 rounded-lg bg-background border border-input hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="font-medium text-card-foreground">{item.question}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${openQuestions.includes(index) ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 ml-11 bg-muted/50 rounded-lg mt-2 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">💡 Answer Key:</span> {item.answer}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewPrepSection;
