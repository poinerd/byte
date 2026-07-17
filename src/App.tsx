import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ArrowLeft } from 'lucide-react';

type Step = 'hero' | 'form' | 'success';

export default function App() {
  const [step, setStep] = useState<Step>('hero');
  const [email, setEmail] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('08:00');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestsList = [
    "Space & Cosmology",
    "Cognitive Science",
    "System Design",
    "Lost Histories",
    "Synthetic Biology",
    "Micro-economics"
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      alert("Please select at least one interest!");
      return;
    }
    setStep('success');
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
          <div className="text-center space-y-8 animate-fade-in">
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

        {/* STEP 2: MINIMALIST FORM VIEW */}
        {step === 'form' && (
          <div className="space-y-8 animate-fade-in">
            {/* Back Button */}
            <button 
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
              {/* Interests Select */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Select interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
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

              {/* Submit */}
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
          <div className="text-center space-y-6 animate-fade-in">
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