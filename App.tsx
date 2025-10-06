import React, { useState } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import Preview from './components/Preview';
import { LightingType, CameraAngle } from './types';
import { generateAdImage } from './services/geminiService';
import { useI18n } from './hooks/useI18n';

const App: React.FC = () => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [lighting, setLighting] = useState<LightingType>(LightingType.NATURAL_LIGHT);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>(CameraAngle.FRONT_VIEW);
  const [background, setBackground] = useState<string>('a clean, minimalist surface');
  const [styleIntensity, setStyleIntensity] = useState<number>(75);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useI18n();

  const handleGenerate = async () => {
    if (!productImage || !referenceImage) {
      setError(t('errors.ERROR_MISSING_IMAGES'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateAdImage({
        productImage,
        referenceImage,
        lighting,
        cameraAngle,
        background,
        styleIntensity,
      });
      setGeneratedImage(result);
    } catch (e: unknown) {
      if (e instanceof Error && e.message) {
        setError(t(`errors.${e.message}`));
      } else {
        setError(t("errors.ERROR_UNKNOWN"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: 'url(https://picsum.photos/seed/adstudio/1920/1080)'}}
      ></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <ControlPanel
              productImage={productImage}
              setProductImage={setProductImage}
              referenceImage={referenceImage}
              setReferenceImage={setReferenceImage}
              lighting={lighting}
              setLighting={setLighting}
              cameraAngle={cameraAngle}
              setCameraAngle={setCameraAngle}
              background={background}
              setBackground={setBackground}
              styleIntensity={styleIntensity}
              setStyleIntensity={setStyleIntensity}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-1">
            <Preview 
              imageUrl={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
