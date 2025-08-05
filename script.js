document.addEventListener('DOMContentLoaded', function() {
    // 直接显示指定的HTML内容
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        h1Element.innerHTML = '<span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">大</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">型</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">任</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">务</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">包</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">最</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">终</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">版</span><br><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">中</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">文</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">化</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">计</span><span style="display:inline-block;transition:all 0.3s ease, text-shadow 0.3s ease;margin:0 2px;">划</span>';
        
        // 为每个span添加动画效果
        const spans = h1Element.querySelectorAll('span');
        const neonColors = ['0 0 10px rgba(255,100,255,0.7)', '0 0 10px rgba(100,255,255,0.7)', '0 0 10px rgba(255,255,100,0.7)'];
        
        spans.forEach((span, index) => {
            const originalShadow = window.getComputedStyle(span).textShadow;
            
            span.addEventListener('mouseenter', () => {
                span.style.transform = 'scale(1.5)';
                span.style.margin = '0 10px';
                span.style.zIndex = '1';
                span.style.textShadow = `${originalShadow}, ${neonColors[index % neonColors.length]}`;
            });
            
            span.addEventListener('mouseleave', () => {
                span.style.transform = 'scale(1)';
                span.style.margin = '0 2px';
                span.style.zIndex = '0';
                span.style.textShadow = originalShadow;
            });
        });
    }
    // 确保DOM已完全加载
    if (document.readyState === 'complete') {
        initPage();
    } else {
        window.addEventListener('load', initPage);
    }
    
    // 添加回到顶部按钮（仅在需要时创建）
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.title = '回到顶部';
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        document.body.appendChild(backToTopBtn);
    }
    
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // 滚动事件处理
    window.addEventListener('scroll', () => {
        // 回到顶部按钮
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // 顶部导航栏滚动效果
        const nav = document.querySelector('.sticky-nav');
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // 更新进度条
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });

    // 确保所有固定元素初始位置正确
    const nav = document.querySelector('.sticky-nav');
    if (nav) {
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
    }

    // 导航栏交互
    const navToggle = document.getElementById('nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    // 切换导航栏状态
    navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('expanded');
    navContainer.classList.toggle('expanded');
    
    if (navContainer.classList.contains('expanded')) {
        navContainer.classList.add('animate-expand');
    } else {
        navContainer.classList.add('animate-collapse');
    }
    });

    // 动画结束处理
    navContainer.addEventListener('animationend', () => {
        navContainer.classList.remove('animate-expand', 'animate-collapse');
    });

    // 点击其他地方关闭导航栏
    document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && e.target !== navToggle) {
        navToggle.classList.remove('expanded');
        navContainer.classList.remove('animate-expand');
        navContainer.classList.add('animate-collapse');
    }
    });

    // 滚动时自动关闭导航栏
    window.addEventListener('scroll', () => {
    if (navContainer.classList.contains('expanded')) {
        navToggle.classList.remove('expanded');
        navContainer.classList.remove('animate-expand');
        navContainer.classList.add('animate-collapse');
    }
    });

    // 确保初始状态 (已在CSS中设置)
    navContainer.style.opacity = '1';
    navContainer.style.pointerEvents = 'auto';
});

function initPage() {
    // ================= 粒子系统初始化 =================
    // 加载粒子配置
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('粒子系统已加载');
    });

    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const updateGiscusTheme = () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const giscusTheme = isDark ? 'dark' : 'light';
      
        const iframe = document.querySelector('iframe.giscus-frame');
        if (iframe) {
          iframe.contentWindow.postMessage({
            giscus: {
              setConfig: {
                theme: giscusTheme
              }
            }
          }, 'https://giscus.app');
        }
      };

      themeToggle.addEventListener('click', function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        createFirework(this);
      
        // 保存主题偏好
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
      
        // 更新giscus主题
        updateGiscusTheme();
      });
    
      // 初始化主题
      const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.body.setAttribute('data-theme', savedTheme);
    
      // 监听giscus加载完成事件
      window.addEventListener('load', () => {
        const observer = new MutationObserver(() => {
          if (document.querySelector('iframe.giscus-frame')) {
            updateGiscusTheme();
            observer.disconnect();
          }
        });
      
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
    
    // 添加烟花效果函数
    function createFirework(element) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const wrapper = document.createElement('div');
    wrapper.className = 'firework';
    wrapper.style.left = cx + 'px';
    wrapper.style.top = cy + 'px';
    document.body.appendChild(wrapper);

    const max = 30;          // 粒子上限
    for (let i = 0; i < max; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';

        // 随机颜色
        p.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;

        // 随机终点（±60 px 圆内）
        const angle = Math.random() * 2 * Math.PI;
        const dist = 30 + Math.random() * 30;
        p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');

        wrapper.appendChild(p);
    }

    // 800 ms 后自动清理
    setTimeout(() => wrapper.remove(), 800);
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
    navContainer.style.opacity = '1';
    navContainer.style.pointerEvents = 'auto';
    navContainer.style.transform = 'translateX(0)';


    // 填充导航项
    const navItems = [
        ...Array.from(document.querySelectorAll('h2')).map(h2 => ({
            text: h2.textContent,
            anchor: h2.id
        })),
        { text: '<i class="fa-solid fa-download"></i>下载补丁', anchor: 'download' },
        { text: '<i class="fa-solid fa-code"></i>源代码', anchor: 'source' }
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
    // 鼠标悬停展开
    navContainer.addEventListener('mouseenter', () => {
    navContainer.classList.remove('animate-collapse');
    navContainer.classList.add('expanded', 'animate-expand');
    });

    // 鼠标离开收起
    navContainer.addEventListener('mouseleave', () => {
    navContainer.classList.remove('expanded', 'animate-expand');
    navContainer.classList.add('animate-collapse');
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
        // 优化：为所有表格添加点击动画（仅添加一次事件）
        if (!table.dataset.animated) {
            table.addEventListener('click', () => {
                table.classList.remove('animated');
                // 触发重绘以重置动画
                void table.offsetWidth;
                table.classList.add('animated');
            });
            table.dataset.animated = "true";
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

document.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.className = 'global-ripple';

  // 设置水波纹中心点为鼠标点击位置
  const size = 20; // 与CSS中width/height一致
  ripple.style.setProperty('--mouseX', `${e.clientX - size / 2}px`);
  ripple.style.setProperty('--mouseY', `${e.clientY - size / 2}px`);

  document.body.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
});