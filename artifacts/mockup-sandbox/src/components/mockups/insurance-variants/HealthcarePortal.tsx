import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export function HealthcarePortal() {
  const [activeTab, setActiveTab] = useState('Predictor');

  const tabs = [
    { id: 'Predictor', label: 'Predictor', subtext: 'Run a prediction' },
    { id: 'About Model', label: 'About Model', subtext: 'How it was built' },
    { id: 'Performance', label: 'Performance', subtext: 'Model metrics' },
    { id: 'Dataset', label: 'Dataset', subtext: 'Data & EDA insights' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-teal-600" />
            <h1 className="text-slate-800 font-bold text-lg tracking-tight">
              Medical Insurance Cost Predictor
            </h1>
          </div>
          <div className="text-sm text-slate-500 italic hidden sm:block">
            ISEM 503 · ML Project
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-[#ede9fe] border-b border-indigo-100 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 sm:gap-4 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center px-4 sm:px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-transparent text-slate-500 hover:bg-indigo-200/60 hover:text-indigo-900'
              }`}
            >
              <span className="font-semibold text-sm sm:text-base">{tab.label}</span>
              <span className={`text-[10px] sm:text-xs mt-0.5 ${activeTab === tab.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                {tab.subtext}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <main className="flex-1 w-full max-w-[900px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-50">
            <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Patient Information</h2>
            <p className="text-sm text-slate-500 mt-1">Complete all fields to generate a cost estimate</p>
          </div>
          
          <div className="p-6 sm:p-8 bg-white">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">Age</label>
                <input 
                  type="number" 
                  placeholder="e.g. 35"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">Sex</label>
                <select defaultValue="" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white appearance-none">
                  <option value="" disabled>Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">BMI (Body Mass Index)</label>
                <input 
                  type="number" 
                  step="0.1"
                  placeholder="e.g. 24.5"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">Number of Children</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">Smoker</label>
                <select defaultValue="" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white appearance-none">
                  <option value="" disabled>Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#6b7280]">Region</label>
                <select defaultValue="" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm text-slate-900 bg-white appearance-none">
                  <option value="" disabled>Select...</option>
                  <option value="northeast">Northeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="southwest">Southwest</option>
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2 mt-4">
                <button 
                  type="button"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-[15px]"
                >
                  Calculate Cost
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-600 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-bold text-[#1e1b4b] uppercase tracking-wider">Estimated Annual Cost</h3>
            <p className="text-sm text-slate-500 mt-1">Based on your patient profile</p>
          </div>
          <div className="text-center sm:text-right bg-indigo-50/50 py-3 px-6 rounded-lg border border-indigo-100/50">
            <div className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
              $12,450.00
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 pb-12 text-center text-sm text-slate-400">
        <p>Educational ML application. Not an official quote.</p>
      </footer>
    </div>
  );
}
