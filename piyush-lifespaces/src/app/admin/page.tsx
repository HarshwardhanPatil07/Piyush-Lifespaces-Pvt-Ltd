'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart, 
  Settings,
  LogOut,
  Mail,
  Star
} from 'lucide-react';
import PropertyManagement from '@/components/PropertyManagement';
import InquiryManagement from '@/components/InquiryManagement';
import ContactManagement from '@/components/ContactManagement';
import ReviewManagement from '@/components/ReviewManagement';
import HomeContentManagement from '@/components/HomeContentManagement';

interface DashboardStats {
  totalProperties: number;
  activeInquiries: number;
  monthlyViews: number;
  completedSales: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeInquiries: 0,
    monthlyViews: 0,
    completedSales: 0
  });

  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    }
  }, [activeTab]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      window.location.href = '/admin/login';
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/dashboard/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent properties
      const propertiesResponse = await fetch('/api/properties?limit=3');
      if (propertiesResponse.ok) {
        const propertiesData = await propertiesResponse.json();
        setRecentProperties(propertiesData.properties || propertiesData);
      }

      // Fetch recent inquiries
      const inquiriesResponse = await fetch('/api/inquiries?limit=3');
      if (inquiriesResponse.ok) {
        const inquiriesData = await inquiriesResponse.json();
        setRecentInquiries(inquiriesData.inquiries || inquiriesData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': case 'new': return 'bg-blue-100 text-blue-800';
      case 'completed': case 'contacted': return 'bg-green-100 text-green-800';
      case 'upcoming': case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Properties</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalProperties || 0}</p>
            </div>
            <Building className="h-12 w-12 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Active Inquiries</p>
              <p className="text-3xl font-black text-gray-900">{stats.activeInquiries || 0}</p>
            </div>
            <MessageSquare className="h-12 w-12 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Monthly Views</p>
              <p className="text-3xl font-black text-gray-900">{(stats.monthlyViews || 0).toLocaleString()}</p>
            </div>
            <BarChart className="h-12 w-12 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Completed Sales</p>
              <p className="text-3xl font-black text-gray-900">{stats.completedSales || 0}</p>
            </div>
            <Users className="h-12 w-12 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Properties</h3>
          <div className="space-y-3">
            {recentProperties.length > 0 ? (
              recentProperties.slice(0, 3).map((property) => (
                <div key={property._id || property.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-bold text-gray-900">{property.title}</p>
                    <p className="text-sm font-medium text-gray-700">{property.location}</p>
                    <p className="text-sm font-bold text-blue-600">{property.price}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-medium">No properties found</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {recentInquiries.length > 0 ? (
              recentInquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry._id || inquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-sm text-gray-600">{inquiry.property || 'General Inquiry'}</p>
                    <p className="text-sm text-gray-500">{inquiry.phone}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No inquiries found</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Piyush Lifespaces Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, {user.name || user.email}
                </span>
              )}
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6">
            <nav className="space-y-2">              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart },
                { id: 'properties', label: 'Properties', icon: Building },
                { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
                { id: 'contacts', label: 'Contacts', icon: Mail },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'content', label: 'Content', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>          {/* Main Content */}          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'properties' && <PropertyManagement />}
            {activeTab === 'inquiries' && <InquiryManagement />}
            {activeTab === 'contacts' && <ContactManagement />}
            {activeTab === 'reviews' && <ReviewManagement />}            {activeTab === 'content' && <HomeContentManagement />}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
