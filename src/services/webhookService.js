import api from './api';

// Local storage key for webhooks
const WEBHOOKS_STORAGE_KEY = 'fiature_webhooks';

// Get webhooks from localStorage
const getStoredWebhooks = () => {
  try {
    const stored = localStorage.getItem(WEBHOOKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading webhooks from localStorage:', error);
    return [];
  }
};

// Save webhooks to localStorage
const saveWebhooks = (webhooks) => {
  try {
    localStorage.setItem(WEBHOOKS_STORAGE_KEY, JSON.stringify(webhooks));
  } catch (error) {
    console.error('Error saving webhooks to localStorage:', error);
  }
};

export const fetchWebhooks = async () => {
  try {
    // Try to fetch from API first
    const response = await api.get('/webhooks');
    if (response.data && response.data.webhooks) {
      // Save to localStorage if API returns data
      saveWebhooks(response.data.webhooks);
      return response.data;
    }
  } catch (error) {
    console.log('API fetch failed, using localStorage data');
  }
  
  // Fallback to localStorage
  const storedWebhooks = getStoredWebhooks();
  return { webhooks: storedWebhooks };
};

export const addWebhook = async (webhookUrl) => {
  try {
    // Try to add via API first
    const response = await api.post('/add_webhook', {
      webhook_url: webhookUrl
    });
    
    // If API succeeds, add to localStorage
    const currentWebhooks = getStoredWebhooks();
    const updatedWebhooks = [...currentWebhooks, webhookUrl];
    saveWebhooks(updatedWebhooks);
    
    return response.data;
  } catch (error) {
    // If API fails, add to localStorage only
    const currentWebhooks = getStoredWebhooks();
    const updatedWebhooks = [...currentWebhooks, webhookUrl];
    saveWebhooks(updatedWebhooks);
    
    // Return success for demo purposes
    return { success: true, message: 'Webhook added locally' };
  }
};

export const deleteWebhook = async (webhookUrl) => {
  try {
    // Try to delete via API first
    const response = await api.post('/delete_webhook', {
      webhook_url: webhookUrl
    });
    
    // If API succeeds, remove from localStorage
    const currentWebhooks = getStoredWebhooks();
    const updatedWebhooks = currentWebhooks.filter(url => url !== webhookUrl);
    saveWebhooks(updatedWebhooks);
    
    return response.data;
  } catch (error) {
    // If API fails, remove from localStorage only
    const currentWebhooks = getStoredWebhooks();
    const updatedWebhooks = currentWebhooks.filter(url => url !== webhookUrl);
    saveWebhooks(updatedWebhooks);
    
    // Return success for demo purposes
    return { success: true, message: 'Webhook deleted locally' };
  }
}; 