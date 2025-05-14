import { useState, useCallback } from 'react';
import { validateEmail } from '../utils/useFormValidation';
import { forgotPassword } from '../api/authApi';

export const useForgotPassword = (onSuccess: () => void) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (serverError) setServerError('');
  };

  const handleResetPassword = useCallback(async () => {
    setSubmitted(true);
    const emailError = validateEmail(email);

    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setServerError('');
      onSuccess();
    } catch (error: any) {
      const message = error?.message || 'Error al enviar el correo.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }, [email, onSuccess]);

  return {
    email,
    errorMessage,
    serverError,
    submitted,
    loading,
    handleEmailChange,
    handleResetPassword,
  };
};
