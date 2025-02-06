import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return <AuthForm onAuthSuccess={handleAuthSuccess} />;
};

export default LandingPage;