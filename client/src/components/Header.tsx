import SixHatsLogoImage from "./SixHatsLogoImage";

export default function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <SixHatsLogoImage />
        <h1 className="text-2xl font-bold text-slate-800">シックスハット法 AI</h1>
      </div>
      <p className="text-slate-600 max-w-xl mx-auto">
        シックスハット法の視点からテキストを分析します：包括的な思考のための多角的な視点を得られます。
      </p>
    </header>
  );
}
