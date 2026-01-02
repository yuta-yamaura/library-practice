const fs = require('node:fs');
const path = require('node:path');

const target = path.join(__dirname, '..', 'prisma', 'generated', 'client.ts');

function patch(content) {
    // Replace Prisma's ESM __dirname emulation (import.meta.url) with CommonJS __dirname.
    const before =
        "import * as path from 'node:path'\n" +
        "import { fileURLToPath } from 'node:url'\n" +
        "globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))\n";

    const after =
        "// NOTE: This project runs the emitted JS as CommonJS in dev/build.\n" +
        "// Keeping `import.meta.url` here triggers Node's ESM detection and breaks at runtime\n" +
        '// with "exports is not defined in ES module scope" after TS emits CJS.\n' +
        "// In CommonJS, `__dirname` is already available.\n" +
        "globalThis['__dirname'] = __dirname\n";

    if (content.includes(after)) return content; // already patched
    if (!content.includes(before)) return content; // unexpected format; don't mutate

    return content.replace(before, after);
}

const original = fs.readFileSync(target, 'utf8');
const patched = patch(original);

if (patched !== original) {
    fs.writeFileSync(target, patched, 'utf8');
    // eslint-disable-next-line no-console
    console.log('[patch-prisma-generated-client] patched prisma/generated/client.ts');
} else {
    // eslint-disable-next-line no-console
    console.log('[patch-prisma-generated-client] no changes');
}


