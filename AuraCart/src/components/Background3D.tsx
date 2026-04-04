import React, { useEffect, useState } from 'react';

export function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-100">
      {/* Clean, subtle gradient for the top section like many e-commerce sites */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50 to-transparent opacity-50" />
    </div>
  );
}
