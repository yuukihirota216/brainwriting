import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { difyRequestSchema } from "@shared/schema";
import axios from "axios";
import { z } from "zod";

// Define the environment variables schema with fallbacks
const envSchema = z.object({
  DIFY_API_KEY: z.string().default("app-jETn58C1c9IS9EaEXl1chB0t"),
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
      
      if (!DIFY_APP_ID) {
        return res.status(500).json({ 
          message: "DIFY_APP_ID environment variable is not set" 
        });
      }
      
      // Make request to Dify API
      const difyResponse = await axios.post(
        `https://api.dify.ai/v1/applications/${DIFY_APP_ID}/invoke`,
        { input: validatedData.input },
        {
          headers: {
            'Authorization': `Bearer ${DIFY_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Return the response from Dify
      return res.status(200).json({ 
        output: difyResponse.data.output 
      });
      
    } catch (error) {
      console.error('Error processing Dify API request:', error);
      
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      }
      
      // Handle axios errors
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || error.message;
        
        return res.status(statusCode).json({ 
          message: `Dify API error: ${errorMessage}` 
        });
      }
      
      // Handle other errors
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
