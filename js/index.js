var codeSnippets = [];

var currentCategory = "all";
var searchTerm = "";

function getAllCategories() {
    var allCats = [];
    for (var i = 0; i < codeSnippets.length; i++) {
        var cats = codeSnippets[i].categories;
        if (Array.isArray(cats)) {
            cats.forEach(function (cat) {
                if (!allCats.includes(cat)) {
                    allCats.push(cat);
                }
            });
        }
    }
    return allCats.sort();
}



function initMenuItems() {
    var categories = getAllCategories();
    var menuContainer = document.getElementById("menuItems");

    menuContainer.innerHTML = ""; // 清空選單容器，避免重複

    categories.forEach(function (cat) {
        var item = document.createElement("div");
        item.className = "menu-item";
        item.setAttribute("data-section", cat);
        item.textContent = cat;
        item.onclick = function () {
            var items = document.querySelectorAll(".menu-item");
            items.forEach(function (menuItem) {
                menuItem.classList.remove("active");
            });
            this.classList.add("active");
            currentCategory = this.getAttribute("data-section");

            renderCards();
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        };
        menuContainer.appendChild(item);
    });

    // 如果 categories 為空，顯示預設的 "page"
    if (categories.length === 0) {
        var defaultItem = document.createElement("div");
        defaultItem.className = "menu-item";
        defaultItem.setAttribute("data-section", "page");
        defaultItem.textContent = "page";
        defaultItem.onclick = function () {
            var items = document.querySelectorAll(".menu-item");
            items.forEach(function (menuItem) {
                menuItem.classList.remove("active");
            });
            this.classList.add("active");
            currentCategory = "page";

            renderCards();
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        };
        menuContainer.appendChild(defaultItem);
    }
}

function highlightCode(code, language) {
    // Escape HTML first but mark strings and comments
    var escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

    // Use placeholder strategy to avoid re-processing
    // Store HTML fragments in an array and replace with a safe ASCII token
    var placeholders = [];
    var counter = 0;

    function placeholder(content, type) {
        var idx = placeholders.length;
        placeholders.push({ html: '<span class="token-' + type + '">' + content + '</span>' });
        // Use a safe ASCII token that won't be affected by regexes or HTML escaping
        return "###__PH__" + idx + "__PH__###";
    }

    // Process strings and comments first, replace with placeholders
    if (language === "javascript") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;|`[^`]*?`/g, function (m) { return placeholder(m, "string"); })
            .replace(/\/\/[^\n]*/g, function (m) { return placeholder(m, "comment"); })
            .replace(/\/\*[\s\S]*?\*\//g, function (m) { return placeholder(m, "comment"); });
    } else if (language === "csharp") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;/g, function (m) { return placeholder(m, "string"); })
            .replace(/\/\/[^\n]*/g, function (m) { return placeholder(m, "comment"); });
    } else if (language === "sql") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;/g, function (m) { return placeholder(m, "string"); })
            .replace(/--[^\n]*/g, function (m) { return placeholder(m, "comment"); });
    } else if (language === "scss") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;/g, function (m) { return placeholder(m, "string"); })
            .replace(/\/\/[^\n]*/g, function (m) { return placeholder(m, "comment"); })
            .replace(/\/\*[\s\S]*?\*\//g, function (m) { return placeholder(m, "comment"); });
    } else if (language === "css") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;/g, function (m) { return placeholder(m, "string"); })
            .replace(/\/\*[\s\S]*?\*\//g, function (m) { return placeholder(m, "comment"); });
    } else if (language === "html") {
        escaped = escaped
            .replace(/&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;/g, function (m) { return placeholder(m, "string"); })
            .replace(/&lt;!--[\s\S]*?--&gt;/g, function (m) { return placeholder(m, "comment"); });
    }

    // Now process keywords, functions, etc.
    if (language === "javascript") {
        escaped = escaped
            .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|from|export|default|async|await|try|catch|finally|throw|new|this|super|extends|class|true|false|null|undefined)\b/g, '<span class="token-keyword">$1</span>')
            .replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="token-function">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
            // JSX tags: <TagName or </TagName
            .replace(/&lt;([a-zA-Z][a-zA-Z0-9-]*)/g, '&lt;<span class="token-keyword">$1</span>')
            .replace(/&lt;\/([a-zA-Z][a-zA-Z0-9-]*)/g, '&lt;/<span class="token-keyword">$1</span>');
    } else if (language === "csharp") {
        escaped = escaped
            .replace(/\b(public|private|protected|static|class|void|var|using|async|await|Task|new|return|if|else|for|while|from|where|select|throw|try|catch|finally)\b/g, '<span class="token-keyword">$1</span>')
            .replace(/\b(List|Dictionary|HttpClient|string|int|bool|double|float|decimal|long|short)\b/g, '<span class="token-type">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
    } else if (language === "sql") {
        escaped = escaped
            .replace(/\b(SELECT|FROM|WHERE|CREATE|PROCEDURE|AS|BEGIN|END|EXEC|INSERT|UPDATE|DELETE|JOIN|ON|LEFT|RIGHT|INNER|OUTER|GROUP|BY|ORDER|DESC|ASC|INT|VARCHAR|NVARCHAR|DATETIME)\b/gi, '<span class="token-keyword">$&</span>')
            .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
    } else if (language === "scss") {
        escaped = escaped
            .replace(/(@[\w-]+)/g, '<span class="token-keyword">$1</span>')
            .replace(/([\w-]+)(?=\s*:)/g, '<span class="token-property">$1</span>')
            .replace(/(#[0-9a-f]{3,6}|[\d.]+(?:px|em|%|rem|ch|ex|cm|mm|in|pt|pc|vh|vw))/gi, '<span class="token-number">$1</span>');
    } else if (language === "css") {
        escaped = escaped
            .replace(/([\w-]+)(?=\s*\{)/g, '<span class="token-selector">$1</span>')
            .replace(/([\w-]+)(?=\s*:)/g, '<span class="token-property">$1</span>')
            .replace(/(#[0-9a-f]{3,6}|[\d.]+(?:px|em|%|rem|ch|ex|cm|mm|in|pt|pc|vh|vw))/gi, '<span class="token-number">$1</span>');
    } else if (language === "html") {
        // For HTML, only highlight tag names without any additional processing
        escaped = escaped
            .replace(/&lt;([a-zA-Z][a-zA-Z0-9-]*)/g, '&lt;<span class="token-keyword">$1</span>')
            .replace(/&lt;\/([a-zA-Z][a-zA-Z0-9-]*)/g, '&lt;/<span class="token-keyword">$1</span>');
    }

    // Restore placeholders iteratively to handle nested tokens (e.g. strings inside comments)
    var maxPasses = Math.max(5, placeholders.length);
    var pass = 0;
    while (/###__PH__(\d+)__PH__###/.test(escaped) && pass < maxPasses) {
        escaped = escaped.replace(/###__PH__(\d+)__PH__###/g, function (match, idx) {
            var i = Number(idx);
            return (placeholders[i] && placeholders[i].html) ? placeholders[i].html : '';
        });
        pass++;
    }

    return escaped;
}

function createCategoryBadge(category) {
    var className = category.toLowerCase().replace(/\s/g, "").replace("#", "sharp").replace("ms", "");
    var badge = document.createElement("span");
    badge.className = "category-badge " + className;
    badge.textContent = category;
    return badge;
}

function renderCards() {
    var filtered = [];
    for (var i = 0; i < codeSnippets.length; i++) {
        var s = codeSnippets[i];
        var matchCategory = currentCategory === "all" || (Array.isArray(s.categories) && s.categories.indexOf(currentCategory) !== -1);

        // 搜索時需要檢查所有代碼片段的內容
        var matchSearch = !searchTerm ||
            s.title.toLowerCase().indexOf(searchTerm) !== -1 ||
            s.description.toLowerCase().indexOf(searchTerm) !== -1;

        if (!matchSearch && Array.isArray(s.code)) { // 確保 code 存在且為陣列
            // 檢查所有代碼片段的內容
            for (var k = 0; k < s.code.length; k++) {
                if (s.code[k].content.toLowerCase().indexOf(searchTerm) !== -1) {
                    matchSearch = true;
                    break;
                }
            }
        }

        if (matchCategory && matchSearch) {
            filtered.push(s);
        }
    }

    document.getElementById("count").textContent = filtered.length;

    var grid = document.getElementById("codeGrid");
    grid.innerHTML = "";

    for (var i = 0; i < filtered.length; i++) {
        var snippet = filtered[i];
        var card = document.createElement("div");
        card.className = "code-card";

        var header = document.createElement("div");
        header.className = "card-header";

        var titleDiv = document.createElement("div");
        titleDiv.className = "card-title";

        var h3 = document.createElement("h3");
        h3.textContent = snippet.title;

        var badgesDiv = document.createElement("div");
        badgesDiv.className = "category-badges";
        // 由 snippet.title 拆成陣列，取第一項作為 badge（若無 title 則回落到 categories）
        var titleParts = (snippet.title || '').split(/[-_\s]+/);
        var badgeKey = titleParts[0] && titleParts[0].length ? titleParts[0] : (snippet.categories && snippet.categories[0]) || 'page';
        badgesDiv.appendChild(createCategoryBadge(badgeKey));

        titleDiv.appendChild(h3);
        titleDiv.appendChild(badgesDiv);

        // 只顯示標題與分類 badge（移除 description / source 顯示）
        header.appendChild(titleDiv);

        var codeBlock = document.createElement("div");
        codeBlock.className = "code-block";

        var copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "複製全部";
        copyBtn.setAttribute("data-id", snippet.id);
        copyBtn.onclick = function () {
            var id = parseInt(this.getAttribute("data-id"));
            for (var k = 0; k < codeSnippets.length; k++) {
                if (codeSnippets[k].id === id) {
                    // 將所有代碼片段合併複製，用換行和語言標籤分隔
                    var allCode = codeSnippets[k].code.map(function (c) {
                        return '// ' + c.language + '\n' + c.content;
                    }).join('\n\n');
                    navigator.clipboard.writeText(allCode);
                    this.textContent = "已複製!";
                    this.classList.add("copied");
                    var btn = this;
                    setTimeout(function () {
                        btn.textContent = "複製全部";
                        btn.classList.remove("copied");
                    }, 2000);
                    break;
                }
            }
        };

        codeBlock.appendChild(copyBtn);

        // 為每個代碼片段建立 pre/code 元素
        if (Array.isArray(snippet.code)) { // 確保 code 存在且為陣列
            for (var m = 0; m < snippet.code.length; m++) {
                var codeItem = snippet.code[m];

                var languageLabel = document.createElement("div");
                languageLabel.style.cssText = "padding: 10px 20px; background: rgba(0, 0, 0, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #61AFEF; font-size: 12px; font-weight: 600;";
                languageLabel.textContent = codeItem.language.toUpperCase();
                codeBlock.appendChild(languageLabel);

                var pre = document.createElement("pre");
                var code = document.createElement("code");
                var highlightedHtml = highlightCode(codeItem.content, codeItem.language);
                code.innerHTML = highlightedHtml;
                pre.appendChild(code);
                codeBlock.appendChild(pre);
            }
        }

        var footer = document.createElement("div");
        footer.className = "card-footer";
        footer.textContent = Array.isArray(snippet.code) // 確保 code 存在且為陣列
            ? snippet.code.map(function (c) { return c.language; }).join(" + ")
            : "";

        card.appendChild(header);
        card.appendChild(codeBlock);
        card.appendChild(footer);

        grid.appendChild(card);
    }
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}

// 導出為全局函數供 HTML onclick 使用
window.toggleSidebar = toggleSidebar;

document.getElementById("searchInput").addEventListener("input", function (e) {
    searchTerm = e.target.value.toLowerCase();
    renderCards();
});

document.querySelectorAll(".menu-item")[0].addEventListener("click", function () {
    var items = document.querySelectorAll(".menu-item");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }
    this.classList.add("active");
    currentCategory = "all";

    renderCards();
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
});
//  --- 從 page 解析 HTML 並建立 snippet 的函式 ---
function parseHtmlToSnippet(html, filename) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');

    var title = doc.querySelector('title') ? doc.querySelector('title').textContent : filename;

    var body = doc.body || document.createElement('body');

    // 取出 body 的 HTML（移除 script）當作 html 片段
    var bodyClone = body.cloneNode(true);
    var scriptsToRemove = bodyClone.querySelectorAll('script');
    for (var i = 0; i < scriptsToRemove.length; i++) {
        scriptsToRemove[i].parentNode.removeChild(scriptsToRemove[i]);
    }
    var htmlContent = bodyClone.innerHTML.trimEnd();

    // 取出 body 裡的 script 內容當作 javascript 片段
    var scripts = body.querySelectorAll('script');
    var codeArray = [];
    if (htmlContent) {
        codeArray.push({ language: 'html', content: htmlContent });
    }
    for (var s = 0; s < scripts.length; s++) {
        var txt = scripts[s].textContent || '';
        txt = txt.trimEnd();
        if (txt) {
            codeArray.push({ language: 'javascript', content: txt });
        }
    }

    // 根據標題中提取類別（第一個單詞）
    var titleParts = title.split(/[\s\-_]+/);
    var category = titleParts[0] || 'Uncategorized';
    var categories = [category];

    var id = filename.replace(/\.html$/i, '').replace(/[^a-zA-Z0-9_\-]/g, '_');

    return {
        id: id,
        title: title,
        categories: categories,
        description: '從 page 資料夾的 ' + filename + ' 解析而來',
        source: { text: 'page', url: '../page/' + filename },
        code: codeArray
    };
}

// 初始化：同時從 data/*.json 與 page/*.html 載入並合併成 codeSnippets
const init = async () => {
    try {
        Loading.show();

        // 1) 定義要掃描的子目錄與檔案
        var pageDirs = {
            'react': ['react001.html', 'react002.html', 'react003.html', 'react004.html'],
            'javascript': [],
            'csharp': [],
            'sql':[]
        };

        var pagePromises = [];

        // 遍歷所有子目錄並創建 fetch promise
        Object.keys(pageDirs).forEach(function (dir) {
            var files = pageDirs[dir];
            files.forEach(function (f) {
                // 使用全局定義的 BASE_URL
                var path = window.__BASE_URL__ + 'page/' + dir + '/' + f;
                pagePromises.push(
                    fetch(path).then(function (res) {
                        if (!res.ok) throw new Error('fetch ' + dir + '/' + f + ' failed: ' + res.status);
                        return res.text();
                    }).then(function (html) {
                        return parseHtmlToSnippet(html, f);
                    }).catch(function (err) {
                        console.error('無法載入頁面檔案:', dir + '/' + f, err);
                        return null;
                    })
                );
            });
        });

        var pageResults = await Promise.all(pagePromises);
        var pageSnippets = pageResults.filter(function (r) { return r; });

        // 2) 初始化 snippets
        codeSnippets = pageSnippets;

        initMenuItems();
        renderCards();
    } catch (error) {
        console.error('初始化失敗', error);
    } finally {
        Loading.hide();
    }
};

init();