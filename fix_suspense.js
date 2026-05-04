const fs = require('fs');

function fixFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (code.includes('Suspense')) return;

  code = code.replace('export default function', 'function');
  const funcNameMatch = code.match(/function ([A-Za-z0-9_]+)/);
  if (!funcNameMatch) return;
  const funcName = funcNameMatch[1];
  
  // Replace the first import with Suspense
  code = code.replace(/import \{ (.*) \} from "react";/, 'import { $1, Suspense } from "react";');
  if (!code.includes('import { Suspense } from "react"')) {
    // If there wasn't an import from react
    code = code.replace(/import/, 'import { Suspense } from "react";\nimport');
  }

  code += `\n\nexport default function ${funcName}Wrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <${funcName} />
    </Suspense>
  );
}`;

  fs.writeFileSync(file, code);
  console.log('Fixed', file);
}

fixFile('src/app/checkout/page.tsx');
fixFile('src/app/productos/page.tsx');
fixFile('src/app/servicios/page.tsx');
