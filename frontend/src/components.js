import React, { useState, useEffect } from 'react';

// Mock stock data
const mockStockData = [
  { company: "Reliance Industries", marketCap: "1845673", sector: "Oil & Gas", price: "2456.75", dataQuality: "High", change1d: "+2.45", change5d: "+8.12", change10d: "-1.23", change15d: "+15.67", change20d: "+12.34", change30d: "+25.78" },
  { company: "Tata Consultancy Services", marketCap: "1234567", sector: "IT Services", price: "3345.20", dataQuality: "High", change1d: "+1.80", change5d: "+5.45", change10d: "+12.67", change15d: "+18.90", change20d: "+22.11", change30d: "+28.45" },
  { company: "HDFC Bank", marketCap: "987654", sector: "Banking", price: "1567.85", dataQuality: "Medium", change1d: "-0.75", change5d: "+3.22", change10d: "+7.89", change15d: "+11.45", change20d: "+16.78", change30d: "+21.23" },
  { company: "Infosys", marketCap: "876543", sector: "IT Services", price: "1789.30", dataQuality: "High", change1d: "+3.12", change5d: "+9.87", change10d: "+14.56", change15d: "+19.23", change20d: "+24.67", change30d: "+31.45" },
  { company: "ICICI Bank", marketCap: "765432", sector: "Banking", price: "1123.45", dataQuality: "High", change1d: "+1.45", change5d: "+6.78", change10d: "+11.23", change15d: "+16.89", change20d: "+21.45", change30d: "+27.67" },
  { company: "Bharti Airtel", marketCap: "654321", sector: "Telecom", price: "894.60", dataQuality: "Medium", change1d: "-2.30", change5d: "+4.56", change10d: "+9.12", change15d: "+13.78", change20d: "+18.34", change30d: "+23.89" },
  { company: "ITC", marketCap: "543210", sector: "FMCG", price: "456.78", dataQuality: "High", change1d: "+0.95", change5d: "+3.45", change10d: "+7.23", change15d: "+12.67", change20d: "+17.89", change30d: "+22.34" },
  { company: "State Bank of India", marketCap: "432109", sector: "Banking", price: "723.45", dataQuality: "Medium", change1d: "+2.67", change5d: "+8.90", change10d: "+13.45", change15d: "+18.23", change20d: "+23.78", change30d: "+29.12" },
  { company: "Larsen & Toubro", marketCap: "321098", sector: "Construction", price: "3456.78", dataQuality: "High", change1d: "+1.23", change5d: "+5.67", change10d: "+10.34", change15d: "+15.89", change20d: "+20.45", change30d: "+26.78" },
  { company: "Asian Paints", marketCap: "298765", sector: "Chemicals", price: "2987.65", dataQuality: "High", change1d: "-1.45", change5d: "+2.78", change10d: "+6.45", change15d: "+11.23", change20d: "+15.67", change30d: "+20.89" },
];

const mockTopGainers = [
  { company: "Adani Enterprises", price: "2345.67", change: "+12.45%", sector: "Conglomerate" },
  { company: "Zomato", price: "189.45", change: "+8.90%", sector: "Food Delivery" },
  { company: "Paytm", price: "567.89", change: "+7.34%", sector: "Fintech" },
  { company: "Nykaa", price: "234.56", change: "+6.78%", sector: "E-commerce" },
  { company: "PolicyBazaar", price: "456.78", change: "+5.67%", sector: "Insurance" },
];

const mockTopLosers = [
  { company: "Vedanta", price: "234.56", change: "-8.90%", sector: "Mining" },
  { company: "Tata Steel", price: "123.45", change: "-7.34%", sector: "Steel" },
  { company: "JSW Steel", price: "678.90", change: "-6.78%", sector: "Steel" },
  { company: "Coal India", price: "345.67", change: "-5.67%", sector: "Mining" },
  { company: "ONGC", price: "178.90", change: "-4.89%", sector: "Oil & Gas" },
];

const mockNews = [
  "OLA Q1 results announced - Revenue up 23% YoY",
  "Govt okays 3000 crores defense budget - Major boost for defense stocks",
  "RBI maintains repo rate at 6.5% - Banking sector impact analysis",
  "Tech stocks rally as IT exports data shows strong growth",
  "Monsoon forecast positive - Agriculture sector to benefit"
];

// Components
export const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">StockWise</h1>
              <p className="text-blue-200 text-sm">Smart Investment Insights</p>
            </div>
          </div>
          <nav className="flex space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'home' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-blue-200 hover:text-white hover:bg-blue-700'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('terminal')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'terminal' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-blue-200 hover:text-white hover:bg-blue-700'
              }`}
            >
              Terminal
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg transform hover:scale-105">
              Subscribe Now
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
      {/* Background Image Overlay */}
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
                Not Investing Because You Don't Know Where to Start?
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
            <span className="text-4xl mr-4">🤯</span>
            Not Investing Because You Don't Know Where to Start?
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
    <div className="bg-blue-900 text-white py-3 overflow-hidden">
      <div className="flex items-center space-x-8">
        <span className="font-semibold text-yellow-400 px-4">BREAKING:</span>
        <div className="flex-1 relative h-6">
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-in-out flex items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {mockNews.map((news, index) => (
              <div key={index} className="w-full flex-shrink-0 cursor-pointer hover:text-yellow-200">
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
            <span className="text-4xl mr-4">🙌</span>
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
            <span className="text-4xl mr-4">⚙️</span>
            How It Works
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
              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Free Tier: 10 stocks max</span>
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
                      <span className="text-sm font-semibold text-green-600">{stock.change}</span>
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
                      <span className="text-sm font-semibold text-red-600">{stock.change}</span>
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
              <div className="inline-flex items-center bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                <span className="text-yellow-800">
                  🔒 Want to see more stocks and advanced filters? Subscribe to unlock full access!
                </span>
              </div>
              <div className="space-x-4">
                <button 
                  onClick={() => setCurrentPage('terminal')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Full Terminal
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Subscribe Now
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
          Ready to Start Your Investment Journey?
        </h2>
        <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed">
          Join thousands of smart investors who trust our data-driven approach to market analysis.
          Start free, upgrade when you're ready.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Free Tier</h3>
            <p className="text-blue-200">10 stocks, basic filters, daily updates</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Pro Tier</h3>
            <p className="text-blue-200">Unlimited stocks, advanced filters, real-time data</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-blue-400/20">
            <h3 className="text-xl font-bold mb-2">Expert Insights</h3>
            <p className="text-blue-200">Detailed analysis, sector reports, alerts</p>
          </div>
        </div>
        
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl transform hover:scale-105">
          Get Started Free
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">₹</span>
              </div>
              <span className="text-xl font-bold">StockWise</span>
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
          <p>&copy; 2025 StockWise. All rights reserved. Investment insights for informed decisions.</p>
        </div>
      </div>
    </footer>
  );
};