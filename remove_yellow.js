const fs = require('fs');

function replaceFile(path, replacements) {
  let content = fs.readFileSync(path, 'utf8');
  for (const [oldStr, newStr] of replacements) {
    // using split join for global replace of literal strings
    content = content.split(oldStr).join(newStr);
  }
  fs.writeFileSync(path, content);
}

// 1. Navbar
replaceFile('src/components/layout/Navbar.tsx', [
  ['bg-[#fcb800]', 'bg-blue-600'],
  ['border-yellow-500/30', 'border-blue-500'],
  ['text-slate-900', 'text-white'], // Wait, this might replace search text too! 
  // Let's be more specific with Regex or specific replacements for Navbar
]);

// Actually, let's just do it cleanly via regex
let navbar = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
navbar = navbar.replace(/bg-\[#fcb800\]/g, 'bg-blue-600 text-white');
navbar = navbar.replace(/border-yellow-500\/30/g, 'border-blue-500');
navbar = navbar.replace(/text-slate-900/g, 'text-white');
// fix search input text
navbar = navbar.replace(/className="flex-1 border-none bg-transparent px-4 text-sm text-white/g, 'className="flex-1 border-none bg-transparent px-4 text-sm text-slate-900');
navbar = navbar.replace(/className="flex-1 border-none bg-transparent px-3 text-sm outline-none"/g, 'className="flex-1 border-none bg-transparent px-3 text-sm outline-none text-slate-900"');
// fix logo colors
navbar = navbar.replace(/text-slate-800/g, 'text-blue-100');
// fix icon hover colors
navbar = navbar.replace(/hover:text-slate-700/g, 'hover:text-blue-200');
// fix mobile menu colors
navbar = navbar.replace(/text-base font-bold text-white border-b/g, 'text-base font-bold text-slate-800 border-b');
navbar = navbar.replace(/text-base font-bold text-white pb-2/g, 'text-base font-bold text-slate-800 pb-2');

fs.writeFileSync('src/components/layout/Navbar.tsx', navbar);

// 2. Home Page
let home = fs.readFileSync('src/app/page.tsx', 'utf8');
home = home.replace(/from-\[#fcb800\]/g, 'from-blue-600');
home = home.replace(/text-yellow-400/g, 'text-blue-200');
fs.writeFileSync('src/app/page.tsx', home);

// 3. User Dashboard
let userDashboard = fs.readFileSync('src/app/dashboard/usuario/page.tsx', 'utf8');
userDashboard = userDashboard.replace(/text-\[#fcb800\]/g, 'text-blue-600');
fs.writeFileSync('src/app/dashboard/usuario/page.tsx', userDashboard);

// 4. Checkout
let checkout = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');
checkout = checkout.replace(/bg-\[#fcb800\]/g, 'bg-blue-600');
checkout = checkout.replace(/text-slate-900/g, 'text-white');
// Wait, text-slate-900 is used all over checkout for titles! Let's be careful.
// The header in checkout:
// <header className="bg-[#fcb800] h-[72px] flex items-center shadow-sm">
//   <div className="container mx-auto px-4 max-w-5xl">
//     <Link href="/" className="font-black text-2xl tracking-tighter text-slate-900">
checkout = checkout.replace('className="font-black text-2xl tracking-tighter text-white"', 'className="font-black text-2xl tracking-tighter text-slate-900"'); // Revert if accidental global replace
let freshCheckout = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');
freshCheckout = freshCheckout.replace('bg-[#fcb800]', 'bg-blue-600');
freshCheckout = freshCheckout.replace('className="font-black text-2xl tracking-tighter text-slate-900"', 'className="font-black text-2xl tracking-tighter text-white"');
fs.writeFileSync('src/app/checkout/page.tsx', freshCheckout);

console.log('Removed yellow successfully');
