import Storage from './storage.js';

const COMMENTS_KEY = 'comments';

export function initBlog(){
  const listEl = document.getElementById('comments-list');
  const form = document.getElementById('comment-form');
  const input = document.getElementById('comment-input');
  const clearBtn = document.getElementById('clear-comments');

  function loadComments(){
    return Storage.loadJSON(COMMENTS_KEY, []);
  }

  function saveComments(items){ Storage.saveJSON(COMMENTS_KEY, items); }

  function render(){
    const items = loadComments();
    listEl.innerHTML = '';
    if(items.length === 0){ listEl.innerHTML = '<li class="muted">No comments yet</li>'; return }
    items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = `${it.text} — ${new Date(it.t).toLocaleString()}`;
      listEl.appendChild(li);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value && input.value.trim();
    if(!text){ input.focus(); return }
    const items = loadComments();
    items.unshift({ text, t: Date.now() });
    saveComments(items);
    input.value = '';
    render();
  });

  clearBtn.addEventListener('click', () => {
    if(!confirm('Clear all comments?')) return;
    Storage.clearKey(COMMENTS_KEY);
    render();
  });

  // initial render
  render();
}

export default { initBlog };
