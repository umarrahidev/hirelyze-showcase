// client/src/pages/App/Dashboard.tsx 
import AppLayout from "@/components/layouts/App/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart3,
    FileText,
    Target,
    TrendingUp,
    Users,
    Calendar,
    CheckCircle,
    AlertCircle,
    Lightbulb
} from "lucide-react";
import { ScoreCircle } from "@/components/ResumeAnalysis/ScoreCircle";
import { JobMatchCard } from "@/pages/Backup/JobMatchCard";


const Dashboard = () => {
    // Mock data
    const stats = [
        {
            title: "Resumes Analyzed",
            value: "24",
            change: "+12% this month",
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-100/20"
        },
        {
            title: "Avg. Score",
            value: "7.2/10",
            change: "+0.8 from last month",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-100/20"
        },
        {
            title: "Job Matches",
            value: "156",
            change: "+23% this month",
            icon: Target,
            color: "text-amber-600",
            bg: "bg-amber-100/20"
        },
        {
            title: "Interviews",
            value: "8",
            change: "+3 this month",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-100/20"
        }
    ];

    const recentActivity = [
        {
            id: 1,
            title: "Resume Analysis Completed",
            description: "Software Engineer Resume - Score: 7.8/10",
            time: "2 hours ago",
            type: "analysis"
        },
        {
            id: 2,
            title: "Job Match Found",
            description: "Senior Frontend Developer at TechCorp - 85% match",
            time: "5 hours ago",
            type: "match"
        },
        {
            id: 3,
            title: "Interview Prep Ready",
            description: "Generated 12 interview questions for React position",
            time: "1 day ago",
            type: "prep"
        },
        {
            id: 4,
            title: "Resume Updated",
            description: "Applied recommended changes to work experience section",
            time: "2 days ago",
            type: "update"
        }
    ];

    const jobMatches = [
        {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            matchScore: 92,
            salary: "$120k - $140k"
        },
        {
            title: "Full Stack Engineer",
            company: "StartupXYZ",
            matchScore: 85,
            salary: "$100k - $130k"
        },
        {
            title: "React Developer",
            company: "Digital Solutions",
            matchScore: 78,
            salary: "$90k - $110k"
        }
    ];

    const strengths = [
        "Strong technical skills in React and JavaScript",
        "5+ years of experience in web development",
        "Excellent problem-solving abilities",
        "Good communication and teamwork skills"
    ];

    const weaknesses = [
        "Limited experience with backend technologies",
        "Missing some modern deployment tools in skillset",
        "Could improve project management experience"
    ];

    const tips = [
        "Add specific metrics and achievements to your work experience",
        "Consider adding a projects section with GitHub links",
        "Include relevant certifications or courses completed",
        "Optimize for ATS by using standard section headings"
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-primary-foreground/90">
                    Your resume analysis dashboard - ready to optimize your career prospects
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-card transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Score Circle and Job Matches */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ScoreCircle score={7.2} />
                </div>
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Top Job Matches
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {jobMatches.map((job, index) => (
                                <JobMatchCard
                                    key={index}
                                    title={job.title}
                                    company={job.company}
                                    matchScore={job.matchScore}
                                    salary={job.salary}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-2 p-2 rounded-md bg-emerald-50/50">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                Areas for Improvement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {weaknesses.map((weakness, index) => (
                                    <li key={index} className="flex items-start gap-2 p-2 rounded-md bg-red-50/50">
                                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{weakness}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-500" />
                                Improvement Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2 p-2 rounded-md bg-amber-50/50">
                                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border bg-background/50 hover:bg-accent/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    {activity.type === 'analysis' && <FileText className="w-5 h-5 text-primary" />}
                                    {activity.type === 'match' && <Target className="w-5 h-5 text-primary" />}
                                    {activity.type === 'prep' && <Lightbulb className="w-5 h-5 text-primary" />}
                                    {activity.type === 'update' && <CheckCircle className="w-5 h-5 text-primary" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-card-foreground">{activity.title}</h3>
                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
