import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface InputFormProps {
  userInput: string;
  setUserInput: (text: string) => void;
  processText: (text: string) => void;
  clearText: () => void;
  isLoading: boolean;
}

export default function InputForm({ 
  userInput, 
  setUserInput, 
  processText, 
  clearText,
  isLoading
}: InputFormProps) {
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    setCharCount(userInput.length);
  }, [userInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processText(userInput);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-5">
        <Label htmlFor="user-input" className="block text-sm font-medium text-slate-700 mb-2">
          テキストを入力してください
        </Label>
        <div className="relative">
          <Textarea
            id="user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="シックスハット法で分析したいテキストを入力してください..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-500">
            {charCount}/2000
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          type="button"
          onClick={clearText}
          disabled={isLoading}
          variant="outline"
          className="text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
        >
          クリア
        </Button>
        <Button
          type="submit"
          disabled={isLoading || userInput.trim().length === 0}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          シックスハット分析
        </Button>
      </div>
    </form>
  );
}
