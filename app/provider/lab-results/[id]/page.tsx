'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface LabResult {
  id: string;
  test_name: string;
  result_value: string;
  unit: string;
  reference_range: string;
  status: string;
  file_url?: string;
  notes?: string;
  created_at: string;
}

interface Consultation {
  id: string;
  patient_name: string;
  patient_email: string;
  chief_complaint: string;
  created_at: string;
  status: string;
}

export default function LabResultsPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    test_name: '',
    result_value: '',
    unit: '',
    reference_range: '',
    status: 'normal',
    notes: ''
  });

  useEffect(() => {
    fetchConsultationAndResults();
  }, [consultationId]);

  const fetchConsultationAndResults = async () => {
    try {
      setLoading(true);
      const consultationRes = await fetch(`/api/consultations/${consultationId}`);
      if (!consultationRes.ok) throw new Error('Failed to fetch consultation');
      const consultationData = await consultationRes.json();
      setConsultation(consultationData);
      const resultsRes = await fetch(`/api/lab-results?consultation_id=${consultationId}`);
      if (!resultsRes.ok) throw new Error('Failed to fetch lab results');
      const resultsData = await resultsRes.json();
      setLabResults(resultsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('consultation_id', consultationId);
      const response = await fetch('/api/lab-results/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      alert('Lab results uploaded successfully');
      setSelectedFile(null);
      fetchConsultationAndResults();
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultation_id: consultationId,
          ...formData
        }),
      });
      if (!response.ok) throw new Error('Failed to add result');
      alert('Lab result added successfully');
      setShowAddForm(false);
      setFormData({
        test_name: '',
        result_value: '',
        unit: '',
        reference_range: '',
        status: 'normal',
        notes: ''
      });
      fetchConsultationAndResults();
    } catch (err) {
      alert('Failed to add lab result');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      case 'critical':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Lab Results</h1>
            {consultation && (
              <div className="mt-2 text-gray-600">
                <p className="text-lg font-semibold">{consultation.patient_name}</p>
                <p>{consultation.patient_email}</p>
                <p className="mt-1">Chief Complaint: {consultation.chief_complaint}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : 'Add Result'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add Lab Result</h2>
            <form onSubmit={handleAddResult} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                  <input type="text" required value={formData.test_name} onChange={(e) => setFormData({ ...formData, test_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Result Value</label>
                  <input type="text" required value={formData.result_value} onChange={(e) => setFormData({ ...formData, result_value: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input type="text" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Range</label>
                  <input type="text" value={formData.reference_range} onChange={(e) => setFormData({ ...formData, reference_range: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="normal">Normal</option>
                    <option value="abnormal">Abnormal</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Result</button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Lab Results Document</h2>
          <div className="space-y-4">
            <input type="file" onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">{selectedFile.name}</span>
                <button onClick={handleUploadFile} disabled={uploading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">{uploading ? 'Uploading...' : 'Upload'}</button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Lab Results ({labResults.length})</h2>
          </div>
          {labResults.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No lab results available yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {labResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.test_name}</div>
                        {result.notes && <div className="text-sm text-gray-500 mt-1">{result.notes}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.result_value} {result.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.reference_range || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(result.status)}`}>{result.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {result.file_url && (
                          <a href={result.file_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View Document</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
