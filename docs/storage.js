const STORAGE_PREFIX = 'rtp:';

export function loadJSON(key, fallback = null){
  try{
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if(!raw) return fallback;
    return JSON.parse(raw);
  }catch(e){ console.warn('storage.loadJSON failed', e); return fallback }
}

export function saveJSON(key, value){
  try{ localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); }
  catch(e){ console.warn('storage.saveJSON failed', e); }
}

export function clearKey(key){ localStorage.removeItem(STORAGE_PREFIX + key) }

// simple migration helper. accepts current shape and migrator function
export function migrate(key, migrator){
  const v = loadJSON(key);
  const next = migrator(v);
  saveJSON(key, next);
  return next;
}

export default { loadJSON, saveJSON, clearKey, migrate };
