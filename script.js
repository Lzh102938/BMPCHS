document.addEventListener('DOMContentLoaded', function() {
  // ================= 粒子系统初始化 =================
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('粒子系统已加载');
  });

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    createFirework(this);
  });


  // ================= 全局水波纹效果 =================
  document.addEventListener('click', function(e) {
    // 排除导航栏点击
    if (e.target.closest('.nav-container')) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'global-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
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

  // ================= 邮箱自动链接 =================
  document.querySelectorAll('section').forEach(section => {
    section.innerHTML = section.innerHTML.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      '<a href="mailto:$1" class="email-link">$1</a>'
    );
  });
});