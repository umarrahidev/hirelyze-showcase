import { useState, useEffect } from 'react';
import Navbar from "@/components/layouts/LandingPage/Navbar";
import Footer from "@/components/layouts/LandingPage/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, Clock, Brain, Globe, Star, Award, Users, FileText, ArrowRight, Upload, Target, TrendingUp, Briefcase, UserCheck, X, BotIcon, Sparkle, SparkleIcon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <div className="relative py-6 md:py-24">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/50 via-background to-background" />

          <div className="relative container mx-auto px-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-light/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              AI-Powered Resume Analysis
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transform Your
              <span className="gradient-primary bg-clip-text text-transparent block">
                Job Search
              </span>
              <span className="block text-primary text-2xl md:text-3xl font-semibold mt-3 animate-pulse">
                ⚡ Analyze to Get Hired
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              AI-powered resume analysis that evaluates your strengths, weaknesses, and improvement opportunities.
              Get actionable insights to optimize your resume and boost your chances of getting hired.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button variant="hero" size="xl" shape="pill" asChild>
                <Link to="/signin" className="group">
                  Analyze Your Resume
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Hirelyze Section (Commented out as requested) */}
      {/* <section id="why" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Hirelyze?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In today's competitive job market, your resume needs to stand out. Hirelyze gives you the edge you need to get noticed by employers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">The Problem We Solve</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Most job seekers spend hours perfecting their resumes, only to get rejected by automated tracking systems or miss key optimization opportunities. 
                Without professional guidance, it's hard to know what recruiters are really looking for.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hirelyze bridges this gap by providing instant, AI-powered analysis that identifies exactly what needs improvement, 
                helping you create a resume that gets you interviews and job offers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">85%</h4>
                <p className="text-muted-foreground text-sm">More Interviews</p>
              </Card>
              <Card className="text-center p-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">3x</h4>
                <p className="text-muted-foreground text-sm">Response Rate</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">30s</h4>
                <p className="text-muted-foreground text-sm">Analysis Time</p>
              </Card>
              <Card className="text-center p-6">
                <UserCheck className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">94%</h4>
                <p className="text-muted-foreground text-sm">User Satisfaction</p>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Before/After Results Section */}
      <section id="results" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">See the Difference</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't let a poorly formatted resume hold you back. See how Hirelyze transforms your application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Before Card */}
            <Card className="p-8 border-red-200 bg-red-50/50 dark:bg-red-900/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-full">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Before Hirelyze</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm">
                  <div className="mt-1">
                    <div className="rounded-full bg-red-100 p-1">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Low ATS Score (35/100)</h4>
                    <p className="text-sm text-muted-foreground">Resume gets rejected by automated systems automatically.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm">
                  <div className="mt-1">
                    <div className="rounded-full bg-red-100 p-1">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Generic Keywords</h4>
                    <p className="text-sm text-muted-foreground">Fails to match specific job requirements or highlight relevant skills.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm">
                  <div className="mt-1">
                    <div className="rounded-full bg-red-100 p-1">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Weak Impact Statements</h4>
                    <p className="text-sm text-muted-foreground">"Responsible for sales" instead of "Increased revenue by 40%".</p>
                  </div>
                </div>

                {/* Realtime Job */}
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm">
                  <div className="mt-1">
                    <div className="rounded-full bg-red-100 p-1">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">No Job Matching</h4>
                    <p className="text-sm text-muted-foreground">Miss out on opportunities due to poor resume optimization.</p>
                  </div>
                </div>

              </div>
            </Card>

            {/* After Card */}
            <Card className="p-8 border-green-200 bg-green-50/50 dark:bg-green-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">After Hirelyze</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm ring-1 ring-green-500/20">
                  <div className="mt-1">
                    <div className="rounded-full bg-green-100 p-1">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">High ATS Score (92/100)</h4>
                    <p className="text-sm text-muted-foreground">Optimized structure ensures your resume reaches the recruiter.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm ring-1 ring-green-500/20">
                  <div className="mt-1">
                    <div className="rounded-full bg-green-100 p-1">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Targeted Keywords</h4>
                    <p className="text-sm text-muted-foreground">Strategically placed keywords that align perfecty with the job description.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm ring-1 ring-green-500/20">
                  <div className="mt-1">
                    <div className="rounded-full bg-green-100 p-1">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Data-Driven Achievements</h4>
                    <p className="text-sm text-muted-foreground">"Generated $50k in new revenue thru strategic prospecting."</p>
                  </div>
                </div>

                {/* Realtime Job */}
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm ring-1 ring-green-500/20">
                  <div className="mt-1">
                    <div className="rounded-full bg-green-100 p-1">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Personalized Job Matches</h4>
                    <p className="text-sm text-muted-foreground">Get matched with perfect job opportunities based on your skills, experience, and career goals.</p>
                  </div>
                </div>

              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize your resume and land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground">
                    Get detailed feedback on strengths and weaknesses using advanced AI algorithms
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Realtime Jobs</h3>
                  <p className="text-muted-foreground">
                    Get matched with perfect job opportunities based on your skills, experience, and career goals
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Detailed Reports</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive feedback and improvement tips tailored specifically to your resume
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Personalized Insights</h3>
                  <p className="text-muted-foreground">
                    Get personalized career recommendations and interview preparation tips based on your profile
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Interview Question Prep</h3>
                  <p className="text-muted-foreground">
                    Get AI-generated interview questions tailored to your target role and experience level
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Instant Processing</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive resume analysis and improvement suggestions in seconds, not hours
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">About Hirelyze</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing how job seekers approach resume optimization by leveraging cutting-edge AI technology
              to deliver actionable insights that dramatically improve hiring outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                In today's competitive job market, having a strong resume isn't just important—it's essential.
                Yet most job seekers struggle to identify what makes a resume effective and what turns recruiters away.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hirelyze was created to democratize access to professional resume coaching. Our advanced AI algorithms
                analyze resumes against industry standards, identifying optimization opportunities and providing
                clear, actionable feedback that helps candidates present their best professional selves.
              </p>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">10K+</h4>
                <p className="text-muted-foreground text-sm">Resumes Analyzed</p>
              </Card>
              <Card className="text-center p-6">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">2.5x</h4>
                <p className="text-muted-foreground text-sm">More Interviews</p>
              </Card>
              <Card className="text-center p-6">
                <Check className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">92%</h4>
                <p className="text-muted-foreground text-sm">Success Rate</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-2xl text-foreground mb-1">4.8/5</h4>
                <p className="text-muted-foreground text-sm">User Rating</p>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact / CTA Section */}
      <section id="contact" className="pt-10 pb-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-primary/10 shadow-md">
            {/* Background with gradient and patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background z-0" />
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 py-20 px-6 md:px-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6 drop-shadow-sm">
                Ready to Transform Your Job Search?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of job seekers who have optimized their resumes and landed their dream jobs.
                <br className="hidden md:block" />
                Your next career move starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="xl" shape="pill" asChild>
                  <Link to="/signin" className="group">
                    Start Analyzing Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                {/* <a
                  href="https://www.linkedin.com/in/umarrahi2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="xl" shape="pill" className="min-w-[200px] bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80 hover:border-primary/50 transition-all duration-300">
                    Hire Me
                  </Button>
                </a> */}
              </div>

              {/* Micro-interaction/Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground/80">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  Free to try
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  Instant results
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;