import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Image as ImageIcon, Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { suggestionApi } from "@/services/api/suggestion";

interface SuggestionForm {
    title: string;
    description: string;
}

const SubmitSuggestion = () => {
    const { register, handleSubmit, reset } = useForm<SuggestionForm>();
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const onSubmit = async (data: SuggestionForm) => {
        try {
            setIsSubmitting(true);
            await suggestionApi.createSuggestion({
                title: data.title,
                description: data.description,
                image: selectedImage,
            });

            // Show success message
            setShowSuccess(true);

            // Auto-hide after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);

            // toast.success("Suggestion submitted! Thanks for helping us improve.");
            reset();
            setSelectedImage(undefined);
        } catch (error) {
            // toast.error("Failed to submit suggestion. Please try again.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl animate-fade-in">
            <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Submit a Suggestion</CardTitle>
                            <CardDescription>
                                Have an idea for a new feature or improvement? We'd love to hear it!
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Suggestion Title</Label>
                            <Input
                                id="title"
                                placeholder="What's your idea?"
                                {...register("title", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Explain how this would improve the application..."
                                className="min-h-[150px]"
                                {...register("description", { required: true })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Reference Image (Optional)</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer"
                                />
                            </div>
                            {selectedImage && (
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    {selectedImage.name}
                                </div>
                            )}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-fit">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Suggestion"
                            )}
                        </Button>

                        {/* Success Message */}
                        {showSuccess && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-2 text-green-700">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                        Suggestion submitted successfully!
                                    </span>
                                </div>
                                <p className="text-xs text-green-600 mt-1 ml-7">
                                    Thanks for helping us improve the application.
                                </p>
                            </div>
                        )}

                        {/* Error Message */}
                        {showError && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-2 text-red-700">
                                    <XCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                        Failed to submit suggestion.
                                    </span>
                                </div>
                                <p className="text-xs text-red-600 mt-1 ml-7">
                                    Please try again.
                                </p>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmitSuggestion;