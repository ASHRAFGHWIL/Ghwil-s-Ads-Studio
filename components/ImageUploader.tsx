import React, { useRef } from 'react';
import { UploadIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';

interface ImageUploaderProps {
  id: string;
  labelKey: string;
  onImageUpload: (base64: string) => void;
  previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, labelKey, onImageUpload, previewUrl }) => {
  const { t, lang } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.click();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
  }

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {t(labelKey)}
      </label>
      <div
        onClick={handleContainerClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="mt-1 flex justify-center items-center w-full h-48 px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-purple-400 transition-colors duration-200 bg-gray-900/50 relative overflow-hidden"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="h-full w-full object-contain absolute inset-0" />
        ) : (
          <div className="space-y-1 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <div className="flex text-sm text-gray-500">
              <p className={lang === 'ar' ? 'pr-1' : 'pl-1'}>{t('uploader.uploadOrDrop')}</p>
            </div>
            <p className="text-xs text-gray-600">{t('uploader.fileTypes')}</p>
          </div>
        )}
        <input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          className="sr-only"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
