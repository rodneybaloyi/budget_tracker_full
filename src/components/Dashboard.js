import React, { useState } from 'react';
import { Plus, Minus, DollarSign, TrendingUp, LogOut, Settings, Edit, BarChart3 } from 'lucide-react';

const Dashboard = ({ user, transactions, onLogout, onNavigate }) => {
  const [viewMode, setViewMode] = useState('mobile');

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;
  const transactionCount = transactions.length;

  const MobileView = () => (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('settings')}
              className="text-white/80 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogout}
              className="text-white/80 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{user.initials}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-green-500 text-white p-6 rounded-lg mb-4">
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2">Current Balance</p>
          <p className="text-3xl font-bold">R{currentBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => onNavigate('transaction')}
          className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Income
        </button>
        <button 
          onClick={() => onNavigate('transaction')}
          className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-red-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600">All</button>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 3).map(transaction => (
            <div key={transaction.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{transaction.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}R{transaction.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Budget Tracker</h1>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg">{user.name}</span>
              <button 
                onClick={() => onNavigate('settings')}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
              <button 
                onClick={onLogout}
                className="text-white/80 hover:text-white transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="font-bold">{user.initials}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Transactions List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">All Transactions</h2>
                <span className="text-sm text-gray-500">Monthly</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className={`w-8 h-8 ${transaction.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">{transaction.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{transaction.category}</p>
                      <p className="text-xs text-gray-500">{transaction.date}, 2025</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className={`font-semibold text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}R{transaction.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </p>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
                        <Edit className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Transaction Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Add Transaction</h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">TransactionForm</span>
              </div>
              
              <button 
                onClick={() => onNavigate('transaction')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Open Transaction Form
              </button>
            </div>

            {/* Balance Display */}
            <div className="bg-green-500 text-white p-8 rounded-lg shadow-sm">
              <p className="text-lg opacity-90 mb-2">Current Balance</p>
              <p className="text-4xl font-bold">R{currentBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <p className="text-2xl font-bold text-green-600">R{totalIncome.toLocaleString('en-ZA')}</p>
                <p className="text-gray-600 text-sm">Total Income</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <p className="text-2xl font-bold text-red-600">R{totalExpenses.toLocaleString('en-ZA')}</p>
                <p className="text-gray-600 text-sm">Total Expenses</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <p className="text-2xl font-bold text-gray-800">{transactionCount}</p>
                <p className="text-gray-600 text-sm">Transactions</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Expenses by Category</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Chart</span>
              </div>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Pie Chart</p>
                  <p className="text-sm text-gray-400">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* View Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-1">
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'mobile' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'desktop' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Desktop
          </button>
        </div>
      </div>

      {viewMode === 'mobile' ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default Dashboard;