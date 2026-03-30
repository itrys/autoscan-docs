// ========================================
// Document Version Control Configuration
// ========================================
// Version: Update when releasing a new version (e.g., 1.1.0 → 1.2.0)
const DOC_VERSION = '1.1.0';

// Timestamp: Update within the same version for frequent updates (Format: YYYYMMDDHHmm)
// Example: 202603260852 means March 26, 2026, 08:52
// Modify this timestamp after each document update
const DOC_TIMESTAMP = '202603260852';

// Combined version parameter: version_timestamp (no need to modify)
const DOC_CACHE_KEY = DOC_VERSION + '_' + DOC_TIMESTAMP;
// Result example: 1.1.0_202603260852
// ========================================

// Rewrite XMLHttpRequest to add version parameter for MD files
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
  let modifiedUrl = url;
  if (typeof url === 'string' && url.endsWith('.md') && !url.includes('v=')) {
    const separator = url.includes('?') ? '&' : '?';
    modifiedUrl = url + separator + 'v=' + DOC_CACHE_KEY;
    console.log('[AutoScan Docs] XHR with version:', modifiedUrl);
  }
  // Use arguments to pass all parameters, avoid parameter loss
  arguments[1] = modifiedUrl;
  return originalOpen.apply(this, arguments);
};

// Rewrite fetch to add version parameter for MD files
if (window.fetch) {
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    let url = input;
    if (typeof input === 'string' && input.endsWith('.md') && !input.includes('v=')) {
      const separator = input.includes('?') ? '&' : '?';
      url = input + separator + 'v=' + DOC_CACHE_KEY;
      console.log('[AutoScan Docs] Fetch with version:', url);
    }
    return originalFetch.call(this, url, init);
  };
}
