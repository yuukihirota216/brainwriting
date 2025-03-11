export default function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <div className="relative w-12 h-12 mr-2">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="absolute top-4 left-0.5 w-2.5 h-2.5 rounded-full bg-gray-500"></div>
            <div className="absolute top-4 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-slate-50 border border-slate-200"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">シックスハット法 AI</h1>
      </div>
      <p className="text-slate-600 max-w-xl mx-auto">
        シックスハット法の視点からテキストを分析します：包括的な思考のための多角的な視点を得られます。
      </p>
    </header>
  );
}
