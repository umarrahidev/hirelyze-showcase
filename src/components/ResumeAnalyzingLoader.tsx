import { useState, useEffect } from "react";
import { FileText, Check, ScanText, Award, Sparkles, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Loader Types & Config ────────────────────────────────────────────────────

type StageStatus = "pending" | "active" | "done";

interface LoaderStage {
    icon: React.ReactNode;
    label: string;
    tip: string;
}

const LOADER_STAGES: LoaderStage[] = [
    {
        icon: <ScanText className="w-3 h-3" />,
        label: "Parsing document structure",
        tip: "💡 Clear section headers help ATS scanners",
    },
    {
        icon: <Award className="w-3 h-3" />,
        label: "Extracting skills & experience",
        tip: "💡 Quantify achievements with numbers",
    },
    {
        icon: <Sparkles className="w-3 h-3" />,
        label: "Running ATS compatibility check",
        tip: "💡 Match job description keywords closely",
    },
    {
        icon: <BarChart2 className="w-3 h-3" />,
        label: "Generating improvement report",
        tip: "✅ Almost done...",
    },
];

const STAGE_PROGRESS = [25, 55, 80, 95];
const STAGE_DELAY_MS = 2400;

// ─── Loader Sub-components ────────────────────────────────────────────────────

function StageDot({ status, icon }: { status: StageStatus; icon: React.ReactNode }) {
    return (
        <div
            className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                status === "done" && "bg-green-100 text-green-600",
                status === "active" && "bg-blue-100 text-blue-600 animate-pulse",
                status === "pending" && "bg-muted text-muted-foreground"
            )}
        >
            {status === "done" ? <Check className="w-3 h-3" /> : icon}
        </div>
    );
}

function StageRow({
    stage,
    status,
    delay,
}: {
    stage: LoaderStage;
    status: StageStatus;
    delay: number;
}) {
    return (
        <div
            className="flex items-center gap-2.5 py-2 animate-in fade-in slide-in-from-bottom-1"
            style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
        >
            <StageDot status={status} icon={stage.icon} />
            <span
                className={cn(
                    "text-[13px] transition-colors duration-300",
                    status === "done" && "text-green-600",
                    status === "active" && "text-foreground font-medium",
                    status === "pending" && "text-muted-foreground"
                )}
            >
                {stage.label}
            </span>
        </div>
    );
}

// ─── Main Loader Component ────────────────────────────────────────────────────

interface ResumeAnalyzingLoaderProps {
    onComplete?: () => void; // Optional callback when analysis completes
}

export function ResumeAnalyzingLoader({ onComplete }: ResumeAnalyzingLoaderProps = {}) {
    const [currentStep, setCurrentStep] = useState(-1);
    const [progress, setProgress] = useState(0);
    const [tip, setTip] = useState("💡 Keywords matter most for ATS systems");

    const statuses: StageStatus[] = LOADER_STAGES.map((_, i) => {
        if (i < currentStep) return "done";
        if (i === currentStep) return "active";
        return "pending";
    });

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        function advance(step: number) {
            if (step >= LOADER_STAGES.length) return;

            setCurrentStep(step);
            setProgress(STAGE_PROGRESS[step]);
            setTimeout(() => setTip(LOADER_STAGES[step].tip), 300);

            // Keep cycling through stages but don't finish — 
            // the real API call controls when the loader unmounts
            if (step < LOADER_STAGES.length - 1) {
                timeout = setTimeout(() => advance(step + 1), STAGE_DELAY_MS);
            } else {
                // Optional: call onComplete when reaching the last stage
                onComplete?.();
            }
            // Last stage stays "active" until parent unmounts this component
        }

        timeout = setTimeout(() => advance(0), 400);
        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card rounded-2xl p-8 border shadow-2xl max-w-sm w-full mx-4 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-50 flex items-center justify-center relative">
                    <div className="absolute inset-[-4px] rounded-full border-2 border-blue-400/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin" />
                    <FileText className="w-6 h-6 text-blue-600 relative z-10" />
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-semibold mb-1">
                    Analyzing Your Resume
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                    This usually takes 10–15 seconds
                </p>

                {/* Progress bar */}
                <div className="mb-5 text-left">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-700 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Stages */}
                <div className="border rounded-xl px-4 py-1 mb-4 text-left">
                    {LOADER_STAGES.map((stage, i) => (
                        <div key={i}>
                            <StageRow stage={stage} status={statuses[i]} delay={i * 60} />
                            {i < LOADER_STAGES.length - 1 && (
                                <div className="w-px h-2.5 bg-border ml-[9px]" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Rotating tip */}
                <p
                    key={tip}
                    className="text-xs text-muted-foreground animate-in fade-in slide-in-from-bottom-1 duration-300"
                >
                    {tip}
                </p>
            </div>
        </div>
    );
}

export default ResumeAnalyzingLoader;