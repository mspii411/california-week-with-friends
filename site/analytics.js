(() => {
  const endpoint = window.CALIFORNIA_WEEK_ANALYTICS?.endpoint;
  if (!endpoint) return;

  const storageKey = 'californiaWeekAnalyticsVisitorId';
  let visitorId;
  try {
    visitorId = localStorage.getItem(storageKey);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(storageKey, visitorId);
    }
  } catch { return; }

  const page = location.pathname || '/';
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch {}
  const send = (eventType, durationMs) => {
    const payload = JSON.stringify({ eventType, visitorId, page, referrer, ...(durationMs === undefined ? {} : { durationMs }) });
    const body = new Blob([payload], { type: 'text/plain' });
    if (navigator.sendBeacon?.(endpoint, body)) return;
    fetch(endpoint, { method: 'POST', body, keepalive: true, mode: 'cors' }).catch(() => {});
  };

  send('pageview');
  const startedAt = Date.now();
  let reported = false;
  const reportEngagement = () => {
    if (reported) return;
    reported = true;
    send('engagement', Math.min(Date.now() - startedAt, 21600000));
  };
  addEventListener('pagehide', reportEngagement, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') reportEngagement();
  }, { once: true });
})();
