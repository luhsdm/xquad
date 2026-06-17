// utils.js

export async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const is429 = err?.status === 429 || err?.code === "rate_limit_exceeded";
      if (!is429 || attempt === maxRetries) throw err;

      const resetHeader = err?.headers?.get?.("x-ratelimit-reset-tokens") || "";
      const seconds = parseResetSeconds(resetHeader) || attempt * 5;

      console.log(`⏳ Rate limit — aguardando ${seconds}s (tentativa ${attempt}/${maxRetries})`);
      await sleep(seconds * 1000);
    }
  }
}

function parseResetSeconds(header) {
  if (!header) return null;
  const minMatch = header.match(/(\d+)m/);
  const secMatch = header.match(/([\d.]+)s/);
  const minutes = minMatch ? parseInt(minMatch[1]) : 0;
  const seconds = secMatch ? parseFloat(secMatch[1]) : 0;
  return Math.ceil(minutes * 60 + seconds) + 1;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Adiciona no utils.js existente

export async function limitedParallel(tasks, limit = 3) {
  const results = [];
  const executing = [];

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);

    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) await Promise.race(executing);
    }
  }

  return Promise.all(results);
}