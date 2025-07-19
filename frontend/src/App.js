import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  HeroSection,
  EngagementSection,
  ScrollingNews,
  ConvinceSection,
  HowItWorksSection,
  PreviewSection,
  CTASection,
  Footer
} from './components';

// Terminal Page Component
const TerminalPage = ({ setCurrentPage }) => {
  const [selectedStocks, setSelectedStocks] = useState(10);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
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

  const handleStockSelection = (value) => {
    if (value > 10) {
      setShowSubscriptionModal(true);
    } else {
      setSelectedStocks(value);
    }
  };

  const filteredStocks = mockStockData.filter(stock =>
    stock.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stockSuggestions = mockStockData
    .filter(stock => stock.company.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscription Required</h3>
            <p className="text-gray-600 mb-6">
              To view more than 10 stocks and access advanced features, please subscribe to our premium plan.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700">
                Subscribe Now
              </button>
              <button 
                onClick={() => setShowSubscriptionModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Continue with Free Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Market Analysis Dashboard</h1>
          <p className="text-gray-600">Analysis based on pre-loaded NSE/BSE stock data</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search stocks or sectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && stockSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
              {stockSuggestions.map((stock, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearchTerm(stock.company)}
                >
                  <div className="font-semibold">{stock.company}</div>
                  <div className="text-sm text-gray-600">{stock.sector}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Market Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Data Available:</span>
                <span className="font-medium">19 Jun - 19 Jul 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trading Days:</span>
                <span className="font-medium">22 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">19 Jul 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Companies:</span>
                <span className="font-medium">500+ stocks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sectors:</span>
                <span className="font-medium">15+ sectors</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Top Gainers</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {mockTopGainers.map((stock, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <div>
                    <div className="font-semibold text-sm">{stock.company}</div>
                    <div className="text-xs text-gray-600">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{stock.change}</div>
                    <div className="text-xs text-gray-600">₹{stock.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-red-800 mb-4">Top Losers</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {mockTopLosers.map((stock, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <div>
                    <div className="font-semibold text-sm">{stock.company}</div>
                    <div className="text-xs text-gray-600">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">{stock.change}</div>
                    <div className="text-xs text-gray-600">₹{stock.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Market Cap (Crores)</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All</option>
                <option>Large Cap (>20,000)</option>
                <option>Mid Cap (5,000-20,000)</option>
                <option>Small Cap (<5,000)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Sectors</option>
                <option>Banking</option>
                <option>IT Services</option>
                <option>Oil & Gas</option>
                <option>FMCG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Market Cap</option>
                <option>Price</option>
                <option>1D Change</option>
                <option>30D Change</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Descending</option>
                <option>Ascending</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium">
                Refresh
              </button>
            </div>
          </div>
          
          {/* Price Change Periods */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Change Periods (Days)</label>
            <div className="flex space-x-4">
              {[1, 5, 10, 15, 20, 30].map(day => (
                <label key={day} className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">{day}D</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Selection */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Show stocks:</label>
              <select 
                value={selectedStocks}
                onChange={(e) => handleStockSelection(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              {selectedStocks > 10 && (
                <span className="text-yellow-600 text-sm">🔒 Premium feature</span>
              )}
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
                  <th className="border border-gray-300 px-4 py-3 text-left">Data Quality</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">1D Change %</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">5D Change %</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">10D Change %</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">15D Change %</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">20D Change %</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">30D Change %</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.slice(0, selectedStocks).map((stock, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline">
                      {stock.company}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">₹{stock.marketCap}</td>
                    <td className="border border-gray-300 px-4 py-3">{stock.sector}</td>
                    <td className="border border-gray-300 px-4 py-3">₹{stock.price}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stock.dataQuality === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {stock.dataQuality}
                      </span>
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change1d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change1d}%
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change5d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change5d}%
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change10d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change10d}%
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change15d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change15d}%
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change20d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change20d}%
                    </td>
                    <td className={`border border-gray-300 px-4 py-3 ${stock.change30d.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change30d}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedStocks <= 10 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                <span className="text-yellow-800">
                  🔒 Want to see more stocks and advanced filters? Subscribe to unlock full access!
                </span>
              </div>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Subscribe Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Company Detail Page Component
const CompanyDetailPage = ({ companyName, setCurrentPage }) => {
  // Mock company data
  const companyData = {
    name: companyName || "Reliance Industries",
    sector: "Oil & Gas",
    marketCap: "₹18,45,673 Cr",
    currentPrice: "₹2,456.75",
    dayChange: "+2.45%",
    weekChange: "+8.12%",
    monthChange: "+25.78%",
    pe: "12.45",
    pb: "1.8",
    roe: "15.2%",
    debt: "₹3,45,678 Cr",
    revenue: "₹8,92,345 Cr",
    profit: "₹65,432 Cr"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => setCurrentPage('terminal')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Analysis
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{companyData.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{companyData.sector}</p>
              <div className="text-3xl font-bold text-gray-900 mb-2">{companyData.currentPrice}</div>
              <div className="text-green-600 font-semibold text-lg mb-8">{companyData.dayChange} (1D)</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Market Cap</div>
                  <div className="text-xl font-semibold text-blue-900">{companyData.marketCap}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">P/E Ratio</div>
                  <div className="text-xl font-semibold text-green-900">{companyData.pe}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">P/B Ratio</div>
                  <div className="text-xl font-semibold text-purple-900">{companyData.pb}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">ROE</div>
                  <div className="text-xl font-semibold text-orange-900">{companyData.roe}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">1 Week Change</span>
                  <span className="text-green-600 font-semibold">{companyData.weekChange}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">1 Month Change</span>
                  <span className="text-green-600 font-semibold">{companyData.monthChange}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Revenue (TTM)</span>
                  <span className="text-gray-900 font-semibold">{companyData.revenue}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Net Profit (TTM)</span>
                  <span className="text-gray-900 font-semibold">{companyData.profit}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Total Debt</span>
                  <span className="text-gray-900 font-semibold">{companyData.debt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  return (
    <div>
      <HeroSection />
      <ScrollingNews />
      <EngagementSection />
      <ConvinceSection />
      <HowItWorksSection />
      <PreviewSection setCurrentPage={setCurrentPage} />
      <CTASection />
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'terminal':
        return <TerminalPage setCurrentPage={setCurrentPage} />;
      case 'company':
        return <CompanyDetailPage companyName={selectedCompany} setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Routes>
          <Route path="/" element={renderPage()} />
          <Route path="/company/:name" element={<CompanyDetailPage setCurrentPage={setCurrentPage} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;