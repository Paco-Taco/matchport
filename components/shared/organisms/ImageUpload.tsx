import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

interface ImageUploadProps {
  label?: string;
  variant?: 'rounded' | 'circle';
  aspect?: [number, number];
  value?: ImageFile | null;
  onChange?: (file: ImageFile) => void;
}

const getImageMeta = (uri: string): { name: string; type: string } => {
  const filename = uri.split('/').pop() || 'image.jpg';
  const match = /\.(\w+)$/.exec(filename);
  const extension = match?.[1]?.toLowerCase();
  const mime = extension === 'png' ? 'image/png' : 'image/jpeg';
  return { name: filename, type: mime };
};

const ImageUpload = ({
  label,
  variant = 'rounded',
  aspect,
  value,
  onChange,
}: ImageUploadProps) => {
  const [imageUri, setImageUri] = useState<string | null>(value?.uri || null);

  useEffect(() => {
    if (value?.uri !== imageUri) {
      setImageUri(value?.uri || null);
    }
  }, [value]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      alert(
        'Se requiere permiso a tu galería para poder seleccionar una foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: variant === 'circle' ? [1, 1] : aspect,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri } = result.assets[0];
      const meta = getImageMeta(uri);
      const file = { uri, name: meta.name, type: meta.type };

      setImageUri(uri);
      onChange?.(file);
    }
  };

  const containerClass = clsx(
    'border-2 border-dashed border-gray-300 items-center justify-center',
    variant === 'circle'
      ? 'w-32 h-32 rounded-full'
      : 'h-60 rounded-xl w-full max-w-[400px]'
  );

  const imageClass = clsx(
    'object-cover',
    variant === 'circle' ? 'w-32 h-32 rounded-full' : 'w-full h-full rounded-xl'
  );

  return (
    <View className="my-4">
      {label && (
        <Text className="text-base font-regular text-gray-800 mb-2">
          {label}
        </Text>
      )}
      <Pressable onPress={pickImage} className={containerClass}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} className={imageClass} />
        ) : (
          <View className="items-center">
            <Ionicons name="cloud-upload-outline" size={28} color="gray" />
            <Text className="text-gray-500 mt-1 text-sm font-regular">
              Subir foto
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ImageUpload;
