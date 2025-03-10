export default function LoadingIndicator() {
  return (
    <div className="my-8">
      <div className="relative w-20 h-20 mx-auto">
        <style jsx>{`
          .hat {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transform-origin: 30px 30px;
          }
          
          @keyframes hat-rotate {
            0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
          }
          
          .hat-blue {
            background-color: #3b82f6;
            animation: hat-rotate 3s linear infinite;
          }
          
          .hat-yellow {
            background-color: #facc15;
            animation: hat-rotate 3s linear infinite 0.5s;
          }
          
          .hat-gray {
            background-color: #6b7280;
            animation: hat-rotate 3s linear infinite 1.0s;
          }
          
          .hat-red {
            background-color: #ef4444;
            animation: hat-rotate 3s linear infinite 1.5s;
          }
          
          .hat-green {
            background-color: #22c55e;
            animation: hat-rotate 3s linear infinite 2.0s;
          }
          
          .hat-white {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            animation: hat-rotate 3s linear infinite 2.5s;
          }
        `}</style>
        <div className="hat hat-blue"></div>
        <div className="hat hat-yellow"></div>
        <div className="hat hat-gray"></div>
        <div className="hat hat-red"></div>
        <div className="hat hat-green"></div>
        <div className="hat hat-white"></div>
      </div>
      <p className="text-center text-slate-600 mt-4">シックスハット思考法で分析中...</p>
    </div>
  );
}
