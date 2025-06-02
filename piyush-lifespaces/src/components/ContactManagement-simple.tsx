'use client'

import { useState, useEffect } from 'react'

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'contacted' | 'resolved'
  isRead: boolean
  createdAt: string
}

export default function ContactManagementSimple() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Management</h2>
        <p>Loading contacts...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Management</h2>
      
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <p className="text-gray-600">No contacts found.</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  <p className="text-sm font-medium mt-2">{contact.subject}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {contact.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">{contact.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
