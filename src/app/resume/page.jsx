"use client";

import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Resume() {
  const [selectedValue, setSelectedValue] = useState('tailor');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            Resume Editor
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <RadioGroup
              defaultValue="tailor"
              onValueChange={setSelectedValue}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tailor" id="tailor" />
                <Label htmlFor="tailor">Tailor Resume</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compress" id="compress" />
                <Label htmlFor="compress">Compress Resume</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <form className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-primary">
              Job Description:
            </h2>
            <Textarea 
              className="min-h-[200px] text-lg"
              placeholder={selectedValue === 'compress' ? "Locked" : "Enter your text here..."}
              disabled={selectedValue === 'compress'}
            />
          </div>

          <div className="flex items-center justify-end space-x-8">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Upload Current Resume</h3>
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}