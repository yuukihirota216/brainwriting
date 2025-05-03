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
import CrystalHatLogo from "../crystal-hat.png";

// 画像の対応表
const imagePaths = {
  "img1": CrystalHatLogo,
  "img2": CrystalHatLogo,
  "img3": CrystalHatLogo,
};

export default function SixHatsApp() {
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const { toast } = useToast();
  const [logo1Visibility, setLogo1Visibility] = useState(false);
  const [logo2Visibility, setLogo2Visibility] = useState(false);
  const [logo3Visibility, setLogo3Visibility] = useState(false);

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
            if (chunk.indexOf("<img1>") >= 0) {
              console.log("open img1");
              chunk = chunk.replace("<img1>\n", "");
              setLogo1Visibility(true);
            }
            if (chunk.indexOf("</img1>") >= 0) {
              console.log("close img1");
              chunk = chunk.replace("</img1>\n", "");
              setLogo1Visibility(false);
            }
            if (chunk.indexOf("<img2>") >= 0) {
              console.log("open img2");
              chunk = chunk.replace("<img2>\n", "");
              setLogo2Visibility(true);
            }
            if (chunk.indexOf("</img2>") >= 0) {
              console.log("close img2");
              chunk = chunk.replace("</img2>\n", "");
              setLogo2Visibility(false);
            }
            if (chunk.indexOf("<img3>") >= 0) {
              console.log("open img3");
              chunk = chunk.replace("<img3>\n", "");
              setLogo3Visibility(true);
            }
            if (chunk.indexOf("</img3>") >= 0) {
              console.log("close img3");
              chunk = chunk.replace("</img3>\n", "");
              setLogo3Visibility(false);
            }
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
              <ResponseDisplay responseText={responseText} />
            )}
            {logo1Visibility  && (
              <img src={imagePaths["img1"]} />
            )}
            {logo2Visibility  && (
              <img src={imagePaths["img2"]} />
            )}
            {logo3Visibility  && (
              <img src={imagePaths["img3"]} />
            )}
          </CardContent>
        </Card>

        <InfoSection />
        
        <Footer />
      </div>
    </div>
  );
}
