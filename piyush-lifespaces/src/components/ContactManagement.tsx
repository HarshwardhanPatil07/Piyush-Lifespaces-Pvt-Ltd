'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Eye, 
  Calendar,
  Search,
  Filter,
  User,
  Building2,
  ExternalLink,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react'

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  propertyInterest?: string
  source: string
  status: 'new' | 'contacted' | 'resolved'
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setContacts(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (contactId: string) => {
    try {
      const response = await fetch(`/api/contact?id=${contactId}&action=markRead`, {
        method: 'PUT'
      })
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, isRead: true }
            : contact
        ))
      }
    } catch (error) {
      console.error('Error marking contact as read:', error)
    }
  }

  const updateStatus = async (contactId: string, newStatus: Contact['status']) => {
    try {
      const response = await fetch(`/api/contact?id=${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus }
            : contact
        ))
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
    }
  }

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact)
    setShowModal(true)
    if (!contact.isRead) {
      markAsRead(contact._id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4" />
      case 'contacted':
        return <Clock className="h-4 w-4" />
      case 'resolved':
        return <Check className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const unreadCount = contacts.filter(contact => !contact.isRead).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Management</h2>
          <p className="text-gray-600">Manage contact form submissions and customer inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {contacts.length} total
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">No contact submissions match your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !contact.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => openContactModal(contact)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-medium ${!contact.isRead ? 'font-bold text-blue-900' : 'text-gray-900'}`}>
                        {contact.name}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span>{contact.status}</span>
                      </span>
                      {!contact.isRead && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium mb-1">{contact.subject}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                      {contact.propertyInterest && (
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{contact.propertyInterest}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 truncate">{contact.message}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openContactModal(contact)
                      }}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedContact.name}</h3>
                  <p className="text-gray-600">{selectedContact.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedContact.status)}`}>
                    {getStatusIcon(selectedContact.status)}
                    <span>{selectedContact.status}</span>
                  </span>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedContact.email}</span>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedContact.phone}</span>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                {selectedContact.propertyInterest && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Interest</label>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{selectedContact.propertyInterest}</span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <span className="text-gray-900">{selectedContact.source}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Submitted:</span> {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {new Date(selectedContact.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Contact['status']
                      updateStatus(selectedContact._id, newStatus)
                      setSelectedContact({ ...selectedContact, status: newStatus })
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
