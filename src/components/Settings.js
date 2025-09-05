import React, { useState } from 'react';
import { DollarSign, ArrowLeft, Download, Trash2 } from 'lucide-react';

const Settings = ({ user, settings, onUpdateUser, onUpdateSettings, onBack }) => {
  const [viewMode, setViewMode] = useState('mobile');
  
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    currency: user.currency
  });

  const [settingsData, setSettingsData] = useState({
    defaultCategory: settings.defaultCategory,
    budgetAlert: settings.budgetAlert,
    currency: settings.currency
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      ...profileData,
      initials: profileData.name.split(' ').map(n => n.charAt(0)).join('')
    });
    alert('Profile updated successfully!');
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    onUpdateSettings(settingsData);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    alert('Data export feature coming soon!');
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      alert('Clear all data feature coming soon!');
    }
  };

  const MobileView = () => (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6" />
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <button 
            onClick={onBack}
            className="text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">ProfileForm</span>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={profileData.currency}
              onChange={(e) => setProfileData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="ZAR (Rand)">ZAR (Rand)</option>
              <option value="USD (Dollar)">USD (Dollar)</option>
              <option value="EUR (Euro)">EUR (Euro)</option>
              <option value="GBP (Pound)">GBP (Pound)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Update
          </button>
        </form>

        {/* Settings Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">SettingsPanel</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Category</label>
              <select
                value={settingsData.defaultCategory}
                onChange={(e) => setSettingsData(prev => ({ ...prev, defaultCategory: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Alert</label>
              <input
                type="number"
                value={settingsData.budgetAlert}
                onChange={(e) => setSettingsData(prev => ({ ...prev, budgetAlert: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={handleSettingsUpdate}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="font-bold">{user.initials}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">ProfileForm</span>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Currency</label>
                <select
                  value={profileData.currency}
                  onChange={(e) => setProfileData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="ZAR (South African Rand)">ZAR (South African Rand)</option>
                  <option value="USD (US Dollar)">USD (US Dollar)</option>
                  <option value="EUR (Euro)">EUR (Euro)</option>
                  <option value="GBP (British Pound)">GBP (British Pound)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* App Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">App Settings</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">SettingsPanel</span>
              </div>

              <form onSubmit={handleSettingsUpdate} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4">Default Category</label>
                  <select
                    value={settingsData.defaultCategory}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, defaultCategory: e.target.value }))}
                    className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4">Budget Alert</label>
                  <input
                    type="number"
                    value={settingsData.budgetAlert}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, budgetAlert: parseInt(e.target.value) }))}
                    className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Save Settings
                </button>
              </form>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Data Management</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleExportData}
                  className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Export Data
                </button>
                
                <button
                  onClick={handleClearAllData}
                  className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear All
                </button>
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

export default Settings;