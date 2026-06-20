import { Briefcase, MapPin, Building2, DollarSign, ExternalLink, Link, Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "@/types";

interface JobsSectionProps {
    jobs: {
        source: string;
        jobs: Job[];
    }[];
}

const JobsSection = ({ jobs }: JobsSectionProps) => {
    if (!jobs || jobs.length === 0) return null;

    return (
        <Card className="rounded-2xl p-6 border">
            <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Recommended Jobs</CardTitle>
                        <p className="text-muted-foreground">
                            Top opportunities matching your profile
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue={jobs[0]?.source} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        {jobs.map((source) => (
                            <TabsTrigger key={source.source} value={source.source}>
                                {source.source}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {jobs.map((source) => (
                        <TabsContent key={source.source} value={source.source} className="space-y-4">
                            {source.jobs.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {source.jobs.map((job, index) => (
                                        <div
                                            key={index}
                                            className="group p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-300 hover:border-primary/50"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                                        {job.job_title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                                        <Building2 className="w-3 h-3" />
                                                        <span className="line-clamp-1">{job.employer_name}</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => window.open(job.job_apply_link, '_blank')}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{job.job_location}</span>
                                                </div>
                                            </div>

                                            <Button
                                                className="w-full mt-4"
                                                variant="outline"
                                                onClick={() => window.open(job.job_apply_link, '_blank')}
                                            >
                                                <Link2 className="mr-2" />
                                                Apply Now
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No jobs found on {source.source} for your profile.
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default JobsSection;
