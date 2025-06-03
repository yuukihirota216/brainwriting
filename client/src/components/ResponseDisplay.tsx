interface ResponseDisplayProps {
  responseText: string;
  isGenerating: boolean;
  generatingLogo: string;
}

export default function ResponseDisplay({ responseText, isGenerating, generatingLogo }: ResponseDisplayProps) {
  // Function to format the response text with color-coded hat names
  const formatResponseText = () => {
    let formattedText = responseText;
    
    const hatStyles = {
      "Blue Hat": "<span class='font-semibold text-blue-500'>青い帽子（プロセス）:</span>",
      "White Hat": "<span class='font-semibold text-slate-600 border border-slate-200 bg-white inline-block px-1'>白い帽子（事実）:</span>",
      "Red Hat": "<span class='font-semibold text-red-500'>赤い帽子（感情）:</span>",
      "Yellow Hat": "<span class='font-semibold text-yellow-500'>黄色い帽子（利点）:</span>",
      "Black Hat": "<span class='font-semibold text-slate-900'>黒い帽子（注意点）:</span>",
      "Green Hat": "<span class='font-semibold text-green-500'>緑の帽子（創造性）:</span>",
      "青い帽子": "<span class='font-semibold text-blue-500'>青い帽子（プロセス）:</span>",
      "白い帽子": "<span class='font-semibold text-slate-600 border border-slate-200 bg-white inline-block px-1'>白い帽子（事実）:</span>",
      "赤い帽子": "<span class='font-semibold text-red-500'>赤い帽子（感情）:</span>",
      "黄色い帽子": "<span class='font-semibold text-yellow-500'>黄色い帽子（利点）:</span>",
      "黒い帽子": "<span class='font-semibold text-slate-900'>黒い帽子（注意点）:</span>",
      "緑の帽子": "<span class='font-semibold text-green-500'>緑の帽子（創造性）:</span>"
    };
    
    // Replace hat mentions with styled versions
    Object.entries(hatStyles).forEach(([hat, style]) => {
      const regex = new RegExp(`${hat}\\s*\\(.*?\\):`, 'g');
      formattedText = formattedText.replace(regex, style);
      
      // Also replace without parentheses if needed
      const simpleRegex = new RegExp(`${hat}:`, 'g');
      formattedText = formattedText.replace(simpleRegex, style);
    });
    
    return formattedText;
  };

  return (
    <div className="mt-8 relative">
      <h2 className="text-lg font-medium text-slate-800 mb-3">シックスハット分析結果</h2>
      <div 
        className="response-area p-4 bg-slate-50 rounded-md border border-slate-200 text-slate-700 whitespace-pre-line min-h-[150px] max-h-[400px] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: formatResponseText() }}
      />
      {isGenerating  && (
        <img src={generatingLogo} className="w-36 absolute top-0 right-0 bottom-0 left-0 m-auto shadow-md" />
      )}
    </div>
  );
}
