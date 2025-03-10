import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { difyRequestSchema } from "@shared/schema";
import axios from "axios";
import { z } from "zod";

// Define the environment variables schema with fallbacks
const envSchema = z.object({
  DIFY_API_KEY: z.string().default(""),
  DIFY_APP_ID: z.string().default("")
});

// Parse environment variables with fallback values
const env = envSchema.parse(process.env);

export async function registerRoutes(app: Express): Promise<Server> {
  // Dify API endpoint
  app.post('/api/dify', async (req, res) => {
    try {
      // Validate the request body
      const validatedData = difyRequestSchema.parse(req.body);
      
      // Get the API key and app ID from environment variables
      const { DIFY_API_KEY, DIFY_APP_ID } = env;
      
      // 環境変数のチェック
      if (!DIFY_API_KEY) {
        return res.status(500).json({ 
          message: "DIFY_API_KEY環境変数が設定されていません" 
        });
      }
      
      if (!DIFY_APP_ID) {
        return res.status(500).json({ 
          message: "DIFY_APP_ID環境変数が設定されていません" 
        });
      }
      
      console.log(`APIリクエスト送信: ${DIFY_APP_ID}へ`);
      
      // Make request to Dify API - テキスト生成モード用の正確なAPIリクエスト形式
      const difyResponse = await axios.post(
        `https://api.dify.ai/v1/completion-messages`,
        {
          // リクエストボディの構造を修正
          query: validatedData.input,
          user: "user123",
          response_mode: "blocking",
          // 入力フィールドを空オブジェクトからundefinedに変更
          inputs: undefined
        },
        {
          headers: {
            // API認証ヘッダーの形式を修正
            'Authorization': `Bearer ${DIFY_API_KEY}`,
            'Content-Type': 'application/json',
            // ヘッダーのApp-IDの形式を正確に
            'App-ID': DIFY_APP_ID
          }
        }
      );
      
      console.log('Dify応答内容:', difyResponse.data);
      
      // Return the response from Dify
      return res.status(200).json({ 
        output: difyResponse.data.answer || difyResponse.data.message || "応答なし" 
      });
      
    } catch (error) {
      console.error('Error processing Dify API request:', error);
      
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "無効なリクエストデータ", 
          errors: error.errors 
        });
      }
      
      // Handle axios errors
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || error.message;
        const responseData = error.response?.data || {};
        
        console.error('Axios error details:', {
          status: statusCode,
          message: errorMessage,
          data: responseData,
          headers: error.response?.headers
        });
        
        return res.status(statusCode).json({ 
          message: `Dify APIエラー: ${errorMessage}`,
          details: responseData
        });
      }
      
      // Handle other errors
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "不明なエラーが発生しました" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
