// app/provider/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Consultation {
  id: string;
  patient_name: string;
  patient_email: string;
  chief_complaint: string;
  created_at: string;
  status: string;
  recommended_labs?: any;
  lab_results_ready?: boolean;
  lab_results_count?: number;
}

export default function ProviderDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations');
      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }
      const data = await response.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setConsultations(data);
      } else {
        console.error('Expected array but got:', data);
        setConsultations([]);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
      setConsultations([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Safe filtering with array check
  const filteredConsultations = Array.isArray(consultations) 
    ? consultations.filter(consultation => {
        if (filter === 'all') return true;
        return consultation.status === filter;
      })
    : [];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading consultations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage patient consultations and lab results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Consultations</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{consultations?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {consultations?.filter(c => c.status === 'pending').length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {consultations?.filter(c => c.status === 'approved').length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">With Lab Results</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {consultations?.filter(c => c.lab_results_ready).length || 0}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setFilter('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All ({consultations?.length || 0})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending ({consultations?.filter(c => c.status === 'pending').length || 0})
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === 'approved'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved ({consultations?.filter(c => c.status === 'approved').length || 0})
              </button>
            </nav>
          </div>
        </div>

        {/* Consultations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredConsultations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No consultations found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chief Complaint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lab Results
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {consultation.patient_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {consultation.patient_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {consultation.chief_complaint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(consultation.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(consultation.status)}`}>
                        {consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {consultation.lab_results_ready ? (
                        <div className="flex items-center">
                          <span className="text-green-600">
                            ✓ {consultation.lab_results_count || 0} files
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No results</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {consultation.status === 'pending' ? (
                        <button
                          onClick={() => router.push(`/provider/approve/${consultation.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Review & Approve
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => router.push(`/consultation/recommendation/${consultation.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                          <span className="text-gray-300">|</span>
                        </>
                      )}
                      <button
                        onClick={() => router.push(`/provider/lab-results/${consultation.id}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        {consultation.lab_results_ready ? 'Manage' : 'Upload'} Lab Results
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/provider/reports')}
              className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 text-2xl mb-2">📊</div>
              <div className="font-medium">Generate Reports</div>
              <div className="text-sm text-gray-600">View consultation analytics</div>
            </button>
            <button
              onClick={() => router.push('/provider/lab-panels')}
              className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 text-2xl mb-2">🧪</div>
              <div className="font-medium">Manage Lab Panels</div>
              <div className="text-sm text-gray-600">Configure available tests</div>
            </button>
            <button
              onClick={() => router.push('/provider/settings')}
              className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 text-2xl mb-2">⚙️</div>
              <div className="font-medium">Settings</div>
              <div className="text-sm text-gray-600">Configure provider preferences</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
