const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const messages = [
    "🐳 Swimmin' by to say… you're the best!",
    "🐳 One whole month of good 🩵",
    "🐳 Just keep swimming… with you forever!",
    "🐳 You're my favorite ocean to get lost in.",
    "🐳 This whale loves you more than the sea loves the moon!",
    "🐳 One month closer to fusing like anglerfish 😏",
    "🐳 Good. Just… good. 🩵",
    "🐳 I'd pay ALL my skips just to be with you.",
    "🐳 Would you tap me forever? No refunds. 🤑",
    "🐳 Is this our version of 'Whale Wars'?",
    "🐳 Boop! Another love tap!",
    "🐳 This whale is whale-y in love with you!",
    "🐳 I was made for tappin' and lovin' you!",
    "🐳 Do I get a belly rub now? No? Okay. 🥲",
    "🐳 If I could, I'd propose right now… but I have no fingers.",
    "🐳 One month down, forever to go? 🩵",
    "🐳 This little whale's dreaming of rings and things… 👀",
    "🐳 One day, we're gonna need a baby whale emoji.",
    "🐳 This whale's swimming toward a forever ocean with you.",
    "🐳 One day, I'll upgrade to a tuxedo whale for a special day… 🐳🎩",
    "🐳 Tap me one more time and I might have to start blushing… 😳",
    "🐳 Careful now… too many taps and I might start thinking you're flirting. 😏",
    "🐳 You know what else is good? Me. In your arms. Right now.",
    "🐳 Anglerfish fuse forever, but I plan to do more than just fuse with you. 😉"
];

const whale = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    baseY: canvas.height / 2,
    size: 50,
    text: "🐋",
    animationOffset: 0
};

let activeMessage = null;

function drawWhale() {
    ctx.font = `${whale.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calculate y position with swimming motion
    whale.animationOffset += 0.05;
    whale.y = whale.baseY + Math.sin(whale.animationOffset) * 20;
    
    // Draw the whale
    ctx.fillText(whale.text, whale.x, whale.y);
}

function showMessage() {
    const message = messages[Math.floor(Math.random() * messages.length)];
    activeMessage = {
        text: message,
        opacity: 0,
        y: whale.y - 50,
        fadeIn: true,
        timer: 0
    };
}

function drawMessage() {
    if (!activeMessage) return;

    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(255, 255, 255, ${activeMessage.opacity})`;
    
    const maxWidth = canvas.width - 100;
    const lineHeight = 25;
    const words = activeMessage.text.split(' ');
    let line = '';
    let y = activeMessage.y;

    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line, whale.x, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, whale.x, y);

    if (activeMessage.fadeIn) {
        activeMessage.opacity += 0.05;
        if (activeMessage.opacity >= 1) {
            activeMessage.fadeIn = false;
        }
    } else {
        activeMessage.timer++;
        if (activeMessage.timer > 150) {
            activeMessage.opacity -= 0.05;
            if (activeMessage.opacity <= 0) {
                activeMessage = null;
            }
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWhale();
    if (activeMessage) drawMessage();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if click is near the whale
    const distance = Math.sqrt(
        Math.pow(x - whale.x, 2) + 
        Math.pow(y - whale.y, 2)
    );
    
    if (distance < whale.size) {
        showMessage();
    }
});

gameLoop(); 