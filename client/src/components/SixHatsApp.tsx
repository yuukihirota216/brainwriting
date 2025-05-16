import { useState, useEffect } from "react";
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
import markdownit from 'markdown-it';
import CrystalHatLogo from "@/../assets/crystal-hat.png";

// 見出しと表示するロゴの対応表
const generatingLogoMap = {
  "肯定的な意見": CrystalHatLogo,
  "否定的な意見": CrystalHatLogo,
  "まとめ": CrystalHatLogo,
};

export default function SixHatsApp() {
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingLogo, setGeneratingLogo] = useState("");
  const md = markdownit();

  useEffect(() => {
    const tokens = md.parse(responseText);

    tokens.forEach((token: any, idx: number) => {
      if (token.type === 'heading_open') {
        const inline = tokens[idx + 1];
        if (inline && inline.type === 'inline') {
          setIsGenerating(!tokens[idx + 3]);
          setGeneratingLogo(generatingLogoMap[inline.content as keyof typeof generatingLogoMap]);
        }
      }
    });
  }, [responseText]);

  const processMutation = useMutation({
    mutationFn: async (text: string) => {
      setResponseText("");
      setIsStreaming(true);
      
      try {
        const result = await apiRequest(
          "POST", 
          "/api/dify", 
          { input: text },
          (chunk) => {
            setResponseText(prev => prev + chunk);
          }
        );
        
        return result;
      } finally {
        setIsStreaming(false);
      }
    },
    onError: (error) => {
      toast({
        title: "テキスト分析エラー",
        description: error instanceof Error ? error.message : "不明なエラーが発生しました",
        variant: "destructive",
      });
    },
  });

  const processText = (text: string) => {
    if (!text.trim()) {
      toast({
        title: "入力が必要です",
        description: "分析するテキストを入力してください。",
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

            {processMutation.isPending && !responseText && <LoadingIndicator />}

            {(responseText || isStreaming) && (
              <ResponseDisplay
                responseText={responseText}
                isGenerating={isGenerating}
                generatingLogo={generatingLogo}
              />
            )}
          </CardContent>
        </Card>

        <InfoSection />
        
        <Footer />
      </div>
    </div>
  );
}
