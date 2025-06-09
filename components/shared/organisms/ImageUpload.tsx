import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface ImageUploadProps {
  label?: string;
  variant?: 'rounded' | 'circle';
  aspect?: [number, number];
}

const ImageUpload = ({
  label,
  variant = 'rounded',
  aspect,
}: ImageUploadProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

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
      aspect: aspect,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
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
