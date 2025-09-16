/**
 * Guard: fail if we detect deploy verbs or unsafe env in pre-launch.
 * Allowed: terraform plan, serverless package, cdk synth.
 */
const fs = require('fs');
const path = require('path');

const SAFE_MODE = (fs.existsSync('SAFE_MODE') && String(fs.readFileSync('SAFE_MODE')).trim() !== 'false');

const FORBIDDEN = [
  // direct commands
  /\bsls\s+deploy\b/i,
  /\bserverless\s+deploy\b/i,
  /\bterraform\s+apply\b/i,
  /\bcdk\s+deploy\b/i,
  // npm script names
  /deploy:/i,
];

const SCAN_EXT = ['.yml','.yaml','.json','.js','.ts','.tsx','.md','.sh','.bash','.ps1'];

function listFiles(dir) {
  const out = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        if (['node_modules','.git','.serverless','.terraform','cdk.out','.next','dist','coverage'].includes(f)) continue;
        walk(p);
      } else {
        if (SCAN_EXT.includes(path.extname(f))) out.push(p);
      }
    }
  })(dir);
  return out;
}

let violations = [];

if (SAFE_MODE) {
  for (const file of listFiles(process.cwd())) {
    const txt = fs.readFileSync(file, 'utf8');
    for (const rx of FORBIDDEN) {
      if (rx.test(txt)) {
        violations.push(`${file} contains forbidden deploy pattern: ${rx}`);
      }
    }
  }
}

// CI env safety nudge (won't fail, just warn unless SAFE_MODE)
const hasAwsCreds = !!(process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SECRET_ACCESS_KEY);
if (hasAwsCreds && SAFE_MODE) {
  console.warn('⚠️  AWS credentials detected in environment while SAFE_MODE is true. Consider removing to avoid accidental spend.');
}

if (SAFE_MODE && violations.length) {
  console.error('❌ SAFE_MODE violation(s):\n' + violations.map(v => ' - ' + v).join('\n'));
  process.exit(1);
}

console.log(`✅ guard-no-deploy OK (SAFE_MODE=${SAFE_MODE ? 'true' : 'false'})`);


