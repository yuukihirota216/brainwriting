import { Card, CardContent } from "@/components/ui/card";

export default function InfoSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="shadow-sm border-t-4 border-blue-500">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">シックスハット思考法とは？</h3>
          <p className="text-sm text-slate-600">エドワード・デボノが開発した思考ツールで、多角的な視点から包括的な分析と意思決定を促進します。</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-t-4 border-yellow-400">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">使い方</h3>
          <p className="text-sm text-slate-600">テキストを入力すると、AIが各帽子の視点から分析します：プロセス（青）、事実（白）、感情（赤）、利点（黄）、注意点（黒）、創造性（緑）。</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-t-4 border-green-500">
        <CardContent className="p-4">
          <h3 className="font-medium text-slate-800 mb-2">活用シーン</h3>
          <p className="text-sm text-slate-600">ビジネス提案の分析、意思決定、問題解決、アイデアや計画に対する包括的なフィードバックの取得に最適です。</p>
        </CardContent>
      </Card>
    </div>
  );
}
