import { Card, CardContent } from "@/components/ui/card";

export default function InfoSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="shadow-sm border-t-4 border-blue-500">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">What is Six Thinking Hats?</h3>
          <p className="text-sm text-slate-600">A thinking tool developed by Edward de Bono that promotes different perspectives for comprehensive analysis and decision-making.</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-t-4 border-yellow-400">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">How It Works</h3>
          <p className="text-sm text-slate-600">Enter your text and our AI will analyze it through the perspective of each hat: Process (Blue), Facts (White), Emotions (Red), Benefits (Yellow), Caution (Black), and Creativity (Green).</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-t-4 border-green-500">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">Use Cases</h3>
          <p className="text-sm text-slate-600">Perfect for analyzing business proposals, decision-making, problem-solving, and getting comprehensive feedback on ideas or plans.</p>
        </CardContent>
      </Card>
    </div>
  );
}
