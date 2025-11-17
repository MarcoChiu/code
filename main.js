// 定義全局 BASE_URL - 必須在導入其他模組之前設定
window.__BASE_URL__ = '/';

// 強制重新載入頁面（清除快取）
window.forceReload = function() {
    // 使用 location.reload(true) 強制從伺服器重新載入，不使用快取
    window.location.reload(true);
};

// 等待 DOM 載入完成後再導入其他模組
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModules);
} else {
    loadModules();
}

async function loadModules() {
    await import('./js/Utilities.js');
    await import('./js/loading.js');
    await import('./js/index.js');
}
