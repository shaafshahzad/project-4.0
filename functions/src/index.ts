/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export const getImage = onRequest(async (request, response) => {
  const image = await openai.images.generate({prompt: "A cute baby sea otter"});
  const imageUrl = `data:image/png;base64,${image.data}`;
  response.send(imageUrl);
});
