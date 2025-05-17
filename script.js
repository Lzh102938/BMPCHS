document.addEventListener('DOMContentLoaded', function() {
    // 确保DOM已完全加载
    if (document.readyState === 'complete') {
        initPage();
    } else {
        window.addEventListener('load', initPage);
    }
});

function initPage() {
    // ================= 粒子系统初始化 =================
    // 加载粒子配置
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('粒子系统已加载');
    });

    // 主题切换
    // 主题切换改为设备的主题样式
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            createFirework(this);
        });
    }

    // 检测系统主题偏好
    const systemDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange(e) {
        if (e.matches) {
            // 系统主题为深色
            document.body.classList.remove('light-theme');
        } else {
            // 系统主题为浅色
            document.body.classList.add('light-theme');
        }
    }

    // 初始检测
    handleThemeChange(systemDarkModeQuery);

    // 监听主题变化
    systemDarkModeQuery.addEventListener('change', handleThemeChange);

    // ================= 全局水波纹效果 =================
    document.addEventListener('click', function(e) {
        // 创建主涟漪
        const ripple = document.createElement('div');
        ripple.className = 'global-ripple';

        // 定位主涟漪
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        // 自动移除
        setTimeout(() => ripple.remove(), 1800);
    });

    // ================= 垂直导航栏 =================
    const navContainer = document.createElement('div');
    navContainer.className = 'nav-container';
    navContainer.innerHTML = `
        <div class="nav-header">
            <span class="nav-icon"></span>
            <span class="nav-title"></span>
        </div>
        <ul class="nav-vertical"></ul>
    `;
    document.body.appendChild(navContainer);

    // 填充导航项
    const navItems = [
        ...Array.from(document.querySelectorAll('h2')).map(h2 => ({
            text: h2.textContent,
            anchor: h2.id
        })),
        { text: '下载补丁', anchor: 'download' },
        { text: '源代码', anchor: 'source' }
    ];

    const navList = navContainer.querySelector('.nav-vertical');
    navItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${item.anchor}">${item.text}</a>`;
        navList.appendChild(li);
    });
    
    // 在这里添加设置索引的代码
    // 获取所有导航菜单项
    const navItemsElements = document.querySelectorAll('.nav-vertical li');
    
    // 为每个菜单项设置索引值
    navItemsElements.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });

    // 导航交互
    navContainer.addEventListener('mouseenter', () => {
        navContainer.classList.add('expanded');
    });

    navContainer.addEventListener('mouseleave', () => {
        navContainer.classList.remove('expanded');
    });

    // ================= 滚动动画 =================
    const animateOnScroll = () => {
        document.querySelectorAll('.card, .timeline-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始加载时执行

    // ================= 表格增强 =================
    document.querySelectorAll('table').forEach(table => {
        if (!table.classList.contains('data-table')) {
            table.classList.add('data-table');
            
            // 确保有thead/tbody
            if (!table.querySelector('thead')) {
                const rows = table.querySelectorAll('tr');
                if (rows.length > 0) {
                    const thead = document.createElement('thead');
                    thead.appendChild(rows[0].cloneNode(true));
                    table.insertBefore(thead, table.firstChild);
                    rows[0].remove();
                }
            }
        }
    });

    // ================= 邮箱和网址自动链接通用修复 =================
    function createLinkNodes() {
        // 使用TreeWalker遍历所有文本节点
        const walker = document.createTreeWalker(
            document.body, // 从整个文档开始
            NodeFilter.SHOW_TEXT, // 只处理文本节点
            null, // 没有过滤函数
            false // 不扩展实体引用
        );
        
        let node;
        while (node = walker.nextNode()) {
            // 处理文本节点
            const text = node.nodeValue.trim();
            if (!text) continue; // 跳过空文本
            
            // 创建临时div来处理HTML
            const tempDiv = document.createElement('div');
            tempDiv.textContent = text;
            
            // 定义正则表达式
            const urlPattern = /(https?:\/\/[^\s]+)/gi;
            const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
            
            // 替换网址
            tempDiv.innerHTML = tempDiv.innerHTML.replace(urlPattern, (match) => {
                // 检查是否已经是链接
                if (match.toLowerCase().includes('</a>') || match.toLowerCase().includes('<a ')) {
                    return match;
                }
                return `<a href="${match}" target="_blank" class="url-link">${match}</a>`;
            });
            
            // 替换邮箱
            tempDiv.innerHTML = tempDiv.innerHTML.replace(emailPattern, (match) => {
                // 检查是否已经是链接
                if (match.toLowerCase().includes('mailto:')) {
                    return match;
                }
                return `<a href="mailto:${match}" class="email-link">${match}</a>`;
            });
            
            // 检查是否有任何修改
            if (tempDiv.innerHTML !== tempDiv.textContent) {
                // 替换原始文本节点
                node.parentNode.replaceChild(tempDiv, node);
            }
        }
    }

    // 执行自动链接创建
    createLinkNodes();
}