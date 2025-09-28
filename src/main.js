import Storage from './storage.js';
import { initBlog } from './blog.js';

const TEXT_KEY = 'bigText';
const COLOR_KEY = 'textColor';
const SIZE_KEY = 'textSize';
const THEME_KEY = 'darkMode';

function $(id){ return document.getElementById(id) }

function setTheme(dark){
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = $('theme-toggle');
  btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
}

function routeTo(name){
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = $(`page-${name}`);
  if(el) el.classList.remove('hidden');
}

function initNav(){
  document.querySelectorAll('[data-link]').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = btn.getAttribute('data-link');
      routeTo(target);
    });
  });
}

function initTextDisplay(){
  const input = $('big-text-input');
  const display = $('big-text-display');
  const color = $('text-color');
  const size = $('text-size');
  const clear = $('clear-text');

  // load saved
  const saved = Storage.loadJSON(TEXT_KEY, '');
  const savedColor = Storage.loadJSON(COLOR_KEY, '#ff4d4d');
  const savedSize = Storage.loadJSON(SIZE_KEY, 72);
  input.value = saved;
  color.value = savedColor;
  size.value = savedSize;
  applyText({ text: saved, color: savedColor, size: savedSize });

  function update(){
    const text = input.value || '';
    const c = color.value;
    const s = Number(size.value);
    Storage.saveJSON(TEXT_KEY, text);
    Storage.saveJSON(COLOR_KEY, c);
    Storage.saveJSON(SIZE_KEY, s);
    applyText({ text, color: c, size: s });
  }

  input.addEventListener('input', update);
  color.addEventListener('input', update);
  size.addEventListener('input', update);
  clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });

  function applyText({ text, color, size }){
    display.textContent = text || '—';
    display.style.color = color;
    display.style.fontSize = (size) + 'px';
  }
}

function initTheme(){
  const btn = $('theme-toggle');
  const saved = Storage.loadJSON(THEME_KEY, true);
  setTheme(saved);
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!cur);
    Storage.saveJSON(THEME_KEY, !cur);
  });
}

function initTests(){
  const log = $('test-log');
  const t1 = $('test-fill-text');
  const t2 = $('test-add-comment');

  function append(msg){ log.textContent += msg + '\n'; log.scrollTop = log.scrollHeight }

  t1.addEventListener('click', () => {
    const input = $('big-text-input');
    input.value = 'Hello from test';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    append('Filled big text and saved');
  });

  t2.addEventListener('click', () => {
    const c = $('comment-input');
    c.value = 'Test comment at ' + new Date().toLocaleTimeString();
    document.getElementById('comment-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    append('Submitted comment');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTextDisplay();
  initTheme();
  initBlog();
  initTests();
  routeTo('home');
});
