import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ArrowLeft } from 'lucide-react';

type Step = 'hero' | 'form' | 'success';

export default function App() {
  const [step, setStep] = useState<Step>('hero');
  const [email, setEmail] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('08:00');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState<string>('');

  const genericOptions = [
    "Space", 
    "History", 
    "Tech", 
    "Philosophy", 
    "Science", 
    "Economics"
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCustomInterest();
    }
  };

  const addCustomInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !selectedInterests.includes(trimmed)) {
      setSelectedInterests([...selectedInterests, trimmed]);
      setInterestInput('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setSelectedInterests(selectedInterests.filter(i => i !== interestToRemove));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      alert("Please select or add at least one interest!");
      return;
    }

    try {
      const response = await fetch('https://curator-v7qa.onrender.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          interests: selectedInterests,
          time: deliveryTime,
        }),
      });

      if (response.ok) {
        setStep('success');
      } else {
        const errMsg = await response.text();
        alert(`Subscription failed: ${errMsg}`);
      }
    } catch (error) {
      console.error("Error communicating with server:", error);
      alert("Could not connect to the subscription server. Make sure your Go backend is running!");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-indigo-100 font-sans antialiased">
      
      {/* Header */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
            B
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Byte
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl w-full mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
        
        {/* STEP 1: HERO VIEW (Minimalist Landing) */}
        {step === 'hero' && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium mx-auto">
              <Sparkles className="h-3 w-3 text-indigo-500" /> Reduce decision fatigue
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Curious topics, delivered daily.
              </h1>
              <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                Byte sends you curious topics around your interests worth exploring at an agreed time everyday. Just read, learn, and grow.
              </p>
            </div>

            <button
              onClick={() => setStep('form')}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200 text-sm shadow-sm cursor-pointer mx-auto"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: MINIMALIST CONFIGURATION FORM */}
        {step === 'form' && (
          <div className="space-y-8">
            {/* Back Button */}
            <button 
              type="button"
              onClick={() => setStep('hero')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">Configure your Byte</h2>
              <p className="text-sm text-slate-500">Pick your schedule and curated interests.</p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-6">
              
              {/* Hybrid Interests Section */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  What are you curious about?
                </label>

                {/* Part A: Generic Pills */}
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-400">Select popular topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {genericOptions.map((topic) => {
                      const isSelected = selectedInterests.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggleInterest(topic)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {isSelected ? `✓ ${topic}` : `+ ${topic}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Part B: Custom Tags Input */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400">Or add your own unique interests:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., Deep Sea Exploration..."
                      className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-900"
                    />
                    <button
                      type="button"
                      onClick={addCustomInterest}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Part C: Display Unified Choices */}
                {selectedInterests.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] text-slate-400">Your profile:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 pl-3 pr-2 py-1 rounded-lg text-xs font-medium border border-slate-200"
                        >
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full p-0.5 transition cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Time Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Delivery time
                </label>
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full max-w-[150px] bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
                />
              </div>

              {/* Email Entry */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200 text-sm shadow-sm cursor-pointer"
              >
                Start receiving Bytes
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {step === 'success' && (
          <div className="text-center space-y-6">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Check className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">You're on the list</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                We'll deliver your first topic to <span className="font-medium text-slate-900">{email}</span> tomorrow at <span className="font-medium text-slate-900">{deliveryTime}</span>.
              </p>
            </div>
            <button
              onClick={() => {
                setStep('hero');
                setEmail('');
                setSelectedInterests([]);
              }}
              className="text-xs text-slate-400 hover:text-slate-900 underline underline-offset-4 transition cursor-pointer"
            >
              Reset or edit subscription
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-4xl w-full mx-auto px-6 flex justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Byte.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition">Contact</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}