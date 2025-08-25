import React from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from './Card';
import WebhookManager from './WebhookManager';
import { syntheticWebhookData } from '../features/webhooks/WebhookResponse';
import { FiActivity, FiBell } from 'react-icons/fi';

const WebhookSection = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'canceled':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'refunded':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Webhook Management Section */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 
            className="text-base lg:text-lg font-semibold"
            style={{ color: colors.textColor }}
          >
            Webhook Management
          </h3>
          <span 
            className="text-xs lg:text-sm px-2 py-1 rounded-full border"
            style={{ 
              color: colors.secondaryTextColor,
              backgroundColor: colors.inputBg,
              borderColor: colors.borderColor
            }}
          >
            Webhook Configuration
          </span>
        </div>
        
        <WebhookManager />
      </Card>
      
      {/* Webhook Data Examples Section */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h4 
            className="text-base font-semibold flex items-center gap-2"
            style={{ color: colors.textColor }}
          >
            Webhook Notifications
          </h4>
          <span 
            className="text-xs lg:text-sm px-2 py-1 rounded-full border"
            style={{ 
              color: colors.secondaryTextColor,
              backgroundColor: colors.inputBg,
              borderColor: colors.borderColor
            }}
          >
            <FiBell size={18} style={{ color: colors.iconColor }} />
          </span>
        </div>
        
        {/* Webhook Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.borderColor }}>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Transaction ID
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Type
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Symbol
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Amount
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Status
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Network Fee
                </th>
                <th 
                  className="text-left py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {syntheticWebhookData.map((webhook, index) => (
                <tr 
                  key={webhook.transactionId}
                  className="border-b transition-colors"
                  style={{ 
                    borderColor: colors.borderColor,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td 
                    className="py-3 px-4 font-medium"
                    style={{ color: colors.textColor }}
                  >
                    {webhook.transactionId}
                  </td>
                  <td 
                    className="py-3 px-4"
                    style={{ color: colors.textColor }}
                  >
                    {webhook.transactionType}
                  </td>
                  <td 
                    className="py-3 px-4 font-medium"
                    style={{ color: colors.textColor }}
                  >
                    {webhook.symbol}
                  </td>
                  <td 
                    className="py-3 px-4 font-medium"
                    style={{ color: colors.textColor }}
                  >
                    {webhook.amount} {webhook.symbol}
                  </td>
                  <td 
                    className="py-3 px-4"
                  >
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                  </td>
                  <td 
                    className="py-3 px-4"
                    style={{ color: colors.secondaryTextColor }}
                  >
                    {webhook.networkFee} {webhook.symbol}
                  </td>
                  <td 
                    className="py-3 px-4"
                    style={{ color: colors.secondaryTextColor }}
                  >
                    {new Date(webhook.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default WebhookSection;
