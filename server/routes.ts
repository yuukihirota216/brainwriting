import type { Express } from "express";
import { createServer } from "http";
import { difyRequestSchema } from "@shared/schema";
import axios from "axios";
import { z } from "zod";
import DifyParser from "./lib/difyParser";

// Define the environment variables schema with fallbacks
const envSchema = z.object({
  DIFY_API_KEY: z.string().default(""),
});

// Parse environment variables with fallback values
const env = envSchema.parse(process.env);

export async function registerRoutes(app: Express) {
  // Dify API endpoint
  app.post('/api/dify', async (req, res) => {
    try {
      // Validate the request body
      const validatedData = difyRequestSchema.parse(req.body);
      
      // Get the API key and app ID from environment variables
      const { DIFY_API_KEY } = env;
      
      // 環境変数のチェック
      if (!DIFY_API_KEY) {
        return res.status(500).json({ 
          message: "DIFY_API_KEY環境変数が設定されていません" 
        });
      }
      
      console.log(`APIリクエスト送信`);
      
      // Make request to Dify API - 本番環境用のエンドポイントを使用
      const difyResponse = await axios.post(
        `https://api.dify.ai/v1/chat-messages`,
        {
          // 本番環境用のリクエストボディ構造
          query: validatedData.input,
          user: "user123",
          response_mode: "streaming",
          // 本番環境では必須パラメータのみ送信
          inputs: {}
        },
        {
          headers: {
            // 本番環境用のAPI認証ヘッダー
            'Authorization': `Bearer ${DIFY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          responseType: 'stream',
        }
      );

      res.setHeader("Content-Type", "text/event-stream");
      const parser = new DifyParser();
      difyResponse.data.on('data', (chunk: Buffer) => {
        let text = '';
        parser.addStreamEventChunk(chunk);
        if (parser.hasValidBuffer()) {
          const messages = parser.getMessages();
          text += messages.map((m) => m.answer).join('');
          parser.resetBuffer();
          res.write(text);
        }
      });

      difyResponse.data.on('end', () => {
        res.end();
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
