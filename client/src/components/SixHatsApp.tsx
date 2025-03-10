import { useState } from "react";
import Header from "./Header";
import InputForm from "./InputForm";
import LoadingIndicator from "./LoadingIndicator";
import ResponseDisplay from "./ResponseDisplay";
import InfoSection from "./InfoSection";
import Footer from "./Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SixHatsApp() {
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const { toast } = useToast();

  const processMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest("POST", "/api/dify", { input: text });
      return response.json();
    },
    onSuccess: (data) => {
      setResponseText(data.output);
    },
    onError: (error) => {
      toast({
        title: "Error analyzing text",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const processText = (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }
    processMutation.mutate(text);
  };

  const clearText = () => {
    setUserInput("");
    setResponseText("");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header />

        <Card className="mb-8">
          <CardContent className="p-6">
            <InputForm 
              userInput={userInput}
              setUserInput={setUserInput}
              processText={processText}
              clearText={clearText}
              isLoading={processMutation.isPending}
            />

            {processMutation.isPending && <LoadingIndicator />}

            {responseText && !processMutation.isPending && (
              <ResponseDisplay responseText={responseText} />
            )}
          </CardContent>
        </Card>

        <InfoSection />
        
        <Footer />
      </div>
    </div>
  );
}
