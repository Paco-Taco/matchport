import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

const COUNTRY_CODES = [
  { code: '+52', name: 'México', emoji: '🇲🇽' },
  { code: '+1', name: 'EE.UU.', emoji: '🇺🇸' },
];

interface PhoneInputProps {
  onChange: (fullNumber: string) => void;
}

const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    onChange(`${selectedCountry.code}${phoneNumber.replace(/\D/g, '')}`);
  }, [selectedCountry, phoneNumber]);

  return (
    <View className="mb-6">
      <Text className="text-gray-700 mb-3 font-regular">
        Número de teléfono
      </Text>

      <View
        className={`flex-row items-center bg-transparent border ${
          isFocused ? 'border-primary' : 'border-gray-200'
        } rounded-2xl overflow-hidden`}
      >
        {/* Selector de LADA con emoji */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="flex-row items-center gap-2 px-3 border-r border-gray-200 bg-white"
        >
          <Text className="text-lg">{selectedCountry.emoji}</Text>
          <Text className="text-base font-regular">{selectedCountry.code}</Text>
          <Ionicons name="chevron-down" size={16} color="gray" />
        </Pressable>

        {/* Input de número */}
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => {
            const maxLength = 15;
            const numericText = text.replace(/[^0-9]/g, '').slice(0, maxLength);
            setPhoneNumber(numericText);
          }}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          maxLength={15}
          placeholder="(123) 456-7890"
          placeholderTextColor="gray"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 p-4 font-regular text-black bg-white"
        />
      </View>

      {/* Modal selector de país */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          className="flex-1 bg-white"
          style={{ paddingTop: Platform.OS === 'ios' ? '20%' : 0 }}
        >
          <FlatList
            data={COUNTRY_CODES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedCountry(item);
                  setModalVisible(false);
                }}
                className="px-4 py-3 border-b border-gray-100"
              >
                <Text className="text-lg font-regular">
                  {item.emoji} {item.name} ({item.code})
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PhoneInput;
