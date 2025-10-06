import React from 'react';
import { LightingType, CameraAngle } from '../types';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS } from '../constants';
import ImageUploader from './ImageUploader';
import { SparklesIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';

interface ControlPanelProps {
  productImage: string | null;
  setProductImage: (image: string) => void;
  referenceImage: string | null;
  setReferenceImage: (image: string) => void;
  logoSourceImage: string | null;
  setLogoSourceImage: (image: string) => void;
  lighting: LightingType;
  setLighting: (lighting: LightingType) => void;
  cameraAngle: CameraAngle;
  setCameraAngle: (angle: CameraAngle) => void;
  background: string;
  setBackground: (bg: string) => void;
  logoSwap: boolean;
  setLogoSwap: (swap: boolean) => void;
  styleIntensity: number;
  setStyleIntensity: (intensity: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    const {
        productImage, setProductImage, referenceImage, setReferenceImage,
        logoSourceImage, setLogoSourceImage,
        lighting, setLighting, cameraAngle, setCameraAngle,
        background, setBackground, logoSwap, setLogoSwap, styleIntensity, setStyleIntensity,
        onGenerate, isLoading
    } = props;

    const { t, lang } = useI18n();
    const isGenerateDisabled = !productImage || !referenceImage || (logoSwap && !logoSourceImage) || isLoading;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl space-y-6 h-full flex flex-col backdrop-blur-sm border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader id="product-image" labelKey="uploader.productImage" onImageUpload={setProductImage} previewUrl={productImage} />
                <ImageUploader id="reference-image" labelKey="uploader.referenceImage" onImageUpload={setReferenceImage} previewUrl={referenceImage} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300">{t('controls.logoSwap')}</label>
                <div className="mt-2 flex items-center">
                    <button
                        type="button"
                        className={`${logoSwap ? 'bg-purple-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
                        role="switch"
                        aria-checked={logoSwap}
                        onClick={() => setLogoSwap(!logoSwap)}
                    >
                        <span className="sr-only">{t('controls.logoSwapLabel')}</span>
                        <span
                            aria-hidden="true"
                            className={`${logoSwap ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        />
                    </button>
                    <span className={`text-sm text-gray-400 ${lang === 'ar' ? 'mr-3' : 'ml-3'}`}>{t('controls.logoSwapLabel')}</span>
                </div>
            </div>

            {logoSwap && (
                <div className="transition-all duration-300 ease-in-out animate-[fadeIn_0.5s]">
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                    <ImageUploader
                        id="logo-source-image"
                        labelKey="uploader.logoSourceImage"
                        onImageUpload={setLogoSourceImage}
                        previewUrl={logoSourceImage}
                    />
                </div>
            )}

            <div>
                <label htmlFor="lighting" className="block text-sm font-medium text-gray-300">{t('controls.lighting')}</label>
                <select id="lighting" value={lighting} onChange={(e) => setLighting(e.target.value as LightingType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                    {LIGHTING_OPTIONS.map(opt => <option key={opt} value={opt}>{t(`lightingTypes.${opt}`)}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="camera-angle" className="block text-sm font-medium text-gray-300">{t('controls.cameraAngle')}</label>
                <select id="camera-angle" value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value as CameraAngle)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                    {CAMERA_ANGLE_OPTIONS.map(opt => <option key={opt} value={opt}>{t(`cameraAngles.${opt}`)}</option>)}
                </select>
            </div>
            
            <div>
                <label htmlFor="background" className="block text-sm font-medium text-gray-300">{t('controls.background')}</label>
                <input type="text" id="background" value={background} onChange={(e) => setBackground(e.target.value)} placeholder={t('controls.backgroundPlaceholder')} className="mt-1 block w-full border-gray-600 bg-gray-900 text-white shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md" />
            </div>

            <div>
                <label htmlFor="style-intensity" className="block text-sm font-medium text-gray-300">{t('controls.styleIntensity', { intensity: styleIntensity })}</label>
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
                            <svg className={`animate-spin h-5 w-5 text-white ${lang === 'ar' ? 'ml-3' : '-ml-1 mr-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('controls.generating')}
                        </>
                    ) : (
                        <>
                            <SparklesIcon className={`w-5 h-5 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} />
                            {t('controls.generate')}
                        </>
                    )}
                 </button>
            </div>
        </div>
    );
};

export default ControlPanel;