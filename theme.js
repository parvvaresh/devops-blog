(function () {
  var THEME_KEY = 'devops-blog-theme';
  var root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    var storedTheme = getStoredTheme();

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  function updateToggleButtons(theme) {
    var isDark = theme === 'dark';
    var buttons = document.querySelectorAll('.theme-toggle');

    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(isDark));

      var text = button.querySelector('.theme-toggle-text');
      var icon = button.querySelector('.theme-toggle-icon');

      if (text) {
        text.textContent = isDark ? 'لایت' : 'دارک';
      }

      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    updateToggleButtons(theme);
  }

  function toggleTheme() {
    var currentTheme = root.getAttribute('data-theme') || 'light';
    var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    storeTheme(nextTheme);
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.theme-toggle');

    buttons.forEach(function (button) {
      button.addEventListener('click', toggleTheme);
    });

    updateToggleButtons(root.getAttribute('data-theme') || 'light');
  });
})();
