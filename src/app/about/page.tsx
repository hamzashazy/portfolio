// pages/about.tsx
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to our website! We’re passionate developers building modern web experiences using the latest technologies. 
          This page is a simple About Us section built with <span className="font-medium text-blue-600">Next.js</span>, <span className="font-medium text-blue-600">Tailwind CSS</span>, and <span className="font-medium text-blue-600">TypeScript</span>.
        </p>
        <div className="mt-8">
          <p className="text-gray-500">
            🚀 Our goal is to build scalable, responsive, and elegant web apps.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
