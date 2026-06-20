// client\src\pages\App\Reports.tsx
import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Eye,
  Trash2,
  Search,
  Download,
  ArrowRight,
  X,
  AlertTriangle,
  Plus,
  Loader2,
  CheckCircle,
  Lightbulb,
  Target,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScoreCircle } from "@/components/ResumeAnalysis/ScoreCircle";
import { reportsApi } from "@/services/api/reports";
import { useNavigate } from "react-router-dom";
import { Report, Job } from "@/types";
import toast from "react-hot-toast";
import { formatText } from "@/components/utils/formatText";
import JobsSection from "@/components/ResumeAnalysis/JobsSection";
import { downloadAsPDF } from "@/components/utils/exportUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Helper function to ensure data is an array
const ensureArray = (data: any): any[] => {
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch reports on mount and when page changes
  useEffect(() => {
    fetchReports();
  }, [currentPage, searchTerm]);

  // Fetch reports
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await reportsApi.getAllReports(currentPage, 6, searchTerm);
      setReports(response.reports);
      // console.log(response);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error("Failed to load reports");
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete report
  const handleDeleteReport = async (reportId: string) => {
    try {
      await reportsApi.deleteReport(reportId);
      toast.success("Report deleted successfully!");
      fetchReports();
    } catch (error: any) {
      toast.error("Failed to delete report");
    }
  };

  // Navigate to analyzer dashboard
  const onAnalyzerDashboard = () => {
    navigate("/upload-resume");
  };

  // Download report
  const handleDownloadReport = async (
    report: Report,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    // PDF export logic
    await downloadAsPDF(
      report.improved_text || "No improved resume content available.",
      `Improved_Resume_${report.file_name.replace(/\.[^/.]+$/, "")}`
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle delete confirmation
  const confirmDelete = (reportId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setReportToDelete(reportId);
    setIsDeleteDialogOpen(true);
  };

  // Execute delete after confirmation
  const executeDelete = () => {
    if (reportToDelete) {
      handleDeleteReport(reportToDelete);
      setReportToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <main>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Your Reports</h1>
            <p className="text-muted-foreground text-md">
              View all your previously analyzed resumes
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex gap-4">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={onAnalyzerDashboard}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Analyze New Resume
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 gap-2">
            <Loader2 className="w-4 h-4" />
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "No reports match your search."
                : "Analyze your first resume to see reports here."}
            </p>
            {!searchTerm && (
              <Button
                onClick={onAnalyzerDashboard}
                className="gap-2"
              >
                Analyze Resume
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {report.overall_score}
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {report.file_name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(report.created_at)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => handleDownloadReport(report, e)}
                          className="flex-shrink-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download Report</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) =>  confirmDelete(report.id, e)}
                          className="flex-shrink-0 text-red-500 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Report</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="w-full max-w-4xl mx-4 max-h-[90vh] rounded-xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b p-6 flex items-center justify-between">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {selectedReport.file_name}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedReport(null)}
                className="ml-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <ScoreCircle score={selectedReport.overall_score} />
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {/* <TabsTrigger value="skills">Skill Gap</TabsTrigger> */}
                    <TabsTrigger value="interview">Interview Questions</TabsTrigger>
                    <TabsTrigger value="improved">Improved Resume</TabsTrigger>
                    <TabsTrigger value="jobs">Job Matches</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Strengths */}
                    {ensureArray(selectedReport.strengths).length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          Strengths
                        </h3>
                        <div className="grid gap-2">
                          {ensureArray(selectedReport.strengths).map((item: string, i: number) => (
                            <div key={i} className="bg-green-50 p-3 rounded-lg text-sm border border-green-100">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Weaknesses */}
                    {ensureArray(selectedReport.weaknesses).length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-5 h-5" />
                          Areas for Improvement
                        </h3>
                        <div className="grid gap-2">
                          {ensureArray(selectedReport.weaknesses).map((item: string, i: number) => (
                            <div key={i} className="bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {ensureArray(selectedReport.tips).length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-blue-600">
                          <Lightbulb className="w-5 h-5" />
                          Quick Tips
                        </h3>
                        <div className="grid gap-2">
                          {ensureArray(selectedReport.tips).map((item: string, i: number) => (
                            <div key={i} className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-100">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* General Feedback */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Detailed Feedback</h3>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {selectedReport.feedback}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    {ensureArray(selectedReport.skill_gap).length > 0 ? (
                      <div className="grid gap-4">
                        {ensureArray(selectedReport.skill_gap).map((skill: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                            <div className="flex items-center gap-3">
                              <Target className="w-5 h-5 text-primary" />
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <Badge variant={skill.priority === 'High' ? 'destructive' : 'secondary'}>
                              {skill.priority} Priority
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No skill gap analysis available.
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="interview" className="space-y-4">
                    {ensureArray(selectedReport.interview_prep).length > 0 ? (
                      <div className="space-y-4">
                        {ensureArray(selectedReport.interview_prep).map((item: any, i: number) => (
                          <div key={i} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start gap-3">
                              <MessageSquare className="w-5 h-5 text-primary mt-1" />
                              <div>
                                <h4 className="font-semibold mb-1">Q: {item.question}</h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                  A: {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No interview preparation questions available.
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="improved">
                    <div className="bg-muted/50 rounded-lg p-4 max-h-[60vh] overflow-y-auto border">
                      <pre className="text-sm whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                        {formatText(selectedReport.improved_text)}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="jobs">
                    {/* Job Matches Tab */}
                    {(() => {
                      const getProcessedJobs = () => {
                        const data = selectedReport.job_recommendations;
                        let allJobs: any[] = [];

                        // Handle stringified JSON
                        if (typeof data === 'string') {
                          try {
                            const parsed = JSON.parse(data);
                            if (parsed && parsed.aggregated) {
                              allJobs = parsed.aggregated;
                            } else if (Array.isArray(parsed)) {
                              allJobs = parsed;
                            }
                          } catch (e) {
                            console.error("Failed to parse jobs", e);
                            return [];
                          }
                        }
                        // Handle distinct object structure
                        else if (typeof data === 'object' && data !== null) {
                          if ((data as any).aggregated) {
                            allJobs = (data as any).aggregated;
                          } else if (Array.isArray(data)) {
                            allJobs = data;
                          }
                        }

                        // Filter logic (same as ResumeAnalysis)
                        const linkedInJobs = allJobs.filter((job: any) => job.apply_options?.publisher === 'LinkedIn');
                        const indeedJobs = allJobs.filter((job: any) => job.apply_options?.publisher === 'Indeed');

                        // If no publisher match found but we have jobs, maybe just show them under 'Other' or 'All'
                        // But for now sticking to user request to mimic ResumeAnalysis

                        if (linkedInJobs.length === 0 && indeedJobs.length === 0 && allJobs.length > 0) {
                          // Fallback if structure is different
                          return [{ source: 'Recommended', jobs: allJobs }];
                        }

                        return [
                          { source: 'LinkedIn', jobs: linkedInJobs },
                          { source: 'Indeed', jobs: indeedJobs }
                        ].filter(group => group.jobs.length > 0);
                      };

                      const processedJobs = getProcessedJobs();

                      return processedJobs.length > 0 ? (
                        <div className="mt-4">
                          <JobsSection jobs={processedJobs} />
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                          No job matches found in this report.
                        </div>
                      );
                    })()}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="border-t flex justify-end p-6 bg-gray-50">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedReport(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={(e) => handleDownloadReport(selectedReport, e)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Improved Version
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirm Delete
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? This action cannot be undone and all associated data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reports;