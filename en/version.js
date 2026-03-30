// ========================================
// 文档版本控制配置
// ========================================
// 版本号：发布新版本时更新（如 1.1.0 → 1.2.0）
const DOC_VERSION = '1.1.0';

// 时间戳：同一版本内频繁更新时修改（格式：YYYYMMDDHHmm）
// 示例：202603260852 表示 2026年3月26日08:52
// 每次更新文档后，修改此时间戳即可
const DOC_TIMESTAMP = '202603260852';

// 组合版本参数：版本号_时间戳（无需修改）
const DOC_CACHE_KEY = DOC_VERSION + '_' + DOC_TIMESTAMP;
// 结果示例：1.1.0_202603260852
// ========================================

// 重写 XMLHttpRequest，为 MD 文件添加版本号参数
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
  let modifiedUrl = url;
  if (typeof url === 'string' && url.endsWith('.md') && !url.includes('v=')) {
    const separator = url.includes('?') ? '&' : '?';
    modifiedUrl = url + separator + 'v=' + DOC_CACHE_KEY;
    console.log('[AutoScan Docs] XHR with version:', modifiedUrl);
  }
  // 使用 arguments 传递所有参数，避免参数丢失
  arguments[1] = modifiedUrl;
  return originalOpen.apply(this, arguments);
};

// 重写 fetch，为 MD 文件添加版本号参数
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
