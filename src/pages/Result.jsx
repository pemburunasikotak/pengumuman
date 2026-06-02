import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import { useEffect } from 'react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try state first, fallback to sessionStorage
  const participant = location.state?.participant || (() => {
    try {
      const stored = sessionStorage.getItem('last_participant');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    if (!participant) {
      navigate('/', { replace: true });
    }
  }, [participant, navigate]);

  if (!participant) return null;

  return (
    <div className="full-page-bg bg-red-400">
      <div className="w-full max-w-4xl mx-auto py-4 px-2">
        <ResultCard participant={participant} />
      </div>
    </div>
  );
}
