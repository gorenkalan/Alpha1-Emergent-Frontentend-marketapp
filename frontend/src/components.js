import React, { useState, useEffect } from 'react';

// Mock stock data - expanded
const mockStockData = [
  { company: "Reliance Industries", marketCap: "1845673", sector: "Oil & Gas", price: "2456.75", dataQuality: "High", change1d: "+2.45", change5d: "+8.12", change10d: "-1.23", change15d: "+15.67", change20d: "+12.34", change30d: "+25.78", volume: "12456789" },
  { company: "Tata Consultancy Services", marketCap: "1234567", sector: "IT Services", price: "3345.20", dataQuality: "High", change1d: "+1.80", change5d: "+5.45", change10d: "+12.67", change15d: "+18.90", change20d: "+22.11", change30d: "+28.45", volume: "8765432" },
  { company: "HDFC Bank", marketCap: "987654", sector: "Banking", price: "1567.85", dataQuality: "Medium", change1d: "-0.75", change5d: "+3.22", change10d: "+7.89", change15d: "+11.45", change20d: "+16.78", change30d: "+21.23", volume: "15678901" },
  { company: "Infosys", marketCap: "876543", sector: "IT Services", price: "1789.30", dataQuality: "High", change1d: "+3.12", change5d: "+9.87", change10d: "+14.56", change15d: "+19.23", change20d: "+24.67", change30d: "+31.45", volume: "6789123" },
  { company: "ICICI Bank", marketCap: "765432", sector: "Banking", price: "1123.45", dataQuality: "High", change1d: "+1.45", change5d: "+6.78", change10d: "+11.23", change15d: "+16.89", change20d: "+21.45", change30d: "+27.67", volume: "9876543" },
  { company: "Bharti Airtel", marketCap: "654321", sector: "Telecom", price: "894.60", dataQuality: "Medium", change1d: "-2.30", change5d: "+4.56", change10d: "+9.12", change15d: "+13.78", change20d: "+18.34", change30d: "+23.89", volume: "11234567" },
  { company: "ITC", marketCap: "543210", sector: "FMCG", price: "456.78", dataQuality: "High", change1d: "+0.95", change5d: "+3.45", change10d: "+7.23", change15d: "+12.67", change20d: "+17.89", change30d: "+22.34", volume: "7890123" },
  { company: "State Bank of India", marketCap: "432109", sector: "Banking", price: "723.45", dataQuality: "Medium", change1d: "+2.67", change5d: "+8.90", change10d: "+13.45", change15d: "+18.23", change20d: "+23.78", change30d: "+29.12", volume: "13456789" },
  { company: "Larsen & Toubro", marketCap: "321098", sector: "Construction", price: "3456.78", dataQuality: "High", change1d: "+1.23", change5d: "+5.67", change10d: "+10.34", change15d: "+15.89", change20d: "+20.45", change30d: "+26.78", volume: "5678912" },
  { company: "Asian Paints", marketCap: "298765", sector: "Chemicals", price: "2987.65", dataQuality: "High", change1d: "-1.45", change5d: "+2.78", change10d: "+6.45", change15d: "+11.23", change20d: "+15.67", change30d: "+20.89", volume: "4567891" },
  { company: "Adani Enterprises", marketCap: "543219", sector: "Conglomerate", price: "2345.67", dataQuality: "Medium", change1d: "+12.45", change5d: "+18.90", change10d: "+25.67", change15d: "+32.45", change20d: "+28.90", change30d: "+35.78", volume: "18765432" },
  { company: "Zomato", marketCap: "123456", sector: "Food Delivery", price: "189.45", dataQuality: "High", change1d: "+8.90", change5d: "+15.67", change10d: "+22.34", change15d: "+28.90", change20d: "+24.56", change30d: "+31.23", volume: "25678901" },
  { company: "Paytm", marketCap: "234567", sector: "Fintech", price: "567.89", dataQuality: "Medium", change1d: "+7.34", change5d: "+12.78", change10d: "+19.45", change15d: "+25.67", change20d: "+21.89", change30d: "+28.45", volume: "19876543" },
  { company: "Nykaa", marketCap: "156789", sector: "E-commerce", price: "234.56", dataQuality: "High", change1d: "+6.78", change5d: "+11.45", change10d: "+17.89", change15d: "+23.45", change20d: "+19.78", change30d: "+26.34", volume: "8765432" },
  { company: "PolicyBazaar", marketCap: "187654", sector: "Insurance", price: "456.78", dataQuality: "Medium", change1d: "+5.67", change5d: "+9.89", change10d: "+15.67", change15d: "+21.34", change20d: "+17.89", change30d: "+24.56", volume: "6789123" },
  { company: "Vedanta", marketCap: "345678", sector: "Mining", price: "234.56", dataQuality: "High", change1d: "-8.90", change5d: "-12.34", change10d: "-18.67", change15d: "-24.45", change20d: "-20.78", change30d: "-27.89", volume: "22345678" },
  { company: "Tata Steel", marketCap: "298765", sector: "Steel", price: "123.45", dataQuality: "Medium", change1d: "-7.34", change5d: "-11.67", change10d: "-17.23", change15d: "-22.89", change20d: "-19.45", change30d: "-25.67", volume: "16789123" },
  { company: "JSW Steel", marketCap: "267891", sector: "Steel", price: "678.90", dataQuality: "High", change1d: "-6.78", change5d: "-10.45", change10d: "-15.89", change15d: "-21.23", change20d: "-17.67", change30d: "-23.45", volume: "14567890" },
  { company: "Coal India", marketCap: "234567", sector: "Mining", price: "345.67", dataQuality: "Medium", change1d: "-5.67", change5d: "-9.23", change10d: "-14.56", change15d: "-19.78", change20d: "-16.34", change30d: "-21.89", volume: "12345678" },
  { company: "ONGC", marketCap: "198765", sector: "Oil & Gas", price: "178.90", dataQuality: "High", change1d: "-4.89", change5d: "-8.12", change10d: "-13.45", change15d: "-18.67", change20d: "-15.23", change30d: "-20.56", volume: "10987654" },
];

const mockTopGainers = [
  { company: "Adani Enterprises", marketCap: "543219", sector: "Conglomerate", price: "2345.67", change: "+12.45", volume: "18765432" },
  { company: "Zomato", marketCap: "123456", sector: "Food Delivery", price: "189.45", change: "+8.90", volume: "25678901" },
  { company: "Paytm", marketCap: "234567", sector: "Fintech", price: "567.89", change: "+7.34", volume: "19876543" },
  { company: "Nykaa", marketCap: "156789", sector: "E-commerce", price: "234.56", change: "+6.78", volume: "8765432" },
  { company: "PolicyBazaar", marketCap: "187654", sector: "Insurance", price: "456.78", change: "+5.67", volume: "6789123" },
  { company: "Infosys", marketCap: "876543", sector: "IT Services", price: "1789.30", change: "+3.12", volume: "6789123" },
  { company: "State Bank of India", marketCap: "432109", sector: "Banking", price: "723.45", change: "+2.67", volume: "13456789" },
  { company: "Reliance Industries", marketCap: "1845673", sector: "Oil & Gas", price: "2456.75", change: "+2.45", volume: "12456789" },
];

const mockTopLosers = [
  { company: "Vedanta", marketCap: "345678", sector: "Mining", price: "234.56", change: "-8.90", volume: "22345678" },
  { company: "Tata Steel", marketCap: "298765", sector: "Steel", price: "123.45", change: "-7.34", volume: "16789123" },
  { company: "JSW Steel", marketCap: "267891", sector: "Steel", price: "678.90", change: "-6.78", volume: "14567890" },
  { company: "Coal India", marketCap: "234567", sector: "Mining", price: "345.67", change: "-5.67", volume: "12345678" },
  { company: "ONGC", marketCap: "198765", sector: "Oil & Gas", price: "178.90", change: "-4.89", volume: "10987654" },
  { company: "Bharti Airtel", marketCap: "654321", sector: "Telecom", price: "894.60", change: "-2.30", volume: "11234567" },
  { company: "Asian Paints", marketCap: "298765", sector: "Chemicals", price: "2987.65", change: "-1.45", volume: "4567891" },
  { company: "HDFC Bank", marketCap: "987654", sector: "Banking", price: "1567.85", change: "-0.75", volume: "15678901" },
];

const mockNews = [
  "OLA Q1 results announced - Revenue up 23% YoY",
  "Govt okays 3000 crores defense budget - Major boost for defense stocks",
  "RBI maintains repo rate at 6.5% - Banking sector impact analysis",
  "Tech stocks rally as IT exports data shows strong growth",
  "Monsoon forecast positive - Agriculture sector to benefit"
];

const sectors = ["All Sectors", "Banking", "IT Services", "Oil & Gas", "FMCG", "Telecom", "Construction", "Chemicals", "Mining", "Steel", "Conglomerate", "Food Delivery", "Fintech", "E-commerce", "Insurance"];

// Components
export const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-gray-900 shadow-2xl sticky top-0 z-50 border-b border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-500">StockTracker</h1>
              <p className="text-green-300 text-xs">Terminal v2.1.0</p>
            </div>
          </div>
          <nav className="flex space-x-4">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                currentPage === 'home' 
                ? 'bg-green-500 text-black' 
                : 'text-green-400 hover:text-green-300 hover:bg-gray-800'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('terminal')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                currentPage === 'terminal' 
                ? 'bg-green-500 text-black' 
                : 'text-green-400 hover:text-green-300 hover:bg-gray-800'
              }`}
            >
              Updates
            </button>
            <button 
              onClick={() => setCurrentPage('terminal')}
              className="text-green-400 hover:text-green-300 px-3 py-1 text-sm"
            >
              Login
            </button>
            <button className="bg-green-500 text-black px-4 py-1 rounded text-sm font-semibold hover:bg-green-400 transition-all duration-300">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1639768939489-025b90ba9f23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxmaW5hbmNpYWwlMjBjaGFydHN8ZW58MHx8fGJsdWV8MTc1Mjk1Njc4OXww&ixlib=rb-4.1.0&q=85" 
          alt="Financial Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Stop Guessing. Start Analyzing.
              </h1>
              <div className="space-y-4 text-lg lg:text-xl leading-relaxed">
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">🌏</span>
                  <span>A Growing Economy Like India Offers Endless Opportunities</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <span>Only 13.7% of Indians have a demat account</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span>But over 60% of Americans invest in the stock market</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">💡</span>
                  <span>India is still growing—you're early, not late</span>
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 backdrop-blur-lg p-8 rounded-2xl border border-blue-400/20 shadow-2xl">
              <p className="text-xl lg:text-2xl leading-relaxed mb-6">
                In a market like India, investing isn't gambling—<br/>
                it's the gateway to financial freedom for the middle class.<br/>
                It's the only place where a ₹10 idea can become ₹2 lakh,<br/>
                or a ₹2 lakh business is sold at 80% off—to those who know where to look.
              </p>
              <p className="text-lg flex items-center space-x-3">
                <span className="text-2xl">🕰️</span>
                <span className="font-semibold">So the best time to invest in India... is the next decade.</span>
              </p>
            </div>
            
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-green-500/25">
              Start Your Investment Journey
            </button>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1643962578875-90e5e275d449?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxmaW5hbmNpYWwlMjBjaGFydHN8ZW58MHx8fGJsdWV8MTc1Mjk1Njc4OXww&ixlib=rb-4.1.0&q=85" 
              alt="Stock Market Analysis"
              className="w-full h-auto rounded-2xl shadow-2xl border border-blue-400/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const EngagementSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            The Problem with Stock Market Advice
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            You're not alone. Most people don't invest—not because they don't want to grow their wealth,
            but because they don't know how to choose the right stocks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p className="text-2xl font-semibold text-blue-900">That's where we come in.</p>
            <p>We don't make bold claims. We don't chase headlines. And we definitely don't tell you which stock will be the next multibagger.</p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="flex items-start space-x-3">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <span>If someone says, "This stock will surely 10x," there's a high chance the opposite is already in motion.</span>
              </p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <p className="flex items-start space-x-3">
                <span className="text-green-500 font-bold text-xl">✅</span>
                <span className="font-semibold">The first rule of smart investing: Be skeptical of hype.</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h3>
            <p className="text-lg text-gray-600 mb-6">We break down what's happening in the market—simply and honestly</p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚗</span>
                <p className="text-gray-700">Ola's stock crashed over 70% despite being India's first EV IPO</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <p className="text-gray-700">Why a 20% rally in a weak stock doesn't always mean a comeback</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">We help you understand the bigger picture, so you can make your own calls</p>
            </div>
            
            <div className="mt-6 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="flex items-start space-x-3">
                <span className="text-yellow-600 font-bold text-xl">⚠️</span>
                <span className="text-yellow-800">
                  We don't encourage trading, futures, or options — <strong>93% of people lose money in F&O</strong>
                </span>
              </p>
            </div>
            
            <p className="mt-6 text-lg text-gray-700 font-medium">
              We're just your starting point. A guide to the market. No noise. No shortcuts. Just the right foundation to start your investing journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ScrollingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockNews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gray-900 text-green-400 py-2 overflow-hidden border-t border-b border-green-500 font-mono text-sm">
      <div className="flex items-center space-x-8">
        <span className="font-semibold text-green-500 px-4">BREAKING:</span>
        <div className="flex-1 relative h-5">
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-in-out flex items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {mockNews.map((news, index) => (
              <div key={index} className="w-full flex-shrink-0 cursor-pointer hover:text-green-300">
                {news}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConvinceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Our Only Promise: We Don't Make Promises
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className="text-green-400 font-bold text-xl">✅</span>
                <span>No claims. No predictions. No hype.</span>
              </div>
              <p>We're skeptical by default—and that's our USP.</p>
              <p>We only share publicly available information and encourage you to do your own research.</p>
            </div>
            
            <div className="bg-red-900/30 border border-red-400 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                <span className="text-3xl mr-3">⚠️</span>
                Don't trust us blindly.
              </h3>
              <p className="text-xl">
                Yes—don't. Just try us out. Free of charge. See the data. Think for yourself.
              </p>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1660020619062-70b16c44bf0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZGFzaGJvYXJkfGVufDB8fHxibHVlfDE3NTI5NTY3OTd8MA&ixlib=rb-4.1.0&q=85" 
              alt="Investment Dashboard"
              className="w-full h-auto rounded-2xl shadow-2xl border border-gray-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            How Our Analysis Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We help you understand how the market actually reacted—not how people say it will.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">1. Market Reaction Scanner</h3>
            <p className="text-gray-700">
              At the end of each trading day, our system scans how the market behaved—tracking stock movements, volumes, news events, and sector rotations.
            </p>
          </div>
          
          <div className="bg-green-50 p-8 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-green-900 mb-4">2. Statistical Insights</h3>
            <p className="text-gray-700">
              Instead of giving you "buy/sell calls," we show what the data actually says—Was it a broad market rally? Was the volume real? Which sectors moved?
            </p>
          </div>
          
          <div className="bg-purple-50 p-8 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-purple-900 mb-4">3. Company-Level Breakdowns</h3>
            <p className="text-gray-700">
              We highlight key movements in companies—including fundamentals, financials, and recent developments. No filters, no sugarcoating.
            </p>
          </div>
          
          <div className="bg-orange-50 p-8 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🧮</div>
            <h3 className="text-xl font-bold text-orange-900 mb-4">4. Tools for Analysis</h3>
            <p className="text-gray-700">
              We give you access to tables, visual tools, and filters—so you can analyze the data and draw your own conclusions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PreviewSection = ({ setCurrentPage }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            See Our Analysis in Action
          </h2>
          <p className="text-xl text-gray-600">
            Get a preview of our comprehensive stock analysis dashboard
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Analysis Results Preview</h3>
              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Live Data Available</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Top Gainers</h4>
                <div className="space-y-2">
                  {mockTopGainers.slice(0, 3).map((stock, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-700">{stock.company}</span>
                      <span className="text-sm font-semibold text-green-600">{stock.change}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Top Losers</h4>
                <div className="space-y-2">
                  {mockTopLosers.slice(0, 3).map((stock, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-700">{stock.company}</span>
                      <span className="text-sm font-semibold text-red-600">{stock.change}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Market Overview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Data Range:</span>
                    <span className="font-medium">19 Jun - 19 Jul 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Trading Days:</span>
                    <span className="font-medium">22 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Last Updated:</span>
                    <span className="font-medium">19 Jul 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Company</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Market Cap (Cr)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Sector</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Latest Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">1D Change %</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">5D Change %</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">30D Change %</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStockData.slice(0, 10).map((stock, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline">
                        {stock.company}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">₹{stock.marketCap}</td>
                      <td className="border border-gray-300 px-4 py-3">{stock.sector}</td>
                      <td className="border border-gray-300 px-4 py-3">₹{stock.price}</td>
                      <td className={`border border-gray-300 px-4 py-3 ${stock.change1d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change1d}%
                      </td>
                      <td className={`border border-gray-300 px-4 py-3 ${stock.change5d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change5d}%
                      </td>
                      <td className={`border border-gray-300 px-4 py-3 ${stock.change30d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change30d}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <div className="space-x-4">
                <button 
                  onClick={() => setCurrentPage('terminal')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Full Analysis
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1586448681913-2fc1b29c5cca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxpbnZlc3RtZW50JTIwZGFzaGJvYXJkfGVufDB8fHxibHVlfDE3NTI5NTY3OTd8MA&ixlib=rb-4.1.0&q=85" 
          alt="Financial Data"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-8">
          Ready to Make Informed Investment Decisions?
        </h2>
        <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed">
          Join thousands of smart investors who trust our data-driven approach to market analysis.
          Start your journey with comprehensive stock insights today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Live Data</h3>
            <p className="text-blue-200">Real-time stock prices and market movements</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-blue-200">Comprehensive filtering and analysis tools</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Market Insights</h3>
            <p className="text-blue-200">Daily market reports and sector analysis</p>
          </div>
        </div>
        
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl transform hover:scale-105">
          Start Analyzing Now
        </button>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-black font-bold">S</span>
              </div>
              <span className="text-xl font-bold">StockTracker</span>
            </div>
            <p className="text-gray-400">Smart investment insights for the modern investor.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StockTracker. All rights reserved. Investment insights for informed decisions.</p>
        </div>
      </div>
    </footer>
  );
};

// Top Gainers/Losers Table Component
export const MarketMoversTable = ({ data, title, type, setSelectedCompany, setCurrentPage }) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('change');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sectorFilter, setSectorFilter] = useState('All Sectors');
  const [minMarketCap, setMinMarketCap] = useState('');
  const [maxMarketCap, setMaxMarketCap] = useState('');
  
  const filteredData = data
    .filter(stock => {
      if (sectorFilter !== 'All Sectors' && stock.sector !== sectorFilter) return false;
      if (minMarketCap && parseInt(stock.marketCap) < parseInt(minMarketCap)) return false;
      if (maxMarketCap && parseInt(stock.marketCap) > parseInt(maxMarketCap)) return false;
      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'change':
          aVal = parseFloat(a.change.replace('%', ''));
          bVal = parseFloat(b.change.replace('%', ''));
          break;
        case 'company':
          return sortOrder === 'asc' ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company);
        case 'marketCap':
          aVal = parseInt(a.marketCap);
          bVal = parseInt(b.marketCap);
          break;
        case 'price':
          aVal = parseFloat(a.price);
          bVal = parseFloat(b.price);
          break;
        case 'volume':
          aVal = parseInt(a.volume);
          bVal = parseInt(b.volume);
          break;
        default:
          aVal = parseFloat(a.change.replace('%', ''));
          bVal = parseFloat(b.change.replace('%', ''));
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  
  const totalPages = Math.ceil(filteredData.length / displayCount);
  const paginatedData = filteredData.slice((currentPage - 1) * displayCount, currentPage * displayCount);
  
  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);
    setCurrentPage('company');
  };
  
  return (
    <div className="bg-gray-900 text-green-400 rounded border border-green-500 font-mono">
      <div className="bg-gray-800 px-4 py-3 border-b border-green-500 flex justify-between items-center">
        <h3 className="text-green-500 font-bold">{title}</h3>
        <span className="text-xs text-green-300">{filteredData.length} stocks</span>
      </div>
      
      {/* Filters */}
      <div className="p-4 border-b border-gray-700 grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
        <select 
          value={sectorFilter} 
          onChange={(e) => setSectorFilter(e.target.value)}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
        >
          {sectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
        
        <input
          placeholder="Min Market Cap"
          value={minMarketCap}
          onChange={(e) => setMinMarketCap(e.target.value)}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded placeholder-green-600"
        />
        
        <input
          placeholder="Max Market Cap"
          value={maxMarketCap}
          onChange={(e) => setMaxMarketCap(e.target.value)}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded placeholder-green-600"
        />
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
        >
          <option value="change">Change %</option>
          <option value="company">Company</option>
          <option value="marketCap">Market Cap</option>
          <option value="price">Price</option>
          <option value="volume">Volume</option>
        </select>
        
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        
        <select 
          value={displayCount} 
          onChange={(e) => setDisplayCount(parseInt(e.target.value))}
          className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
        >
          <option value={10}>10 stocks</option>
          <option value={25}>25 stocks</option>
          <option value={50}>50 stocks</option>
          <option value={100}>100 stocks</option>
        </select>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-800 text-green-500">
            <tr>
              <th className="text-left p-2 border-r border-gray-700">Company</th>
              <th className="text-left p-2 border-r border-gray-700">Market Cap (Cr)</th>
              <th className="text-left p-2 border-r border-gray-700">Sector</th>
              <th className="text-left p-2 border-r border-gray-700">Price</th>
              <th className="text-left p-2 border-r border-gray-700">Change %</th>
              <th className="text-left p-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((stock, index) => (
              <tr key={index} className="border-t border-gray-800 hover:bg-gray-800">
                <td 
                  className="p-2 border-r border-gray-800 text-green-400 cursor-pointer hover:text-green-300 hover:underline"
                  onClick={() => handleCompanyClick(stock.company)}
                >
                  {stock.company}
                </td>
                <td className="p-2 border-r border-gray-800">₹{stock.marketCap}</td>
                <td className="p-2 border-r border-gray-800 text-blue-400">{stock.sector}</td>
                <td className="p-2 border-r border-gray-800">₹{stock.price}</td>
                <td className={`p-2 border-r border-gray-800 ${
                  stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change}%
                </td>
                <td className="p-2 text-cyan-400">{parseInt(stock.volume).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-gray-700 flex justify-between items-center text-xs">
          <span className="text-green-300">
            Page {currentPage} of {totalPages} ({filteredData.length} results)
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-gray-800 border border-green-500 text-green-400 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-gray-800 border border-green-500 text-green-400 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};