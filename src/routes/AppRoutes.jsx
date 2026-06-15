import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';
import Verify from '../pages/Verify';
import Countdown from '../pages/Countdown';

export default function AppRoutes() {
  // const targetDateStr = '2026-06-17T15:00:00+07:00';
  
  // const [isBeforeRelease, setIsBeforeRelease] = useState(() => {
  //   const target = new Date(targetDateStr).getTime();
  //   return Date.now() < target;
  // });

  // useEffect(() => {
  //   if (!isBeforeRelease) return;

  //   const target = new Date(targetDateStr).getTime();
  //   const interval = setInterval(() => {
  //     if (Date.now() >= target) {
  //       setIsBeforeRelease(false);
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isBeforeRelease]);

  // if (isBeforeRelease) {
  //   return <Countdown targetDate={targetDateStr} onComplete={() => setIsBeforeRelease(false)} />;
  // }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/verify/:id" element={<Verify />} />
    </Routes>
  );
}
