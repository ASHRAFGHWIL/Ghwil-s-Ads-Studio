
import { GoogleGenAI, Modality } from "@google/genai";
import { LightingType, CameraAngle } from '../types';

interface GenerationParams {
  productImage: string;
  referenceImage: string;
  lighting: LightingType;
  cameraAngle: CameraAngle;
  background: string;
  styleIntensity: number;
}

const getMimeType = (base64Data: string): string => {
    return base64Data.substring(base64Data.indexOf(":") + 1, base64Data.indexOf(";"));
}

export const generateAdImage = async (params: GenerationParams): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const promptText = `
        Recreate the main product image (the first image) with the following specifications:

        1.  **Style Transfer:** Apply the visual style, artistic atmosphere, mood, and tone from the provided reference image (the second image). The style intensity should be ${params.styleIntensity}%. A lower percentage means less style transfer, and 100% means a very strong style transfer.
        2.  **Lighting:** Simulate a "${params.lighting}" lighting setup.
        3.  **Camera Angle:** Use a "${params.cameraAngle}" camera angle.
        4.  **Background:** Place the product on a background described as: "${params.background}". If the background description is empty, create a suitable, professional background that complements the product and style.
        5.  **Core Objective:** Maintain the original product's identity, form, and proportions, but elevate its presentation to that of a professional advertisement photograph. The product itself should not be changed, only its presentation.
        6.  **Realism:** Ensure all shadows, reflections, and lighting effects are realistic and consistent with the chosen lighting and camera angle.
        7.  **Output:** Generate a single, high-resolution, photo-realistic image suitable for advertising campaigns. Do not include any text, watermarks, or annotations in the output image.
    `;

    const productImagePart = {
        inlineData: {
            data: params.productImage.split(',')[1],
            mimeType: getMimeType(params.productImage),
        },
    };

    const referenceImagePart = {
        inlineData: {
            data: params.referenceImage.split(',')[1],
            mimeType: getMimeType(params.referenceImage),
        },
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                productImagePart,
                referenceImagePart,
                { text: promptText },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            const base64ImageBytes = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }

    throw new Error("No image was generated. The model may have refused the request. Please check your images and try again.");
};
