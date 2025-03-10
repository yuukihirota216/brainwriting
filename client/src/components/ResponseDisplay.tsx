interface ResponseDisplayProps {
  responseText: string;
}

export default function ResponseDisplay({ responseText }: ResponseDisplayProps) {
  // Function to format the response text with color-coded hat names
  const formatResponseText = () => {
    let formattedText = responseText;
    
    const hatStyles = {
      "Blue Hat": "<span class='font-semibold text-blue-500'>Blue Hat (Process):</span>",
      "White Hat": "<span class='font-semibold text-slate-600 border border-slate-200 bg-white inline-block px-1'>White Hat (Facts):</span>",
      "Red Hat": "<span class='font-semibold text-red-500'>Red Hat (Emotions):</span>",
      "Yellow Hat": "<span class='font-semibold text-yellow-500'>Yellow Hat (Optimism):</span>",
      "Black Hat": "<span class='font-semibold text-slate-900'>Black Hat (Caution):</span>",
      "Green Hat": "<span class='font-semibold text-green-500'>Green Hat (Creativity):</span>"
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
    <div className="mt-8">
      <h2 className="text-lg font-medium text-slate-800 mb-3">Six Hats Analysis</h2>
      <div 
        className="response-area p-4 bg-slate-50 rounded-md border border-slate-200 text-slate-700 whitespace-pre-line min-h-[150px] max-h-[400px] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: formatResponseText() }}
      />
    </div>
  );
}
