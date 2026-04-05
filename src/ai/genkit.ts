import {genkit, Genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';

config();

// Prevent re-initialization during hot-reloading in development
declare global {
  var __ai: Genkit | undefined;
}

function initializeGenkit() {
  if (global.__ai) {
    return global.__ai;
  }

  const ai = genkit({
    plugins: [
      googleAI({
        apiKey: process.env.GEMINI_API_KEY,
      }),
    ],
  });

  global.__ai = ai;
  return ai;
}

export const ai = initializeGenkit();
