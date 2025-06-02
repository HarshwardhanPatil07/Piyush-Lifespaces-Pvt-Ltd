'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  activeInquiries: number;
  monthlyViews: number;
  completedSales: number;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  type: 'residential' | 'commercial' | 'villa' | 'apartment';
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data - will be replaced with real API calls
  const [stats] = useState<DashboardStats>({
    totalProperties: 24,
    activeInquiries: 12,
    monthlyViews: 1847,
    completedSales: 8
  });

  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury Villa in Banjara Hills',
      location: 'Banjara Hills, Hyderabad',
      price: '₹2.5 Cr',
      status: 'ongoing',
      type: 'villa',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Premium Apartments',
      location: 'Gachibowli, Hyderabad',
      price: '₹85 L - ₹1.2 Cr',
      status: 'completed',
      type: 'apartment',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Commercial Complex',
      location: 'HITEC City, Hyderabad',
      price: '₹5 Cr - ₹15 Cr',
      status: 'upcoming',
      type: 'commercial',
      createdAt: '2024-01-05'
    }
  ]);

  const [inquiries] = useState<Inquiry[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91 9876543210',
      property: 'Luxury Villa in Banjara Hills',
      message: 'Interested in scheduling a site visit',
      status: 'new',
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      property: 'Premium Apartments',
      message: 'Looking for 3BHK apartment with good amenities',
      status: 'contacted',
      createdAt: '2024-01-19'
    }
  ]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
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
              <p className="text-sm font-medium text-gray-600">Active Inquiries</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeInquiries}</p>
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
              <p className="text-sm font-medium text-gray-600">Monthly Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats.monthlyViews.toLocaleString()}</p>
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
              <p className="text-sm font-medium text-gray-600">Completed Sales</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedSales}</p>
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
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
          <div className="space-y-3">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm font-semibold text-blue-600">{property.price}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
            ))}
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
            {inquiries.slice(0, 3).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{inquiry.name}</p>
                  <p className="text-sm text-gray-600">{inquiry.property}</p>
                  <p className="text-sm text-gray-500">{inquiry.phone}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Properties Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Add Property</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{property.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600">{property.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 capitalize">{property.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customer Inquiries</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      <div className="text-sm text-gray-500">{inquiry.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{inquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{inquiry.property}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{inquiry.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{inquiry.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Website
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart },
                { id: 'properties', label: 'Properties', icon: Building },
                { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'properties' && renderProperties()}
            {activeTab === 'inquiries' && renderInquiries()}
            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Management</h2>
                <p className="text-gray-600">Content management features coming soon...</p>
              </div>
            )}
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
