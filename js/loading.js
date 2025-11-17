//原做好d-none控制class顯示
//loading.classList.toggle('d-none');
//2025-10-29 AI 優化產出以下更方便
const Loading = (() => {
    let count = 0;
    let el = document.querySelector('.loading-mask');
    // 若頁面中沒有 loading-mask，則自動建立
    if (!el) {
        el = document.createElement('div');
        el.className = 'loading-mask d-none';
        el.innerHTML = `<div class="loading-circle-notch"></div>`;
        document.body.appendChild(el);
    }
    return {
        show() {
            count++;
            if (count === 1) el.classList.remove('d-none');
        },
        hide() {
            if (count > 0) {
                count--;
                if (count === 0) el.classList.add('d-none');
            }
        }
    };
})();