import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'dashboard', 'transaction', 'settings'
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    currency: 'ZAR (Rand)',
    initials: 'JD'
  });

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', category: 'Salary', amount: 2500, date: 'Jan 15', icon: 'S', color: 'bg-green-500', description: 'Monthly Salary' },
    { id: 2, type: 'expense', category: 'Rent', amount: 800, date: 'Jan 14', icon: 'R', color: 'bg-purple-500', description: 'Rent Payment' },
    { id: 3, type: 'expense', category: 'Groceries', amount: 67.45, date: 'Jan 13', icon: 'F', color: 'bg-orange-500', description: 'Grocery Shopping' },
    { id: 4, type: 'expense', category: 'Petrol', amount: 450.20, date: 'Jan 12', icon: 'T', color: 'bg-blue-500', description: 'Petrol' }
  ]);

  const [settings, setSettings] = useState({
    defaultCategory: 'Food',
    budgetAlert: 5000,
    currency: 'ZAR (South African Rand)'
  });

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      icon: newTransaction.category.charAt(0).toUpperCase(),
      color: newTransaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
    };
    setTransactions(prev => [transaction, ...prev]);
    setCurrentScreen('dashboard');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const updateSettings = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            transactions={transactions}
            onLogout={handleLogout}
            onNavigate={navigateToScreen}
          />
        );
      case 'transaction':
        return (
          <TransactionForm
            onSave={addTransaction}
            onBack={() => setCurrentScreen('dashboard')}
            defaultCategory={settings.defaultCategory}
          />
        );
      case 'settings':
        return (
          <Settings
            user={user}
            settings={settings}
            onUpdateUser={updateUser}
            onUpdateSettings={updateSettings}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;