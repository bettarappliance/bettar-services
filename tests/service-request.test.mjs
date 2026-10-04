import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(__dirname, '../src/app/api/service-request/route.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const route = {};
new Function('require', 'exports', compiled)(require, route);
const originalFetch = global.fetch;
after(() => { global.fetch = originalFetch; });
const data = { firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '3015550100', address: 'Test address', serviceType: 'Appliance repair', description: 'Test only', servedInPast: 'No', preferredDays: 'Mon', timeStart: '', timeEnd: '', consentToEmails: 'Yes' };
function request(body = data, origin = 'https://preview.example') {
  return new Request('https://preview.example/api/service-request', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}
test('accepted requests preserve Zapier form fields and do not claim booking', async () => {
  let forwarded;
  global.fetch = async (url, options) => { forwarded = { url, options }; return new Response('{}', { status: 200 }); };
  const response = await route.POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { accepted: true });
  assert.equal(forwarded.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  assert.deepEqual(Object.fromEntries(new URLSearchParams(forwarded.options.body)), data);
  assert.equal(forwarded.options.redirect, 'error');
});
test('an upstream failure is not presented as success', async () => {
  global.fetch = async () => new Response('unavailable', { status: 503 });
  const response = await route.POST(request());
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /before submitting again/);
});
test('a transport failure has a phone fallback', async () => {
  global.fetch = async () => { throw new Error('connection interrupted'); };
  const response = await route.POST(request());
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /301-949-2500/);
});
test('cross-origin submissions are rejected without forwarding', async () => {
  global.fetch = async () => { assert.fail('must not forward'); };
  assert.equal((await route.POST(request(data, 'https://other.example'))).status, 403);
});
test('missing consent, required details, and malformed email are rejected', async () => {
  global.fetch = async () => { assert.fail('must not forward'); };
  for (const invalid of [{ ...data, consentToEmails: 'No' }, { ...data, firstName: '' }, { ...data, email: 'invalid' }, { ...data, email: null }]) {
    assert.equal((await route.POST(request(invalid))).status, 400);
  }
});
test('oversized and non-object payloads are rejected', async () => {
  global.fetch = async () => { assert.fail('must not forward'); };
  assert.equal((await route.POST(request({ ...data, description: 'x'.repeat(17000) }))).status, 413);
  assert.equal((await route.POST(request(null))).status, 400);
  assert.equal((await route.POST(request([]))).status, 400);
});
