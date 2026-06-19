#!/usr/bin/env node

/**
 * EchoAI — end-to-end dev launcher (`npm run dev`).
 *
 * One command to go from a fresh clone to a running app:
 *   1. Installs client & server dependencies (only if missing).
 *   2. Ensures each .env exists; auto-fills safe, non-sensitive vars
 *      (e.g. VITE_SERVER_URL) and interactively collects sensitive ones
 *      (GEMINI_API_KEY) — telling you where it's stored and how to get it.
 *   3. Starts the client (Vite) and server (nodemon) together.
 *
 * Uses only Node built-ins, so it runs before any root dependencies exist.
 * Re-running is cheap: installs and prompts are skipped when already done.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const CLIENT = path.join(ROOT, 'client');
const SERVER = path.join(ROOT, 'server');
const IS_WIN = process.platform === 'win32';

const c = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  dim: '\x1b[2m',
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = query => new Promise(resolve => rl.question(query, resolve));
const step = msg => console.log(`\n${c.cyan}▸ ${msg}${c.reset}`);

/** Install dependencies in `dir` unless node_modules already exists. */
function ensureDeps(dir, name) {
  if (fs.existsSync(path.join(dir, 'node_modules'))) {
    console.log(`  ${c.green}✓${c.reset} ${name} dependencies already installed`);
    return;
  }
  console.log(`  ${c.yellow}…${c.reset} installing ${name} dependencies (first run, this can take a minute)`);
  const res = spawnSync('npm', ['install'], { cwd: dir, stdio: 'inherit', shell: IS_WIN });
  if (res.status !== 0) {
    console.error(`\n❌ Failed to install ${name} dependencies.`);
    process.exit(1);
  }
}

/** Parse a .env file into a plain object. */
function parseEnv(file) {
  const map = {};
  if (!fs.existsSync(file)) return map;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

/** Set (or replace) a KEY=value line in a .env file. */
function setEnvVar(file, key, value) {
  let content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const re = new RegExp(`^\\s*${key}\\s*=.*$`, 'm');
  const line = `${key}=${value}`;
  if (re.test(content)) {
    content = content.replace(re, line);
  } else {
    content += (content && !content.endsWith('\n') ? '\n' : '') + line + '\n';
  }
  fs.writeFileSync(file, content);
}

/** Copy .env.example → .env if .env is missing. */
function ensureEnvFile(dir) {
  const env = path.join(dir, '.env');
  const example = path.join(dir, '.env.example');
  if (!fs.existsSync(env) && fs.existsSync(example)) {
    fs.copyFileSync(example, env);
    console.log(`  ${c.green}✓${c.reset} created ${path.relative(ROOT, env)} from template`);
  }
  return env;
}

/** A value is "unset" if it's empty or still the example placeholder. */
function isUnset(value) {
  const v = (value || '').trim();
  return !v || /your-.*-here/i.test(v);
}

async function configureEnv() {
  step('Configuring environment variables');

  const clientEnv = ensureEnvFile(CLIENT);
  const serverEnv = ensureEnvFile(SERVER);

  // --- Non-sensitive, general: set automatically ---
  const clientVars = parseEnv(clientEnv);
  if (isUnset(clientVars.VITE_SERVER_URL)) {
    setEnvVar(clientEnv, 'VITE_SERVER_URL', 'http://localhost:3080/');
    console.log(`  ${c.green}✓${c.reset} VITE_SERVER_URL set to http://localhost:3080/ ${c.dim}(safe default — set for you)${c.reset}`);
  } else {
    console.log(`  ${c.green}✓${c.reset} VITE_SERVER_URL already set (${clientVars.VITE_SERVER_URL})`);
  }

  // --- Sensitive, required: ask the user ---
  const serverVars = parseEnv(serverEnv);
  if (!isUnset(serverVars.GEMINI_API_KEY)) {
    console.log(`  ${c.green}✓${c.reset} GEMINI_API_KEY already configured in server/.env`);
    return;
  }

  console.log(`
  ${c.yellow}⚠ GEMINI_API_KEY is not set${c.reset} — the built-in server needs a Google Gemini key.
    ${c.dim}• Where it lives:${c.reset}  server/.env   (GEMINI_API_KEY=...)
    ${c.dim}• How to get one (free):${c.reset}
        1. Open https://aistudio.google.com/apikey
        2. Sign in and click "Create API key"
        3. Copy the key (it starts with "AIza")
    ${c.dim}• Tip:${c.reset} you can also skip this and paste your own key later in the
      app's Settings — but the server won't answer requests until a key is set.
`);

  const answer = (await ask(`  Paste your GEMINI_API_KEY now (or press Enter to skip): `)).trim();
  if (!answer) {
    console.log(`  ${c.yellow}↷${c.reset} Skipped. Add GEMINI_API_KEY to server/.env when ready, then re-run ${c.cyan}npm run dev${c.reset}.`);
    return;
  }
  if (!answer.startsWith('AIza')) {
    console.log(`  ${c.yellow}⚠${c.reset} That doesn't look like a Gemini key (expected "AIza…"). Saving it anyway.`);
  }
  setEnvVar(serverEnv, 'GEMINI_API_KEY', answer);
  console.log(`  ${c.green}✓${c.reset} Saved GEMINI_API_KEY to server/.env`);
}

/** Spawn a long-running process, prefixing each output line with a label. */
function startProcess(label, color, dir) {
  const child = spawn('npm', ['run', 'dev'], { cwd: dir, shell: IS_WIN });
  const prefix = `${color}[${label}]${c.reset} `;
  const pipe = (stream, out) => {
    let buffer = '';
    stream.on('data', chunk => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();
      lines.forEach(line => out.write(prefix + line + '\n'));
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  return child;
}

async function main() {
  console.log(`${c.magenta}🚀 EchoAI — end-to-end dev setup${c.reset}`);
  console.log('================================');

  step('Checking dependencies');
  ensureDeps(SERVER, 'server');
  ensureDeps(CLIENT, 'client');

  await configureEnv();

  rl.close();

  step('Starting EchoAI — server + client');
  console.log(`  ${c.dim}server → http://localhost:3080   client → http://localhost:5173${c.reset}`);
  console.log(`  ${c.dim}press Ctrl+C to stop both${c.reset}\n`);

  const server = startProcess('server', c.green, SERVER);
  const client = startProcess('client', c.cyan, CLIENT);

  const shutdown = () => {
    for (const child of [server, client]) {
      try {
        child.kill('SIGINT');
      } catch {
        /* already gone */
      }
    }
  };

  process.on('SIGINT', () => {
    console.log(`\n${c.yellow}Shutting down…${c.reset}`);
    shutdown();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    shutdown();
    process.exit(0);
  });
}

main().catch(error => {
  console.error('\n❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});
