import { apiCoreInstance } from '@/api/apiCoreInstance';
import { ImageFile } from '@/components/shared/organisms/ImageUpload';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rfc: string;
  password: string;
  ine: ImageFile;
  profilePhoto?: ImageFile;
}

export const registerUser = async (payload: RegisterPayload) => {
  const formData = new FormData();

  formData.append('firstName', payload.firstName);
  formData.append('lastName', payload.lastName);
  formData.append('phoneNumber', payload.phoneNumber);
  formData.append('rfc', payload.rfc);
  formData.append('password', payload.password);

  if (payload.profilePhoto) {
    formData.append('files', {
      uri: payload.profilePhoto.uri,
      name: payload.profilePhoto.name,
      type: payload.profilePhoto.type,
    } as any);
  }

  if (payload.ine) {
    formData.append('files', {
      uri: payload.ine.uri,
      name: payload.ine.name,
      type: payload.ine.type,
    } as any);
  }

  try {
    const response = await apiCoreInstance.post('/clients/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
