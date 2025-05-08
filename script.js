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
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      createFirework(this);
    });
  }

  // ================= 全局水波纹效果 =================
  // 水波纹效果在点击或长按时触发
  document.addEventListener('mousedown', waterRipple);
  document.addEventListener('touchstart', waterRipple, { passive: true });

  function waterRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'global-ripple';
    
    // 获取点击坐标
    let clientX, clientY;
    if (e.type === 'mousedown') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    ripple.style.left = `${clientX}px`;
    ripple.style.top = `${clientY}px`;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

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

  // ================= 邮箱自动链接通用修复 =================
  // 遍历所有文本节点并转换邮箱为链接
  document.querySelectorAll('section').forEach(section => {
    const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      let text = node.nodeValue;
      // 使用正则表达式匹配邮箱地址
      const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      if (emailPattern.test(text)) {
        // 创建一个临时div来处理HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        // 替换所有匹配的邮箱地址
        tempDiv.innerHTML = tempDiv.innerHTML.replace(emailPattern, (match) => {
          // 检查是否已经是链接
          if (match.toLowerCase().includes('mailto:')) {
            return match;
          }
          return `<a href="mailto:${match}" class="email-link">${match}</a>`;
        });
        // 替换原始文本节点
        node.parentNode.replaceChild(tempDiv, node);
      }
    }
  });
}