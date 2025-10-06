import { GoogleGenAI, Modality } from "@google/genai";
import { LightingType, CameraAngle } from '../types';

interface GenerationParams {
  productImage: string;
  referenceImage: string;
  logoSourceImage: string | null;
  lighting: LightingType;
  cameraAngle: CameraAngle;
  background: string;
  styleIntensity: number;
  logoSwap: boolean;
}

const getMimeType = (base64Data: string): string => {
    return base64Data.substring(base64Data.indexOf(":") + 1, base64Data.indexOf(";"));
}

export const generateAdImage = async (params: GenerationParams): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("ERROR_API_KEY");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const imageParts = [
        { // Product image (first)
            inlineData: {
                data: params.productImage.split(',')[1],
                mimeType: getMimeType(params.productImage),
            },
        },
        { // Style reference image (second)
            inlineData: {
                data: params.referenceImage.split(',')[1],
                mimeType: getMimeType(params.referenceImage),
            },
        }
    ];

    let logoSwapInstruction = '';

    if (params.logoSwap && params.logoSourceImage) {
        // Logo source image (third)
        imageParts.push({
            inlineData: {
                data: params.logoSourceImage.split(',')[1],
                mimeType: getMimeType(params.logoSourceImage),
            },
        });
        logoSwapInstruction = `8.  **Logo Swap:** The first image is the product, the second is for style reference, and the third is a logo source. Identify the logo on the product in the first image. Replace it with the logo from the third image. The swapped logo must appear naturally integrated onto the product, matching its contours, lighting, and texture.`;
    }

    const promptText = `
        You will be provided with two or three images.
        - The first image is the main product to be enhanced.
        - The second image is a style reference.
        - If a third image is provided, it is a source for a logo.

        Recreate the main product image (the first image) with the following specifications:

        1.  **Style Transfer:** Apply the visual style, artistic atmosphere, mood, and tone from the provided reference image (the second image). The style intensity should be ${params.styleIntensity}%. A lower percentage means less style transfer, and 100% means a very strong style transfer.
        2.  **Lighting:** Simulate a "${params.lighting}" lighting setup.
        3.  **Camera Angle:** Use a "${params.cameraAngle}" camera angle.
        4.  **Background:** Place the product on a background described as: "${params.background}". If the background description is empty, create a suitable, professional background that complements the product and style.
        5.  **Core Objective:** Maintain the original product's identity, form, and proportions, but elevate its presentation to that of a professional advertisement photograph. The product itself should not be changed, only its presentation.
        6.  **Realism:** Ensure all shadows, reflections, and lighting effects are realistic and consistent with the chosen lighting and camera angle.
        7.  **Output:** Generate a single, high-resolution, photo-realistic image suitable for advertising campaigns. Do not include any text, watermarks, or annotations in the output image.
        ${logoSwapInstruction}
    `.trim();

    const textPart = { text: promptText };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [...imageParts, textPart],
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

    throw new Error("ERROR_NO_IMAGE_GENERATED");
};