// // client\src\pages\App\ResumeAnalysis.tsx
// import { useState } from "react";
// import { UploadCard } from "@/components/ResumeAnalysis/UploadCard";
// import { ScoreCircle } from "@/components/ResumeAnalysis/ScoreCircle";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//     FileText,
//     Download,
//     RotateCcw,
//     Zap,
//     Sparkles,
//     Check,
//     Briefcase,
// } from "lucide-react";
// import AnalysisSection from "@/components/ResumeAnalysis/AnalysisSection";
// import InterviewPrepSection from "@/components/ResumeAnalysis/InterviewPrepSection";
// import JobsSection from "@/components/ResumeAnalysis/JobsSection";
// import { resumeApi } from "@/services/api/resume";
// import { AnalysisResult } from "@/types";
// import toast from "react-hot-toast";
// import { formatText } from "@/components/utils/formatText";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { downloadAsPDF } from "@/components/utils/exportUtils";

// const ResumeAnalysis = () => {
//     const { user, quota, refreshQuota } = useAuth();
//     const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
//         null
//     );
//     const [isLoading, setIsLoading] = useState(false);
//     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//     const [jobs, setJobs] = useState<any[]>([]);

//     // Handle file upload
//     const handleFileUpload = async (file: File) => {
//         setUploadedFile(file);
//         setIsLoading(true);

//         try {
//             // Analyze the resume using the new full API
//             const result = await resumeApi.analyzeResumeFull(file);

//             // Construct analysis object from flat response
//             const analysisData: AnalysisResult = {
//                 reportId: result.reportId,
//                 overall_score: typeof result.overall_score === 'string' ? parseInt(result.overall_score) : result.overall_score || 0,
//                 feedback: result.feedback || "Analysis complete.",
//                 improved_text: result.improvedResume,
//                 strengths: result.strengths || [],
//                 weaknesses: result.weaknesses || [],
//                 tips: result.tips || [],
//                 skill_gap: result.skill_gap || [],
//                 interview_prep: result.interview_prep || [],
//                 job_recommendations: result.job_recommendations || [],
//                 // Keep analysisData object for child components that expect it
//                 analysisData: {
//                     strengths: result.strengths || [],
//                     weaknesses: result.weaknesses || [],
//                     tips: result.tips || [],
//                     skill_gap: result.skill_gap || [],
//                     interview_prep: result.interview_prep || [],
//                     job_recommendations: result.job_recommendations || []
//                 },
//             };

//             setAnalysisResult(analysisData);
//             // console.log("Analysis Data:", analysisData);

//             // Process job recommendations (assuming backend returns { aggregated: [...] } or array)
//             let allJobs: any[] = [];
//             if (result.job_recommendations?.aggregated) {
//                 allJobs = result.job_recommendations.aggregated;
//             } else if (Array.isArray(result.job_recommendations)) {
//                 allJobs = result.job_recommendations;
//             }

//             // Filter for LinkedIn and Indeed
//             const linkedInJobs = allJobs.filter((job: any) => job.apply_options?.publisher === 'LinkedIn');
//             const indeedJobs = allJobs.filter((job: any) => job.apply_options?.publisher === 'Indeed');

//             const filteredJobs = [
//                 { source: 'LinkedIn', jobs: linkedInJobs },
//                 { source: 'Indeed', jobs: indeedJobs }
//             ].filter(group => group.jobs.length > 0 || true); // Keep tabs even if empty? User said "keep two tabs for now"

//             setJobs(filteredJobs);
//             // console.log("Filtered Jobs:", filteredJobs);

//             await refreshQuota();
//             toast.success("Resume analyzed and saved!");
//         } catch (error: any) {
//             toast.error("Failed to analyze resume");
//             console.log(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle reset
//     const handleReset = () => {
//         setAnalysisResult(null);
//         setUploadedFile(null);
//         setJobs([]);
//     };

//     // Handle download improved resume
//     const handleDownloadImproved = async () => {
//         await downloadAsPDF(
//             analysisResult?.improved_text || "No improved resume content available.",
//             `Improved_Resume_${uploadedFile?.name.replace(/\.[^/.]+$/, "")}`
//         );
//     };

//     // Get quota percentage
//     const getQuotaPercentage = () => {
//         if (!quota) return 0;
//         return Math.round((quota.used / quota.limit) * 100);
//     };

//     // Get reset time
//     const getResetTime = () => {
//         if (!quota?.resetTime) return "tomorrow";
//         return new Date(quota.resetTime).toLocaleDateString();
//     };

//     return (
//         <div>
//             {/* Loading State */}
//             {isLoading && (
//                 // <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
//                 //     <div className="bg-card rounded-2xl p-8 text-center border shadow-2xl max-w-sm w-full mx-4">
//                 //         <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center relative">
//                 //             <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
//                 //             <FileText className="w-8 h-8 text-primary" />
//                 //         </div>
//                 //         <h3 className="text-xl font-semibold mb-3">
//                 //             Analyzing Your Resume
//                 //         </h3>
//                 //         <p className="text-muted-foreground mb-6">
//                 //             Our AI is carefully reviewing your resume for optimization opportunities...
//                 //         </p>
//                 //         <div className="space-y-2">
//                 //             <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
//                 //                 <div className="h-full gradient-primary rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
//                 //             </div>
//                 //             <div className="flex justify-between text-xs text-muted-foreground">
//                 //                 <span>Processing...</span>
//                 //                 <span>AI Analysis</span>
//                 //             </div>
//                 //         </div>
//                 //     </div>
//                 // </div>
//                 <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
//                     <div className="bg-card rounded-2xl p-8 text-center border shadow-2xl max-w-sm w-full mx-4">
//                         <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center relative">
//                             <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
//                             <FileText className="w-8 h-8 text-primary" />
//                         </div>
//                         <h3 className="text-xl font-semibold mb-3">
//                             Analyzing Your Resume
//                             <span className="inline-flex ml-1">
//                                 <span className="animate-bounce [animation-delay:-0.3s]">.</span>
//                                 <span className="animate-bounce [animation-delay:-0.15s]">.</span>
//                                 <span className="animate-bounce">.</span>
//                             </span>
//                         </h3>
//                         <p className="text-muted-foreground mb-6">
//                             Our AI is carefully reviewing your resume for optimization opportunities...
//                         </p>
//                         <div className="space-y-2">
//                             <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
//                                 <div className="h-full gradient-primary rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
//                             </div>
//                             <div className="flex justify-between text-xs text-muted-foreground">
//                                 <span>Processing...</span>
//                                 <span>AI Analysis</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Quota Display */}
//             {quota && (
//                 <div className="rounded-2xl p-6 mb-8 border shadow-md">
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
//                                 <Zap className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-card-foreground">
//                                     Daily Analysis Quota
//                                 </h3>
//                                 <p className="text-sm text-muted-foreground">
//                                     Resets {getResetTime()}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-6">
//                             <div className="text-center">
//                                 <div className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
//                                     {quota.used}/{quota.limit}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground">
//                                     Used Today
//                                 </div>
//                             </div>

//                             <div className="w-32">
//                                 <div className="flex justify-between text-xs mb-1 text-muted-foreground">
//                                     <span>{getQuotaPercentage()}%</span>
//                                     <span>100%</span>
//                                 </div>
//                                 <div className="w-full bg-muted rounded-full h-2">
//                                     <div
//                                         className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500 shadow-lg"
//                                         style={{ width: `${getQuotaPercentage()}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {!analysisResult ? (
//                 <div className="grid lg:grid-cols-1 gap-8">
//                     {quota && quota.used >= quota.limit ? (
//                         <div className="bg-destructive/10 border border-destructive rounded-2xl p-8 text-center">
//                             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
//                                 <Zap className="w-8 h-8 text-destructive" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-destructive mb-2">
//                                 Quota Exceeded
//                             </h3>
//                             <p className="text-muted-foreground mb-4">
//                                 You have used all your daily analysis quota. Please wait until it resets.
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                                 Quota will reset on {getResetTime()}
//                             </p>
//                         </div>
//                     ) : (
//                         <UploadCard onUpload={handleFileUpload} />
//                     )}
//                 </div>
//             ) : (
//                 <div className="space-y-8">
//                     {/* Header with Score and Actions */}
//                     <div className="bg-card rounded-2xl p-8 border shadow-md">
//                         <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//                             <div className="flex items-center gap-6">
//                                 <ScoreCircle score={analysisResult.overall_score} />
//                                 <div>
//                                     <h2 className="text-3xl font-bold mb-2">
//                                         Analysis Complete!
//                                     </h2>
//                                     <p className="text-muted-foreground mb-4">
//                                         Your resume scored {analysisResult.overall_score}/100
//                                     </p>
//                                     <div className="flex gap-3 flex-wrap">
//                                         <Button
//                                             onClick={handleDownloadImproved}
//                                         >
//                                             <Download className="w-4 h-4" />
//                                             Download Improved Version
//                                         </Button>
//                                         <Button
//                                             onClick={handleReset}
//                                             variant="outline"
//                                         >
//                                             <RotateCcw className="w-4 h-4" />
//                                             Analyze Another
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Analysis Results Grid (Strengths, Weaknesses, Tips) */}
//                     <div className="grid lg:grid-cols-3 gap-6">
//                         <AnalysisSection
//                             title="Strengths"
//                             items={analysisResult.analysisData?.strengths}
//                             type="strengths"
//                         />
//                         <AnalysisSection
//                             title="Areas for Improvement"
//                             items={analysisResult.analysisData?.weaknesses}
//                             type="weaknesses"
//                         />
//                         <AnalysisSection
//                             title="Quick Tips"
//                             items={analysisResult.analysisData?.tips}
//                             type="tips"
//                         />
//                     </div>

//                     {/* Feedback Section */}
//                     <div className="grid lg:grid-cols-1 gap-8">
//                         {/* <Card className="rounded-2xl p-6">
//                             <CardHeader className="p-0 mb-4">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                                         <Sparkles className="w-6 h-6 text-primary" />
//                                     </div>
//                                     <CardTitle className="text-2xl font-bold">
//                                         Detailed Feedback
//                                     </CardTitle>
//                                 </div>
//                             </CardHeader>
//                             <CardContent className="p-0">
//                                 <div className="text-foreground space-y-3">
//                                     {formatText(analysisResult?.feedback)}
//                                 </div>
//                             </CardContent>
//                         </Card> */}

//                         <Card className="rounded-2xl p-6">
//                             <CardHeader className="p-0 mb-4">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                                             <Check className="w-6 h-6 text-primary" />
//                                         </div>
//                                         <CardTitle className="text-2xl font-bold">
//                                             Improved Resume
//                                         </CardTitle>
//                                     </div>
//                                     <Button
//                                         onClick={handleDownloadImproved}
//                                         size="sm"
//                                     >
//                                         <Download className="w-4 h-4" />
//                                         Export as PDF
//                                     </Button>
//                                 </div>
//                             </CardHeader>
//                             <CardContent className="p-0">
//                                 <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto border">
//                                     <pre className="text-sm whitespace-pre-wrap font-sans text-foreground leading-relaxed">
//                                         {formatText(analysisResult.improved_text)}
//                                     </pre>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {/* Job Recommendations Section */}
//                     {jobs.length > 0 && (
//                         <JobsSection jobs={jobs} />
//                     )}

//                     {/* Additional Sections */}
//                     <div className="grid lg:grid-cols-1 gap-8">
//                         {/* <SkillGapSection analysisData={analysisResult.analysisData} /> */}
//                         <InterviewPrepSection interviewPrep={analysisResult.analysisData?.interview_prep} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResumeAnalysis;

// ========================================= xxxxxxxxxxxx ======================================

import { useState, useEffect } from "react";
import { UploadCard } from "@/components/ResumeAnalysis/UploadCard";
import { ScoreCircle } from "@/components/ResumeAnalysis/ScoreCircle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
    FileText,
    Download,
    RotateCcw,
    Zap,
    Check,
    ScanText,
    Award,
    Sparkles,
    BarChart2,
} from "lucide-react";
import AnalysisSection from "@/components/ResumeAnalysis/AnalysisSection";
import InterviewPrepSection from "@/components/ResumeAnalysis/InterviewPrepSection";
import JobsSection from "@/components/ResumeAnalysis/JobsSection";
import { resumeApi } from "@/services/api/resume";
import { AnalysisResult } from "@/types";
import toast from "react-hot-toast";
import { formatText } from "@/components/utils/formatText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { downloadAsPDF } from "@/components/utils/exportUtils";
import { ResumeAnalyzingLoader } from "@/components/ResumeAnalyzingLoader";

const ResumeAnalysis = () => {
    const { user, quota, refreshQuota } = useAuth();
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [jobs, setJobs] = useState<any[]>([]);

    const handleFileUpload = async (file: File) => {
        setUploadedFile(file);
        setIsLoading(true);

        try {
            const result = await resumeApi.analyzeResumeFull(file);

            const analysisData: AnalysisResult = {
                reportId: result.reportId,
                overall_score:
                    typeof result.overall_score === "string"
                        ? parseInt(result.overall_score)
                        : result.overall_score || 0,
                feedback: result.feedback || "Analysis complete.",
                improved_text: result.improvedResume,
                strengths: result.strengths || [],
                weaknesses: result.weaknesses || [],
                tips: result.tips || [],
                skill_gap: result.skill_gap || [],
                interview_prep: result.interview_prep || [],
                job_recommendations: result.job_recommendations || [],
                analysisData: {
                    strengths: result.strengths || [],
                    weaknesses: result.weaknesses || [],
                    tips: result.tips || [],
                    skill_gap: result.skill_gap || [],
                    interview_prep: result.interview_prep || [],
                    job_recommendations: result.job_recommendations || [],
                },
            };

            setAnalysisResult(analysisData);

            let allJobs: any[] = [];
            if (result.job_recommendations?.aggregated) {
                allJobs = result.job_recommendations.aggregated;
            } else if (Array.isArray(result.job_recommendations)) {
                allJobs = result.job_recommendations;
            }

            const linkedInJobs = allJobs.filter(
                (job: any) => job.apply_options?.publisher === "LinkedIn"
            );
            const indeedJobs = allJobs.filter(
                (job: any) => job.apply_options?.publisher === "Indeed"
            );

            setJobs([
                { source: "LinkedIn", jobs: linkedInJobs },
                { source: "Indeed", jobs: indeedJobs },
            ]);

            await refreshQuota();
            toast.success("Resume analyzed and saved!");
        } catch (error: any) {
            toast.error("Failed to analyze resume");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
        setUploadedFile(null);
        setJobs([]);
    };

    const handleDownloadImproved = async () => {
        await downloadAsPDF(
            analysisResult?.improved_text || "No improved resume content available.",
            `Improved_Resume_${uploadedFile?.name.replace(/\.[^/.]+$/, "")}`
        );
    };

    const getQuotaPercentage = () => {
        if (!quota) return 0;
        return Math.round((quota.used / quota.limit) * 100);
    };

    const getResetTime = () => {
        if (!quota?.resetTime) return "tomorrow";
        return new Date(quota.resetTime).toLocaleDateString();
    };

    return (
        <div>
            {/* ── New Staged Loader ── */}
            {isLoading && <ResumeAnalyzingLoader />}

            {/* ── Quota Display ── */}
            {quota && (
                <div className="rounded-2xl p-6 mb-8 border shadow-md">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">
                                    Daily Analysis Quota
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Resets {getResetTime()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
                                    {quota.used}/{quota.limit}
                                </div>
                                <div className="text-sm text-muted-foreground">Used Today</div>
                            </div>

                            <div className="w-32">
                                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                                    <span>{getQuotaPercentage()}%</span>
                                    <span>100%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500 shadow-lg"
                                        style={{ width: `${getQuotaPercentage()}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Upload or Results ── */}
            {!analysisResult ? (
                <div className="grid lg:grid-cols-1 gap-8">
                    {quota && quota.used >= quota.limit ? (
                        <div className="bg-destructive/10 border border-destructive rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-destructive" />
                            </div>
                            <h3 className="text-2xl font-bold text-destructive mb-2">
                                Quota Exceeded
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                You have used all your daily analysis quota. Please wait until it resets.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Quota will reset on {getResetTime()}
                            </p>
                        </div>
                    ) : (
                        <UploadCard onUpload={handleFileUpload} />
                    )}
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Header with Score and Actions */}
                    <div className="bg-card rounded-2xl p-8 border shadow-md">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <ScoreCircle score={analysisResult.overall_score} />
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Your resume scored {analysisResult.overall_score}/100
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Button onClick={handleDownloadImproved}>
                                            <Download className="w-4 h-4" />
                                            Download Improved Version
                                        </Button>
                                        <Button onClick={handleReset} variant="outline">
                                            <RotateCcw className="w-4 h-4" />
                                            Analyze Another
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Strengths / Weaknesses / Tips */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        <AnalysisSection
                            title="Strengths"
                            items={analysisResult.analysisData?.strengths}
                            type="strengths"
                        />
                        <AnalysisSection
                            title="Areas for Improvement"
                            items={analysisResult.analysisData?.weaknesses}
                            type="weaknesses"
                        />
                        <AnalysisSection
                            title="Quick Tips"
                            items={analysisResult.analysisData?.tips}
                            type="tips"
                        />
                    </div>

                    {/* Improved Resume */}
                    <div className="grid lg:grid-cols-1 gap-8">
                        <Card className="rounded-2xl p-6">
                            <CardHeader className="p-0 mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Check className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold">
                                            Improved Resume
                                        </CardTitle>
                                    </div>
                                    <Button onClick={handleDownloadImproved} size="sm">
                                        <Download className="w-4 h-4" />
                                        Export as PDF
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto border">
                                    <pre className="text-sm whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                                        {formatText(analysisResult.improved_text)}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Job Recommendations */}
                    {jobs.length > 0 && <JobsSection jobs={jobs} />}

                    {/* Interview Prep */}
                    <div className="grid lg:grid-cols-1 gap-8">
                        <InterviewPrepSection
                            interviewPrep={analysisResult.analysisData?.interview_prep}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeAnalysis;