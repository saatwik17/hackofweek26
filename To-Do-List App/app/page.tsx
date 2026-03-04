import { TodoApp } from '@/components/todo-app';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 flex items-start justify-center overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/gradient/1920/1080"
          alt="Creative Background"
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-purple-900/50 to-blue-950/60 backdrop-blur-[2px]" />
      </div>
      
      <div className="relative z-10 w-full flex justify-center">
        <TodoApp />
      </div>
    </main>
  );
}
