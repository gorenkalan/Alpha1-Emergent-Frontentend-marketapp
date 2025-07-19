import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  HeroSection,
  ScrollingNews,
  FeatureSection,
  CTASection,
  Footer,
  MarketMoversTable
} from './components';

// Mock data
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

const sectors = ["All Sectors", "Banking", "IT Services", "Oil & Gas", "FMCG", "Telecom", "Construction", "Chemicals", "Mining", "Steel", "Conglomerate", "Food Delivery", "Fintech", "E-commerce", "Insurance"];

// Updates Page Component (no search, click to show tables)
const UpdatesPage = ({ setCurrentPage, setSelectedCompany }) => {
  const [showGainers, setShowGainers] = useState(false);
  const [showLosers, setShowLosers] = useState(false);
  const [startDate, setStartDate] = useState('2025-06-19');
  const [endDate, setEndDate] = useState('2025-07-19');

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-500 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-500">Stock Market Analysis Dashboard</h1>
            <p className="text-sm text-green-300">Analysis based on pre-loaded NSE/BSE stock data</p>
          </div>
          <div className="text-xs text-green-300">
            <div>Data Available: {startDate} to {endDate} (22 trading days)</div>
            <div>Last updated: 19 Jul 2025</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-green-500 rounded">
            <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
              <h3 className="text-green-500 font-bold">MARKET_OVERVIEW.json</h3>
            </div>
            <div className="p-4 text-xs">
              <div className="space-y-1">
                <div>"total_stocks": <span className="text-yellow-400">20</span></div>
                <div>"gainers": <span className="text-green-400">14</span></div>
                <div>"losers": <span className="text-red-400">6</span></div>
                <div>"neutral": <span className="text-blue-400">0</span></div>
                <div>"sectors": <span className="text-cyan-400">10</span></div>
              </div>
              <div className="mt-4">
                <button className="bg-green-500 text-black px-3 py-1 rounded text-xs font-bold hover:bg-green-400">
                  ACCESS_FULL_DATA()
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketMoversTable 
              data={mockTopGainers} 
              title="TOP_GAINERS.csv" 
              type="gainers"
              setSelectedCompany={setSelectedCompany}
              setCurrentPage={setCurrentPage}
              isVisible={showGainers}
              onToggle={() => setShowGainers(!showGainers)}
            />
            
            <MarketMoversTable 
              data={mockTopLosers} 
              title="TOP_LOSERS.csv" 
              type="losers"
              setSelectedCompany={setSelectedCompany}
              setCurrentPage={setCurrentPage}
              isVisible={showLosers}
              onToggle={() => setShowLosers(!showLosers)}
            />
          </div>
        </div>

        {/* Analysis Filters */}
        <div className="bg-gray-900 border border-green-500 rounded mb-8">
          <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
            <h3 className="text-green-500 font-bold">Analysis Filters</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-xs">
              <div>
                <label className="block text-green-300 mb-1">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-green-300 mb-1">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-green-300 mb-1">Market Cap (Crores)</label>
                <select className="w-full bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded">
                  <option>All</option>
                  <option>Large Cap (&gt;20,000)</option>
                  <option>Mid Cap (5,000-20,000)</option>
                  <option>Small Cap (&lt;5,000)</option>
                </select>
              </div>
              <div>
                <label className="block text-green-300 mb-1">Sector</label>
                <select className="w-full bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded">
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-green-300 mb-1">Sort By</label>
                <select className="w-full bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded">
                  <option>Market Cap</option>
                  <option>Price</option>
                  <option>1D Change</option>
                  <option>30D Change</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-green-500 text-black py-1 px-2 rounded hover:bg-green-400 font-bold text-xs">
                  REFRESH
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-green-300 mb-2 text-xs">Price Change Periods (Days)</label>
              <div className="flex space-x-4 text-xs">
                {[1, 5, 10, 15, 20, 30].map(day => (
                  <label key={day} className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2 accent-green-500" />
                    <span className="text-green-400">{day}D</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-gray-900 border border-green-500 rounded">
          <div className="bg-gray-800 px-4 py-2 border-b border-green-500 flex justify-between items-center">
            <h3 className="text-green-500 font-bold">Analysis Results</h3>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-green-300">Show stocks:</span>
              <select className="bg-gray-800 border border-green-500 text-green-400 px-2 py-1 rounded">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>All</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-800 text-green-500">
                <tr>
                  <th className="text-left p-2 border-r border-gray-700">Company</th>
                  <th className="text-left p-2 border-r border-gray-700">Market Cap (Cr)</th>
                  <th className="text-left p-2 border-r border-gray-700">Sector</th>
                  <th className="text-left p-2 border-r border-gray-700">Latest Price</th>
                  <th className="text-left p-2 border-r border-gray-700">Data Quality</th>
                  <th className="text-left p-2 border-r border-gray-700">1D Change %</th>
                  <th className="text-left p-2 border-r border-gray-700">5D Change %</th>
                  <th className="text-left p-2 border-r border-gray-700">10D Change %</th>
                  <th className="text-left p-2 border-r border-gray-700">15D Change %</th>
                  <th className="text-left p-2 border-r border-gray-700">20D Change %</th>
                  <th className="text-left p-2">30D Change %</th>
                </tr>
              </thead>
              <tbody>
                {mockStockData.slice(0, 20).map((stock, index) => (
                  <tr key={index} className="border-t border-gray-800 hover:bg-gray-800">
                    <td 
                      className="p-2 border-r border-gray-800 text-green-400 cursor-pointer hover:text-green-300 hover:underline"
                      onClick={() => {
                        setSelectedCompany(stock.company);
                        setCurrentPage('search');
                      }}
                    >
                      {stock.company}
                    </td>
                    <td className="p-2 border-r border-gray-800">₹{stock.marketCap}</td>
                    <td className="p-2 border-r border-gray-800 text-blue-400">{stock.sector}</td>
                    <td className="p-2 border-r border-gray-800">₹{stock.price}</td>
                    <td className="p-2 border-r border-gray-800">
                      <span className={`px-2 py-1 rounded text-xs ${
                        stock.dataQuality === 'High' 
                        ? 'bg-green-900 text-green-400 border border-green-500' 
                        : 'bg-yellow-900 text-yellow-400 border border-yellow-500'
                      }`}>
                        {stock.dataQuality}
                      </span>
                    </td>
                    <td className={`p-2 border-r border-gray-800 ${stock.change1d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change1d}%
                    </td>
                    <td className={`p-2 border-r border-gray-800 ${stock.change5d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change5d}%
                    </td>
                    <td className={`p-2 border-r border-gray-800 ${stock.change10d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change10d}%
                    </td>
                    <td className={`p-2 border-r border-gray-800 ${stock.change15d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change15d}%
                    </td>
                    <td className={`p-2 border-r border-gray-800 ${stock.change20d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change20d}%
                    </td>
                    <td className={`p-2 ${stock.change30d.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change30d}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terminal Commands */}
        <div className="mt-8 bg-gray-900 border border-green-500 rounded">
          <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
            <h3 className="text-green-500 font-bold">AVAILABLE_COMMANDS:</h3>
          </div>
          <div className="p-4 text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-cyan-400">/analyze --filters --sectors --cap</div>
              <div className="text-cyan-400">/portfolio --track --optimize</div>
            </div>
            <div>
              <div className="text-cyan-400">/watchlist --add --remove --monitor</div>
              <div className="text-cyan-400">/research --company --financials</div>
            </div>
            <div>
              <div className="text-cyan-400">/alerts --price --volume --news</div>
              <div className="text-cyan-400">/export --csv --json --pdf</div>
            </div>
          </div>
        </div>

        {/* Ready Status */}
        <div className="mt-6 text-xs">
          <span className="text-green-300">READY:</span> Advanced analysis tools available for registered users
          <button className="ml-4 bg-green-500 text-black px-3 py-1 rounded font-bold hover:bg-green-400">
            START_ANALYSIS()
          </button>
        </div>
      </div>
    </div>
  );
};

// Search Page Component
const SearchPage = ({ selectedCompany, setSelectedCompany }) => {
  const [searchTerm, setSearchTerm] = useState(selectedCompany || '');
  const [displayedCompany, setDisplayedCompany] = useState(selectedCompany || '');

  const filteredCompanies = mockStockData.filter(stock =>
    stock.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stockSuggestions = filteredCompanies.slice(0, 5);

  const handleSearch = (companyName) => {
    setDisplayedCompany(companyName);
    setSearchTerm(companyName);
  };

  const company = mockStockData.find(stock => stock.company === displayedCompany) || mockStockData[0];
  
  const companyData = {
    name: company.company,
    sector: company.sector,
    marketCap: `₹${company.marketCap} Cr`,
    currentPrice: `₹${company.price}`,
    dayChange: `${company.change1d}%`,
    weekChange: `${company.change5d}%`,
    monthChange: `${company.change30d}%`,
    volume: company.volume,
    pe: "12.45",
    pb: "1.8",
    roe: "15.2%",
    debt: "₹3,45,678 Cr",
    revenue: "₹8,92,345 Cr",
    profit: "₹65,432 Cr"
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="bg-gray-900 border-b border-green-500 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-500">Company Research Terminal</h1>
            <p className="text-sm text-green-300">Search and analyze individual companies</p>
          </div>
          <div className="text-xs text-green-300">
            <div>Database: NSE/BSE Listed Companies</div>
            <div>Last updated: 19 Jul 2025</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">research@stocktracker:~$</span>
            <input
              type="text"
              placeholder="search --company --name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black border border-green-500 text-green-400 px-3 py-2 rounded flex-1 focus:ring-1 focus:ring-green-500 focus:outline-none placeholder-green-600"
            />
            <button 
              onClick={() => handleSearch(searchTerm)}
              className="ml-2 bg-green-500 text-black px-4 py-2 rounded font-bold hover:bg-green-400"
            >
              SEARCH
            </button>
          </div>
          {searchTerm && stockSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-gray-900 border border-green-500 rounded mt-1 z-10 ml-28">
              {stockSuggestions.map((stock, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-b-0"
                  onClick={() => handleSearch(stock.company)}
                >
                  <div className="font-semibold text-green-400">{stock.company}</div>
                  <div className="text-xs text-blue-400">{stock.sector} • ₹{stock.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {displayedCompany && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-900 border border-green-500 rounded">
                <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
                  <h3 className="text-green-500 font-bold">COMPANY_INFO.json</h3>
                </div>
                <div className="p-4 text-sm space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-300">"name":</span>
                    <span className="text-white">"{companyData.name}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"sector":</span>
                    <span className="text-blue-400">"{companyData.sector}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"market_cap":</span>
                    <span className="text-yellow-400">"{companyData.marketCap}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"current_price":</span>
                    <span className="text-cyan-400">"{companyData.currentPrice}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"volume":</span>
                    <span className="text-purple-400">"{parseInt(companyData.volume).toLocaleString()}"</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 border border-green-500 rounded">
                <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
                  <h3 className="text-green-500 font-bold">PERFORMANCE_METRICS.json</h3>
                </div>
                <div className="p-4 text-sm space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-300">"1d_change":</span>
                    <span className={companyData.dayChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      "{companyData.dayChange}"
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"5d_change":</span>
                    <span className={companyData.weekChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      "{companyData.weekChange}"
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">"30d_change":</span>
                    <span className={companyData.monthChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      "{companyData.monthChange}"
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-green-500 rounded">
              <div className="bg-gray-800 px-4 py-2 border-b border-green-500">
                <h3 className="text-green-500 font-bold">FINANCIAL_RATIOS.json</h3>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="text-green-300 text-xs">P/E Ratio</div>
                  <div className="text-xl font-bold text-green-400">{companyData.pe}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="text-green-300 text-xs">P/B Ratio</div>
                  <div className="text-xl font-bold text-blue-400">{companyData.pb}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="text-green-300 text-xs">ROE</div>
                  <div className="text-xl font-bold text-cyan-400">{companyData.roe}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="text-green-300 text-xs">Revenue (TTM)</div>
                  <div className="text-xl font-bold text-yellow-400">{companyData.revenue}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs">
              <span className="text-green-300">ANALYSIS_STATUS:</span> 
              <span className="text-green-400"> Complete</span>
              <span className="text-green-300 ml-4">LAST_UPDATE:</span>
              <span className="text-green-400"> 2025-07-19 22:53:25</span>
            </div>
          </>
        )}
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
      <FeatureSection />
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
        return <UpdatesPage setCurrentPage={setCurrentPage} setSelectedCompany={setSelectedCompany} />;
      case 'search':
        return <SearchPage selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />;
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;