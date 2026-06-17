// utils.js

export async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const is429 = err?.status === 429 || err?.error?.error?.type === "rate_limit_error";
      if (!is429 || attempt === maxRetries) throw err;

      const retryAfter = err?.headers?.get?.("retry-after");
      const seconds = (retryAfter ? parseInt(retryAfter) : null) || attempt * 5;

      console.log(`⏳ Rate limit — aguardando ${seconds}s (tentativa ${attempt}/${maxRetries})`);
      await sleep(seconds * 1000);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function extractText(response) {
  return response.content
    .filter(block => block.type === "text")
    .map(block => block.text)
    .join("");
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