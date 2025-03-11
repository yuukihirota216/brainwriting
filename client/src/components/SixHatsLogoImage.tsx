export default function SixHatsLogoImage() {
  return (
    <div className="relative mr-3">
      <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center relative">
        {/* 赤い帽子 (0度) */}
        <div className="absolute" style={{ transform: 'rotate(0deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-red-500 border border-red-600"></div>
        </div>
        
        {/* 黄色い帽子 (60度) */}
        <div className="absolute" style={{ transform: 'rotate(60deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-yellow-400 border border-yellow-500"></div>
        </div>
        
        {/* 緑の帽子 (120度) */}
        <div className="absolute" style={{ transform: 'rotate(120deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-green-500 border border-green-600"></div>
        </div>
        
        {/* 青い帽子 (180度) */}
        <div className="absolute" style={{ transform: 'rotate(180deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-blue-500 border border-blue-600"></div>
        </div>
        
        {/* 灰色の帽子 (240度) */}
        <div className="absolute" style={{ transform: 'rotate(240deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-gray-500 border border-gray-600"></div>
        </div>
        
        {/* 白い帽子 (300度) */}
        <div className="absolute" style={{ transform: 'rotate(300deg) translateY(-15px)' }}>
          <div className="w-5 h-5 rounded-full bg-white border border-slate-200"></div>
        </div>
        
        {/* 中央の円 */}
        <div className="w-6 h-6 rounded-full bg-slate-100"></div>
      </div>
    </div>
  );
}