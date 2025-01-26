"use client";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplicantPage() {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const applicant = data ? JSON.parse(decodeURIComponent(data)) : null;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-primary/80 to-primary/60 -z-10" />

            <div className="container mx-auto px-4 py-8">
                <Card className="relative bg-white">
                    <CardContent className="p-8">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-700 mb-2">
                                {applicant.username}
                            </h1>
                            <p className="text-gray-500">{applicant.university}</p>
                            <p className="text-gray-500">{applicant.location}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-8 right-8 flex gap-4">
                            <Button size="lg" className="h-[3.5rem] px-8">
                                Download Resume
                            </Button>
                            <Button size="lg" className="h-[3.5rem] px-8">
                                Contact Applicant
                            </Button>
                        </div>

                        {/* Questions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        What is your favorite project you completed?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-justify">
                                    {applicant.projectQuestion}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        What is the most difficult challenge you've overcome?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-justify">
                                    {applicant.overcomeQuestion}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        What are your Hobbies and how have they changed you as a person?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-justify">
                                    {applicant.hobbiesQuestion}
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}