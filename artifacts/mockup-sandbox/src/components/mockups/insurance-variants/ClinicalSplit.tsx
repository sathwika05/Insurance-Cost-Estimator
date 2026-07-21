import React from 'react';
import { Activity } from 'lucide-react';

export function ClinicalSplit() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Nav Bar */}
      <header className="bg-[#0f172a] text-white flex-none shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 w-1/4 py-4">
            <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400">
              <Activity className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white tracking-tight">
              Medical Insurance Cost Predictor
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-2">
            {[
              {
                title: 'Predictor',
                subtext: 'Run a prediction',
                active: true,
              },
              {
                title: 'About Model',
                subtext: 'How it was built',
                active: false,
              },
              {
                title: 'Performance',
                subtext: 'Model metrics',
                active: false,
              },
              {
                title: 'Dataset',
                subtext: 'Data & EDA insights',
                active: false,
              },
            ].map((tab) => (
              <div
                key={tab.title}
                className={`flex flex-col px-4 pt-4 pb-3 border-b-[3px] cursor-pointer transition-colors hover:bg-white/5 ${
                  tab.active ? 'border-[#0d9488]' : 'border-transparent'
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    tab.active ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {tab.title}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {tab.subtext}
                </span>
              </div>
            ))}
          </nav>

          {/* Right Status Badge */}
          <div className="w-1/4 flex justify-end items-center py-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span>
              <span className="text-xs font-medium text-slate-200">
                Model Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* Left Column: Form (~55%) */}
        <div className="w-full md:w-[55%] flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 pt-8 pb-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">
                Patient Information
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Complete all fields to generate a cost estimate
              </p>
            </div>

            <div className="p-8 flex flex-col gap-6">
              {/* Row 1: Age + Sex */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Sex
                  </label>
                  <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none">
                    <option value="">Select sex...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Row 2: BMI + Children */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    BMI (Body Mass Index)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24.5"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Row 3: Smoker + Region */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Smoker
                  </label>
                  <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none">
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Region
                  </label>
                  <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none">
                    <option value="">Select region...</option>
                    <option value="northeast">Northeast</option>
                    <option value="northwest">Northwest</option>
                    <option value="southeast">Southeast</option>
                    <option value="southwest">Southwest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 pt-4">
              <button className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d9488]">
                Calculate Cost
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Result Panel (~45%) */}
        <div className="w-full md:w-[45%]">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative sticky top-8">
            {/* Top Border Indicator */}
            <div className="h-1 w-full bg-[#0d9488]"></div>

            <div className="p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Estimated Annual Cost
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Based on your patient profile
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold tracking-tight text-[#0d9488]">
                  $12,450.00
                </span>
              </div>

              {/* Subtle Grid Summary */}
              <div className="rounded-lg bg-slate-50 border border-slate-100 p-5">
                <h4 className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-4">
                  Profile Summary
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">Age</span>
                    <span className="font-medium text-slate-700 mt-0.5">35</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">Sex</span>
                    <span className="font-medium text-slate-700 mt-0.5">Male</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">BMI</span>
                    <span className="font-medium text-slate-700 mt-0.5">24.5</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">Children</span>
                    <span className="font-medium text-slate-700 mt-0.5">0</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">Smoker</span>
                    <span className="font-medium text-slate-700 mt-0.5">No</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs">Region</span>
                    <span className="font-medium text-slate-700 mt-0.5">Northwest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm flex-none">
        Educational ML application. Not an official quote.
      </footer>
    </div>
  );
}
