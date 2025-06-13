export const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]{2,50}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const rfcRegex = /^([A-ZÑ&]{3,4})(\d{2})(\d{2})(\d{2})([A-Z\d]{3})$/;

export const useValidations = () => {
  const validateName = (value: string) => nameRegex.test(value);
  const validateEmail = (value: string) => emailRegex.test(value);
  const validateRfc = (value: string) => rfcRegex.test(value);

  const passwordCriteria = {
    minLength: (password: string) => password.length >= 8,
    hasUppercase: (password: string) => /[A-Z]/.test(password),
    hasLowercase: (password: string) => /[a-z]/.test(password),
    hasNumber: (password: string) => /\d/.test(password),
    hasSymbol: (password: string) => /[\W_]/.test(password),
  };

  const validatePassword = (password: string) =>
    Object.values(passwordCriteria).every((fn) => fn(password));

  const getPasswordCriteriaStatus = (password: string) =>
    Object.entries(passwordCriteria).map(([key, fn]) => ({
      key,
      label: {
        minLength: 'Al menos 8 caracteres',
        hasUppercase: 'Una letra mayúscula',
        hasLowercase: 'Una letra minúscula',
        hasNumber: 'Un número',
        hasSymbol: 'Un símbolo (ej. !@#$%)',
      }[key as keyof typeof passwordCriteria],
      isValid: fn(password),
    }));

  return {
    validateName,
    validateEmail,
    validateRfc,
    validatePassword,
    getPasswordCriteriaStatus,
  };
};
