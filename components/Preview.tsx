import React from 'react';
import { DownloadIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';

interface PreviewProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const Preview: React.FC<PreviewProps> = ({ imageUrl, isLoading, error }) => {
  const { t, lang } = useI18n();

  const Placeholder = () => (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full p-4">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      <p className="text-lg font-medium">{t('preview.placeholderTitle')}</p>
      <p className="text-sm">{t('preview.placeholderSubtitle')}</p>
    </div>
  );
  
  const Loader = () => (
    <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-400">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mx-auto"></div>
            <p className="mt-4 text-lg font-medium">{t('preview.loaderTitle')}</p>
            <p className="text-sm">{t('preview.loaderSubtitle')}</p>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-800/50 rounded-2xl w-full h-full flex flex-col items-center justify-center p-4 border border-gray-700 backdrop-blur-sm">
      <div className="relative w-full h-full min-h-[30rem] md:min-h-0 flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden">
        {isLoading && <Loader />}
        {!isLoading && error && (
            <div className="text-center text-red-400 p-4">
                <h3 className="text-lg font-bold">{t('preview.errorTitle')}</h3>
                <p className="text-sm">{error}</p>
            </div>
        )}
        {!isLoading && !error && !imageUrl && <Placeholder />}
        {!isLoading && imageUrl && (
            <>
                <img src={imageUrl} alt="Generated ad visual" className="object-contain w-full h-full" />
                <a
                    href={imageUrl}
                    download="generated-ad.png"
                    className={`absolute bottom-4 ${lang === 'ar' ? 'left-4' : 'right-4'} bg-purple-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2`}
                >
                    <DownloadIcon className="w-5 h-5" />
                    {t('preview.download')}
                </a>
            </>
        )}
      </div>
    </div>
  );
};

export default Preview;
