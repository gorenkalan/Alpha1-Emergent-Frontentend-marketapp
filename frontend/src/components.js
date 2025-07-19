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

const mockTopGainers = mockStockData
  .filter(stock => parseFloat(stock.change1d) > 0)
  .sort((a, b) => parseFloat(b.change1d) - parseFloat(a.change1d))
  .map(stock => ({
    company: stock.company,
    marketCap: stock.marketCap,
    sector: stock.sector,
    price: stock.price,
    change: stock.change1d,
    volume: stock.volume
  }));

const mockTopLosers = mockStockData
  .filter(stock => parseFloat(stock.change1d) < 0)
  .sort((a, b) => parseFloat(a.change1d) - parseFloat(b.change1d))
  .map(stock => ({
    company: stock.company,
    marketCap: stock.marketCap,
    sector: stock.sector,
    price: stock.price,
    change: stock.change1d,
    volume: stock.volume
  }));

const mockNews = [
  "OLA Q1 results announced - Revenue up 23% YoY",
  "Govt okays 3000 crores defense budget - Major boost for defense stocks",
  "RBI maintains repo rate at 6.5% - Banking sector impact analysis",
  "Tech stocks rally as IT exports data shows strong growth",
  "Monsoon forecast positive - Agriculture sector to benefit"
];

const sectors = ["All Sectors", "Banking", "IT Services", "Oil & Gas", "FMCG", "Telecom", "Construction", "Chemicals", "Mining", "Steel", "Conglomerate", "Food Delivery", "Fintech", "E-commerce", "Insurance"];

// Header Component
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
              onClick={() => setCurrentPage('search')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                currentPage === 'search' 
                ? 'bg-green-500 text-black' 
                : 'text-green-400 hover:text-green-300 hover:bg-gray-800'
              }`}
            >
              Search
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

// New Unique Hero Section Design
export const HeroSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { title: "13.7%", subtitle: "Indians have demat accounts", color: "from-red-500 to-pink-500" },
    { title: "60%", subtitle: "Americans invest in stocks", color: "from-blue-500 to-cyan-500" },
    { title: "10x", subtitle: "India's growth potential", color: "from-green-500 to-emerald-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full opacity-10">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className={`border-r border-b border-green-500 ${i % 7 === 0 ? 'bg-green-500/5' : ''}`}></div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                MARKET
              </h1>
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                DECODED
              </h1>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Stop gambling with your money. Start investing with{' '}
              <span className="text-green-400 font-bold">data-driven insights</span> that actually matter.
            </p>
          </div>

          {/* Animated Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-700 ${
                  activeCard === index 
                    ? 'border-green-500 bg-gray-900/50 scale-105' 
                    : 'border-gray-700 bg-gray-900/20 hover:border-green-500/50'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-${activeCard === index ? '20' : '5'} rounded-2xl`}></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-6xl font-black text-white mb-2">
                    {card.title}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <div className="text-lg text-gray-400 mb-6">
              India's next decade will create more millionaires than the last century.
            </div>
            <button className="group relative px-12 py-4 bg-green-500 text-black font-bold text-xl rounded-xl overflow-hidden transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">START ANALYZING NOW</span>
            </button>
          </div>
        </div>

        {/* Bottom Terminal Preview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-green-500 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-green-500">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 text-sm font-mono">StockTracker Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-green-400">
                <span className="text-green-500">trader@stocktracker:~$</span> analyze --market --live
              </div>
              <div className="text-green-300 mt-2">
                Initializing market analysis...
              </div>
              <div className="text-blue-400 mt-1">
                ✓ Loading 500+ stocks from NSE/BSE
              </div>
              <div className="text-yellow-400 mt-1">
                ✓ Processing real-time data streams
              </div>
              <div className="text-green-400 mt-1">
                ✓ Ready for analysis
              </div>
            </div>
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

export const FeatureSection = () => {
  const features = [
    {
      title: "No Predictions. Just Facts.",
      description: "We don't tell you what will happen. We show you what already happened and let you decide.",
      icon: "📊"
    },
    {
      title: "93% Lose in F&O",
      description: "We won't encourage trading or futures. We focus on long-term wealth building through smart analysis.",
      icon: "⚠️"
    },
    {
      title: "India is Early",
      description: "While others chase developed markets, we help you capitalize on India's growth story.",
      icon: "🇮🇳"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why We're Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Most platforms sell you dreams. We sell you reality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTASection = () => {
  return (
    <section className="py-20 bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Ready to Stop Guessing?
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Join the smart money. Start with data, not hope.
        </p>
        <button className="bg-green-500 text-black px-12 py-4 rounded-xl font-bold text-xl hover:bg-green-400 transition-all duration-300 shadow-2xl transform hover:scale-105">
          Access Terminal Now
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

// Market Movers Table Component with Click to Show
export const MarketMoversTable = ({ data, title, type, setSelectedCompany, setCurrentPage, isVisible, onToggle }) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('change');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sectorFilter, setSectorFilter] = useState('All Sectors');
  const [minMarketCap, setMinMarketCap] = useState('');
  const [maxMarketCap, setMaxMarketCap] = useState('');
  
  if (!isVisible) {
    return (
      <div className="bg-gray-900 border border-green-500 rounded">
        <button 
          onClick={onToggle}
          className="w-full bg-gray-800 px-4 py-3 border-b border-green-500 flex justify-between items-center hover:bg-gray-700 transition-colors"
        >
          <h3 className="text-green-500 font-bold">{title}</h3>
          <span className="text-green-400 text-sm">Click to view →</span>
        </button>
      </div>
    );
  }
  
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
    setCurrentPage('search');
  };
  
  return (
    <div className="bg-gray-900 text-green-400 rounded border border-green-500 font-mono">
      <div className="bg-gray-800 px-4 py-3 border-b border-green-500 flex justify-between items-center">
        <h3 className="text-green-500 font-bold">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-green-300">{filteredData.length} stocks</span>
          <button 
            onClick={onToggle}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Hide ×
          </button>
        </div>
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