// components/LabResultsViewer.tsx
'use client';

import { useState, useEffect } from 'react';

interface LabResult {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  uploaded_at: string;
  status: string;
  provider_notes?: string;
  lab_name?: string;
  result_date?: string;
  is_critical?: boolean;
}

interface LabResultsViewerProps {
  consultationId: string;
  patientEmail?: string;
}

export default function LabResultsViewer({ 
  consultationId, 
  patientEmail = 'patient' 
}: LabResultsViewerProps) {
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewedResults, setViewedResults] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchLabResults();
    markAsViewed();
  }, [consultationId]);

  const fetchLabResults = async () => {
    try {
      const response = await fetch(`/api/lab-results/${consultationId}`);
      const result = await response.json();
      
      if (result.success) {
        setLabResults(result.data);
        
        // Check for critical results
        const criticalResults = result.data.filter((r: LabResult) => r.is_critical);
        if (criticalResults.length > 0) {
          // Show alert for critical results
          setTimeout(() => {
            alert('⚠️ Important: You have critical lab results that require immediate attention. Please contact your healthcare provider.');
          }, 1000);
        }
      } else {
        setError('Failed to load lab results');
      }
    } catch (error) {
      console.error('Error fetching lab results:', error);
      setError('Failed to load lab results');
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = async () => {
    try {
      await fetch(`/api/lab-results/${consultationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ viewedBy: patientEmail }),
      });
    } catch (error) {
      console.error('Error marking results as viewed:', error);
    }
  };

  const handleView = (result: LabResult) => {
    // Track which results have been viewed in this session
    setViewedResults(prev => new Set(prev).add(result.id));
    
    // Open the result in a new tab
    window.open(result.file_url, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('image')) {
      return '🖼️';
    }
    return '📎';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600">
          <h3 className="font-semibold mb-2">Error Loading Lab Results</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (labResults.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Lab Results</h3>
        <div className="text-gray-500 text-center py-8">
          <p>No lab results available yet.</p>
          <p className="text-sm mt-2">Your provider will upload your lab results when they're ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          Lab Results ({labResults.length})
        </h3>
        {labResults.some(r => r.is_critical) && (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full animate-pulse">
            ⚠️ Critical Results
          </span>
        )}
      </div>

      <div className="space-y-4">
        {labResults.map((result) => (
          <div
            key={result.id}
            className={`border rounded-lg p-4 transition-all ${
              result.is_critical ? 'border-red-300 bg-red-50' : 'border-gray-200'
            } ${viewedResults.has(result.id) ? 'opacity-75' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{getFileIcon(result.file_type)}</span>
                  <h4 className="font-medium text-gray-900">
                    {result.file_name}
                  </h4>
                  {result.is_critical && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded animate-pulse">
                      CRITICAL
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(result.status)}`}>
                    {result.status.toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  {result.lab_name && (
                    <p>
                      <span className="font-medium">Lab:</span> {result.lab_name}
                    </p>
                  )}
                  {result.result_date && (
                    <p>
                      <span className="font-medium">Test Date:</span>{' '}
                      {new Date(result.result_date).toLocaleDateString()}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Uploaded:</span>{' '}
                    {new Date(result.uploaded_at).toLocaleDateString()} at{' '}
                    {new Date(result.uploaded_at).toLocaleTimeString()}
                  </p>
                </div>

                {result.provider_notes && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Provider Notes:
                    </p>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">
                      {result.provider_notes}
                    </p>
                  </div>
                )}

                {result.is_critical && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg border border-red-300">
                    <p className="text-sm font-semibold text-red-900">
                      ⚠️ Important Notice
                    </p>
                    <p className="text-sm text-red-800 mt-1">
                      These results require immediate attention. Please contact your healthcare provider as soon as possible.
                    </p>
                  </div>
                )}
              </div>

              <div className="ml-4 space-y-2">
                <button
                  onClick={() => handleView(result)}
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Result
                </button>
                
                
                  href={result.file_url}
                  download={result.file_name}
                  className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-center"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> These lab results are for your personal records. 
          Always consult with your healthcare provider for proper interpretation and 
          any necessary follow-up actions.
        </p>
      </div>
    </div>
  );
}
