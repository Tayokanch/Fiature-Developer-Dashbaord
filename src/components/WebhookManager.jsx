import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import { useTheme } from '../hooks/useTheme';
import { getThemeColors } from '../utils/themeUtils';
import { addWebhook, deleteWebhook, fetchWebhooks } from '../services/webhookService';

const WebhookManager = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const [webhooks, setWebhooks] = useState([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    try {
      setLoading(true);
      const response = await fetchWebhooks();
      setWebhooks(response.webhooks || []);
    } catch (err) {
      setError('Failed to load webhooks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebhook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newWebhookUrl) {
      setError('Webhook URL is required');
      return;
    }

    if (webhooks.length >= 3) {
      setError('Maximum 3 webhooks allowed');
      return;
    }

    try {
      await addWebhook(newWebhookUrl);
      setWebhooks([...webhooks, newWebhookUrl]);
      setNewWebhookUrl('');
      setSuccess('Webhook added successfully');
    } catch (err) {
      setError('Failed to add webhook');
    }
  };

  const handleDeleteWebhook = async (url) => {
    try {
      await deleteWebhook(url);
      setWebhooks(webhooks.filter(webhook => webhook !== url));
      setSuccess('Webhook deleted successfully');
    } catch (err) {
      setError('Failed to delete webhook');
    }
  };

  return (
    <div className="space-y-4">
      {/* Webhook Management Content */}
      <div>
        {error && (
          <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            {success}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4" style={{ color: colors.secondaryTextColor }}>
            Loading webhooks...
          </div>
        ) : (
          <>
            {/* Webhook List */}
            <div className="space-y-2 mb-4">
              {webhooks.map((webhook, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#1f2937' : '#f9fafb';
                  }}
                >
                  <span 
                    className="text-sm font-mono break-all flex-1 min-w-0"
                    style={{ color: colors.textColor }}
                    title={webhook}
                  >
                    {webhook}
                  </span>
                  <button
                    onClick={() => handleDeleteWebhook(webhook)}
                    className="flex-shrink-0 p-2 h-8 w-8 rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 cursor-pointer"
                    title="Delete webhook"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Webhook Form */}
            {webhooks.length < 3 && (
              <form onSubmit={handleAddWebhook} className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter webhook URL"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="primary" className="w-full sm:w-auto h-[42px] flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Webhook
                </Button>
              </form>
            )}

            {webhooks.length === 0 && (
              <div 
                className="text-center py-6 lg:py-8 text-xs lg:text-sm"
                style={{ color: colors.secondaryTextColor }}
              >
                No webhooks configured. Add your first webhook above.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WebhookManager; 