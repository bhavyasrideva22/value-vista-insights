
import React from "react";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-dark-green text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Value Vista Insights
          </h1>
          <p className="text-sm md:text-base text-secondary/90">
            Powerful business calculators for strategic decision-making
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      <footer className="bg-dark-green text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Value Vista Insights</h3>
              <p className="text-sm text-gray-300">
                Providing powerful business calculators and insights to help you make informed decisions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-300">
                Email: info@valuevistainsights.com<br />
                Phone: +91 98765 43210
              </p>
              <p className="text-sm text-gray-300 mt-2">
                © {new Date().getFullYear()} Value Vista Insights. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
