
import React from 'react';
import { LightingType, CameraAngle } from '../types';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS } from '../constants';
import ImageUploader from './ImageUploader';
import { SparklesIcon } from './Icons';

interface ControlPanelProps {
  productImage: string | null;
  setProductImage: (image: string) => void;
  referenceImage: string | null;
  setReferenceImage: (image: string) => void;
  lighting: LightingType;
  setLighting: (lighting: LightingType) => void;
  cameraAngle: CameraAngle;
  setCameraAngle: (angle: CameraAngle) => void;
  background: string;
  setBackground: (bg: string) => void;
  styleIntensity: number;
  setStyleIntensity: (intensity: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    const {
        productImage, setProductImage, referenceImage, setReferenceImage,
        lighting, setLighting, cameraAngle, setCameraAngle,
        background, setBackground, styleIntensity, setStyleIntensity,
        onGenerate, isLoading
    } = props;
    
    const isGenerateDisabled = !productImage || !referenceImage || isLoading;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl space-y-6 h-full flex flex-col backdrop-blur-sm border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader id="product-image" label="1. Product Image" onImageUpload={setProductImage} previewUrl={productImage} />
                <ImageUploader id="reference-image" label="2. Style Reference Image" onImageUpload={setReferenceImage} previewUrl={referenceImage} />
            </div>

            <div>
                <label htmlFor="lighting" className="block text-sm font-medium text-gray-300">3. Lighting Type</label>
                <select id="lighting" value={lighting} onChange={(e) => setLighting(e.target.value as LightingType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                    {LIGHTING_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="camera-angle" className="block text-sm font-medium text-gray-300">4. Camera Angle</label>
                <select id="camera-angle" value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value as CameraAngle)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                    {CAMERA_ANGLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
            
            <div>
                <label htmlFor="background" className="block text-sm font-medium text-gray-300">5. Background Description (Optional)</label>
                <input type="text" id="background" value={background} onChange={(e) => setBackground(e.target.value)} placeholder="e.g., on a marble countertop" className="mt-1 block w-full border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md" />
            </div>

            <div>
                <label htmlFor="style-intensity" className="block text-sm font-medium text-gray-300">6. Style Intensity: {styleIntensity}%</label>
                <input type="range" id="style-intensity" min="0" max="100" value={styleIntensity} onChange={(e) => setStyleIntensity(Number(e.target.value))} className="mt-1 w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
            </div>

            <div className="pt-4 mt-auto">
                 <button 
                    onClick={onGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                 >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Generate Ad Visual
                        </>
                    )}
                 </button>
            </div>
        </div>
    );
};

export default ControlPanel;
