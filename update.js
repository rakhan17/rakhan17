const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the zig-zag layout in Experience section
// 2024 Google DevFest ISTTS should be Text Left, Images Right
// 24-25 Google DevFest should be Images Left, Text Right
// 2025 IDN Mengajar (Klaten) should be Text Left, Images Right

// Let's replace the grid classes for 2024 Google DevFest ISTTS
let p2024 = html.indexOf('Google DevFest ISTTS');
if (p2024 !== -1) {
    let sectionStart = html.lastIndexOf('<div class="relative z-10 mb-32 group">', p2024);
    let sectionEnd = html.indexOf('<div class="relative z-10 mb-32 group">', p2024);
    if (sectionEnd === -1) sectionEnd = html.indexOf('</section>', p2024);
    
    let chunk = html.substring(sectionStart, sectionEnd);
    // Currently: 
    // Images: <div class="flex gap-4 reveal-left order-1 md:order-1 relative">
    // Text: <div class="md:text-left reveal-right order-2 md:order-2">
    // We want Text Left, Images Right:
    // Text: <div class="md:text-right reveal-left order-2 md:order-1">
    // Images: <div class="flex gap-4 reveal-right order-1 md:order-2 relative">
    
    chunk = chunk.replace('class="flex gap-4 reveal-left order-1 md:order-1 relative"', 'class="flex gap-4 reveal-right order-1 md:order-2 relative"');
    chunk = chunk.replace('class="md:text-left reveal-right order-2 md:order-2"', 'class="md:text-right reveal-left order-2 md:order-1"');
    html = html.substring(0, sectionStart) + chunk + html.substring(sectionEnd);
}

// Let's replace the grid classes for 24-25 Google DevFest
let p24_25 = html.indexOf('Google DevFest</h4>');
if (p24_25 !== -1) {
    let sectionStart = html.lastIndexOf('<div class="relative z-10 mb-32 group">', p24_25);
    let sectionEnd = html.indexOf('<div class="relative z-10 mb-32 group">', p24_25);
    if (sectionEnd === -1) sectionEnd = html.indexOf('</section>', p24_25);
    
    let chunk = html.substring(sectionStart, sectionEnd);
    // Currently: 
    // Text: <div class="md:text-right reveal-left order-2 md:order-1">
    // Images: <div class="flex gap-4 reveal-right order-1 md:order-2 relative">
    // We want Images Left, Text Right:
    // Images: <div class="flex gap-4 reveal-left order-1 md:order-1 relative">
    // Text: <div class="md:text-left reveal-right order-2 md:order-2">
    
    chunk = chunk.replace('class="md:text-right reveal-left order-2 md:order-1"', 'class="md:text-left reveal-right order-2 md:order-2"');
    chunk = chunk.replace('class="flex gap-4 reveal-right order-1 md:order-2 relative"', 'class="flex gap-4 reveal-left order-1 md:order-1 relative"');
    html = html.substring(0, sectionStart) + chunk + html.substring(sectionEnd);
}

// Let's replace the grid classes for 2025 IDN Klaten
let pKlaten = html.indexOf('SMA Muhammadiyah 1 Klaten');
if (pKlaten !== -1) {
    let sectionStart = html.lastIndexOf('<div class="relative z-10 mb-32 group">', pKlaten);
    let sectionEnd = html.indexOf('</section>', pKlaten);
    
    let chunk = html.substring(sectionStart, sectionEnd);
    // Currently:
    // Images: <div class="flex gap-4 reveal-left order-1 md:order-1 relative">
    // Text: <div class="md:text-left reveal-right order-2 md:order-2">
    // We want Text Left, Images Right:
    // Text: <div class="md:text-right reveal-left order-2 md:order-1">
    // Images: <div class="flex gap-4 reveal-right order-1 md:order-2 relative">
    
    chunk = chunk.replace('class="flex gap-4 reveal-left order-1 md:order-1 relative"', 'class="flex gap-4 reveal-right order-1 md:order-2 relative"');
    chunk = chunk.replace('class="md:text-left reveal-right order-2 md:order-2"', 'class="md:text-right reveal-left order-2 md:order-1"');
    html = html.substring(0, sectionStart) + chunk + html.substring(sectionEnd);
}


// 2. Add SDS, Kurumi AI, Cycro to #mini
let newProjects = `
                <!-- Mini Card 12 -->
                <div class="bg-paper border-2 border-ink p-4 rounded-xl playful-card reveal-flip delay-100 group">
                    <div class="aspect-video rounded-lg overflow-hidden border-2 border-ink mb-4 bg-white relative">
                        <img src="/sds.png" class="w-full h-full object-cover mix-blend-multiply filter sepia-[0.2]">
                        <div class="absolute top-2 right-2 bg-accent-yellow border-2 border-ink px-2 py-1 text-xs font-bold rounded-sm group-hover:animate-bounce-steps">JavaScript</div>
                    </div>
                    <h3 class="font-serif text-2xl mb-2 text-ink group-hover:text-accent-yellow transition-colors">Certificate Dummy Studio</h3>
                    <p class="font-sans text-sm text-ink/70">A website to generate dummy certificates where you can customize the name and course taken. Built entirely with JavaScript.</p>
                </div>

                <!-- Mini Card 13 -->
                <div class="bg-paper border-2 border-ink p-4 rounded-xl playful-card reveal-flip delay-200 group">
                    <div class="aspect-video rounded-lg overflow-hidden border-2 border-ink mb-4 bg-white relative">
                        <img src="/kurumi.png" class="w-full h-full object-cover mix-blend-multiply filter sepia-[0.2]">
                        <div class="absolute top-2 right-2 bg-accent-red text-white border-2 border-ink px-2 py-1 text-xs font-bold rounded-sm group-hover:animate-bounce-steps">Node & Python</div>
                    </div>
                    <h3 class="font-serif text-2xl mb-2 text-ink group-hover:text-accent-red transition-colors">Kurumi AI</h3>
                    <p class="font-sans text-sm text-ink/70">An AI chatbot integrated with WhatsApp to provide a conversational AI experience, personalized as a virtual companion (waifu) for chatting and more.</p>
                </div>

                <!-- Mini Card 14 -->
                <div class="bg-paper border-2 border-ink p-4 rounded-xl playful-card reveal-flip group">
                    <div class="aspect-video rounded-lg overflow-hidden border-2 border-ink mb-4 bg-white relative">
                        <img src="/cycro.png" class="w-full h-full object-cover mix-blend-multiply filter sepia-[0.2]">
                        <div class="absolute top-2 right-2 bg-accent-blue text-white border-2 border-ink px-2 py-1 text-xs font-bold rounded-sm group-hover:animate-bounce-steps">React JS</div>
                    </div>
                    <h3 class="font-serif text-2xl mb-2 text-ink group-hover:text-accent-blue transition-colors">Cycro</h3>
                    <p class="font-sans text-sm text-ink/70">A code generator platform powered by the Gemini API. Features a canvas-like chat interface to build, preview, and refine code interactively.</p>
                </div>

                <!-- Mini Card 9 -->`;

html = html.replace('<!-- Mini Card 9 -->', newProjects);

fs.writeFileSync('index.html', html);
console.log('Update Complete');
