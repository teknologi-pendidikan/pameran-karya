/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";

export default function EasterEgg() {
  useEffect(() => {
    // Easter egg for developers who inspect the page 🥚
    console.clear();

    console.log(
      "%c🎪 SELAMAT DATANG DI PAMERAN DIGITAL! 🎪",
      "color: #ff6b6b; font-size: 24px; font-weight: bold; text-shadow: 3px 3px 0px #4ecdc4;"
    );

    console.log(
      "%c┌─────────────────────────────────────────────┐",
      "color: #4ecdc4; font-family: monospace; font-size: 12px;"
    );
    console.log(
      "%c│  🎓 Kamu menemukan ruang rahasia developer!  │",
      "color: #4ecdc4; font-family: monospace; font-size: 12px;"
    );
    console.log(
      "%c└─────────────────────────────────────────────┘",
      "color: #4ecdc4; font-family: monospace; font-size: 12px;"
    );

    console.log(
      "%c🔍 MISI: Jelajahi console ini seperti mengunjungi pameran!",
      "color: #45b7d1; font-size: 16px; font-weight: bold; background: #f0f8ff; padding: 5px;"
    );

    console.log(
      "%c📚 FUN FACT: Tahukah kamu? Console ini seperti 'backstage' dari website!",
      "color: #96ceb4; font-size: 13px; font-style: italic;"
    );

    console.log(
      "%c💡 CHALLENGE: Coba ketik 'showExhibitionStats()' di console!",
      "color: #feca57; font-size: 14px; font-weight: bold;"
    );

    console.log(
      "%c🕵️ HIDDEN COMMANDS: Ketik 'help()' untuk melihat semua perintah rahasia!",
      "color: #ff6b6b; font-size: 12px; background: #fff3cd; padding: 2px 5px;"
    );

    console.log(
      "%c🎯 EASTER EGG UNLOCKED: Developer Mode Activated!",
      "color: #ff9ff3; font-size: 12px; background: #2c2c2c; padding: 3px 8px; border-radius: 3px;"
    );

    console.log(
      "%c🤖 Beep boop! Jika kamu tertarik berkontribusi:",
      "color: #54a0ff; font-size: 12px;"
    );
    console.log(
      "%c   📧 teknologi.pendidikan@um.ac.id",
      "color: #5f27cd; font-weight: bold; font-size: 12px;"
    );
    console.log(
      "%c   🌐 teknologipendidikan.um.ac.id",
      "color: #00d2d3; font-weight: bold; font-size: 12px;"
    );

    console.log(
      "%c⚡ Made with 💜 using Next.js + TypeScript + Infinite Coffee ☕",
      "color: #8395a7; font-size: 10px; font-style: italic; margin-top: 10px;"
    );

    // Add interactive function to global scope
    (window as any).showExhibitionStats = () => {
      console.log(
        "%c🎨 STATISTIK PAMERAN VIRTUAL:",
        "color: #ff6348; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c📊 Total Karya: " + Math.floor(Math.random() * 150 + 50),
        "color: #2ed573;"
      );
      console.log(
        "%c👨‍🎓 Kontributor: " + Math.floor(Math.random() * 80 + 20),
        "color: #3742fa;"
      );
      console.log(
        "%c🏫 Institusi: " + Math.floor(Math.random() * 15 + 5),
        "color: #f368e0;"
      );
      console.log(
        "%c⏱️ Waktu loading: " + (Math.random() * 2 + 0.5).toFixed(2) + "s",
        "color: #ff9f43;"
      );
      console.log(
        "%c🎉 Selamat! Kamu official jadi 'Digital Exhibition Explorer'!",
        "color: #26de81; font-size: 14px; font-weight: bold; background: #2c2c2c; padding: 5px;"
      );
    };

    // Help command to show all available commands
    (window as any).help = () => {
      console.log(
        "%c🎮 DAFTAR PERINTAH RAHASIA:",
        "color: #ff6b6b; font-size: 18px; font-weight: bold;"
      );
      console.log(
        "%c┌─────────────────────────────────────┐",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ showExhibitionStats() - Statistik   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ meetDevelopers()      - Tim kami    │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ exploreRooms()        - Ruang expo  │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ techStack()           - Teknologi   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ secretMessage()       - Pesan tersembunyi │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ konamiCode()          - Kode klasik │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ timeTravel()          - Perjalanan waktu │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ debugMode()           - Mode debug  │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│                                     │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ INTERACTIVE COMMANDS:               │",
        "color: #ff6b6b; font-family: monospace; font-weight: bold;"
      );
      console.log(
        "%c│ partyMode()           - 🎉 Party!   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ matrixMode()          - 💊 Matrix   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ rotateWorld()         - 🌀 Putar    │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ darkMode()            - 🌙 Gelap    │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ rainbowMode()         - 🌈 Warna    │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ shakeIt()             - 📳 Goyang   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ floatElements()       - 🎈 Melayang │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ resetPage()           - 🔄 Reset    │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c│ clearConsole()        - Bersihkan   │",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c└─────────────────────────────────────┘",
        "color: #4ecdc4; font-family: monospace;"
      );
      console.log(
        "%c🚀 TIP: Coba partyMode() untuk kejutan!",
        "color: #feca57; font-weight: bold;"
      );
    };

    // Meet the developers
    (window as any).meetDevelopers = () => {
      console.log(
        "%c👥 MEET THE TEAM:",
        "color: #5f27cd; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c🧑‍💻 Lead Developer: The Coffee-Powered Coder",
        "color: #00d2d3;"
      );
      console.log(
        "%c🎨 UI/UX Designer: The Pixel Perfectionist",
        "color: #ff9ff3;"
      );
      console.log(
        "%c📚 Content Manager: The Knowledge Curator",
        "color: #26de81;"
      );
      console.log(
        "%c🔧 DevOps Engineer: The Deployment Wizard",
        "color: #feca57;"
      );
      console.log("%c🐛 Bug Hunter: The Console Detective", "color: #ff6348;");
      console.log(
        "%c☕ Coffee Supplier: The Most Important Team Member",
        "color: #8395a7;"
      );
      console.log(
        "%c💌 Want to join us? Drop a line at teknologi.pendidikan@um.ac.id",
        "color: #45b7d1; font-style: italic;"
      );
    };

    // Explore exhibition rooms
    (window as any).exploreRooms = () => {
      const rooms = [
        "🎨 Ruang Seni Digital",
        "🤖 Lab Robotika Pendidikan",
        "🎮 Arena Gamifikasi",
        "📱 Studio Mobile Learning",
        "🔬 Laboratorium VR/AR",
        "📺 Bioskop Multimedia Edukasi",
        "🏛️ Galeri Karya Mahasiswa",
      ];
      console.log(
        "%c🚪 PENJELAJAHAN RUANG PAMERAN:",
        "color: #ff6b6b; font-size: 16px; font-weight: bold;"
      );
      rooms.forEach((room, index) => {
        setTimeout(() => {
          console.log(`%c${room}`, "color: #96ceb4; font-size: 13px;");
        }, index * 500);
      });
      setTimeout(() => {
        console.log(
          "%c🎊 Selamat! Kamu telah mengunjungi semua ruang pameran!",
          "color: #ff9ff3; font-weight: bold;"
        );
      }, rooms.length * 500);
    };

    // Tech stack info
    (window as any).techStack = () => {
      console.log(
        "%c⚡ TECH STACK PAMERAN DIGITAL:",
        "color: #3742fa; font-size: 16px; font-weight: bold;"
      );
      console.log("%c🔧 Frontend: Next.js 14 + TypeScript", "color: #26de81;");
      console.log("%c💅 Styling: Tailwind CSS + DaisyUI", "color: #ff9f43;");
      console.log("%c🧪 Testing: Jest + Testing Library", "color: #f368e0;");
      console.log("%c📦 Package Manager: pnpm", "color: #5f27cd;");
      console.log("%c🚀 Deployment: Static Export", "color: #ff6348;");
      console.log(
        "%c☕ Secret Ingredient: 200+ cups of coffee",
        "color: #8395a7; font-style: italic;"
      );
    };

    // Secret message
    (window as any).secretMessage = () => {
      console.log(
        "%c🤫 PESAN RAHASIA DARI DEVELOPER:",
        "color: #ff6b6b; font-size: 16px; font-weight: bold;"
      );
      console.log("%c────────────────────────────────────", "color: #4ecdc4;");
      console.log(
        "%c'Terima kasih sudah menjelajahi console kami!'",
        "color: #26de81; font-size: 14px; font-style: italic;"
      );
      console.log(
        "%c'Kamu adalah tipe orang yang kami cari - detail-oriented,'",
        "color: #45b7d1; font-style: italic;"
      );
      console.log(
        "%c'curious, dan tidak takut mengeksplorasi!'",
        "color: #45b7d1; font-style: italic;"
      );
      console.log(
        "%c'Keep coding, keep learning! 🚀'",
        "color: #feca57; font-weight: bold;"
      );
      console.log("%c────────────────────────────────────", "color: #4ecdc4;");
      console.log(
        "%c🎁 BONUS: Kamu mendapat achievement 'Console Explorer'!",
        "background: #2c2c2c; color: #26de81; padding: 5px;"
      );
    };

    // Konami code easter egg
    (window as any).konamiCode = () => {
      console.log(
        "%c🕹️ KONAMI CODE ACTIVATED!",
        "color: #ff6b6b; font-size: 18px; font-weight: bold; background: #2c2c2c; padding: 5px;"
      );
      console.log(
        "%c↑ ↑ ↓ ↓ ← → ← → B A",
        "color: #feca57; font-size: 20px; font-family: monospace; font-weight: bold;"
      );
      console.log(
        "%c🎊 30 Lives Added! (Just kidding, ini website bukan game 😄)",
        "color: #26de81;"
      );
      console.log(
        "%c🎮 But you earned the 'Retro Gamer' badge!",
        "color: #ff9ff3; font-weight: bold;"
      );
    };

    // Time travel feature
    (window as any).timeTravel = () => {
      console.log(
        "%c⏰ MESIN WAKTU PAMERAN:",
        "color: #5f27cd; font-size: 16px; font-weight: bold;"
      );
      const timeline = [
        "🌱 2024-01: Ide pertama di atas kertas",
        "💡 2024-03: Prototype pertama dibuat",
        "🔨 2024-06: Development intensive",
        "🧪 2024-09: Phase testing & debugging",
        "🎨 2024-11: UI/UX refinement",
        "🚀 2024-12: Launch pameran digital!",
      ];
      timeline.forEach((event, index) => {
        setTimeout(() => {
          console.log(`%c${event}`, "color: #96ceb4;");
        }, index * 300);
      });
    };

    // Debug mode
    (window as any).debugMode = () => {
      console.log(
        "%c🐛 DEBUG MODE ACTIVATED:",
        "color: #ff6348; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c📊 Page Load Time:",
        performance.now().toFixed(2) + "ms",
        "color: #26de81;"
      );
      console.log("%c🌐 User Agent:", navigator.userAgent, "color: #45b7d1;");
      console.log(
        "%c📱 Screen Resolution:",
        screen.width + "x" + screen.height,
        "color: #feca57;"
      );
      console.log(
        "%c💾 localStorage Items:",
        Object.keys(localStorage).length,
        "color: #ff9ff3;"
      );
      console.log(
        "%c🍪 Cookies Enabled:",
        navigator.cookieEnabled,
        "color: #96ceb4;"
      );
      console.log(
        "%c🔧 JavaScript Engine:",
        typeof window !== "undefined" ? "V8" : "Unknown",
        "color: #8395a7;"
      );
    };

    // Clear console
    (window as any).clearConsole = () => {
      console.clear();
      console.log(
        "%c🧹 Console dibersihkan! Ketik help() untuk melihat perintah lagi.",
        "color: #45b7d1; font-size: 14px;"
      );
    };

    // 🎉 INTERACTIVE FUNCTIONS - Real page manipulations!

    // Party Mode - Confetti and animations
    (window as any).partyMode = () => {
      console.log(
        "%c🎉 PARTY MODE ACTIVATED!",
        "color: #ff6b6b; font-size: 18px; font-weight: bold;"
      );
      document.body.style.animation = "rainbow 3s infinite";

      // Add party CSS
      const style = document.createElement("style");
      style.textContent = `
        @keyframes rainbow { 0%{filter: hue-rotate(0deg)} 100%{filter: hue-rotate(360deg)} }
        @keyframes bounce { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
        @keyframes confetti { 0% { transform: translateY(-100vh) rotate(0deg) } 100% { transform: translateY(100vh) rotate(720deg) } }
        .easter-confetti { position: fixed; width: 10px; height: 10px; z-index: 9999; pointer-events: none; }
      `;
      document.head.appendChild(style);

      // Add confetti
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement("div");
          confetti.className = "easter-confetti";
          confetti.style.left = Math.random() * 100 + "vw";
          confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
          confetti.style.animation = `confetti ${2 + Math.random() * 3}s linear forwards`;
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 5000);
        }, i * 100);
      }

      // Add bouncing to main elements
      document.querySelectorAll("main > *").forEach((el) => {
        (el as HTMLElement).style.animation = "bounce 2s infinite";
      });

      setTimeout(
        () =>
          console.log(
            "%c🎊 Party habis! Ketik resetPage() untuk kembali normal.",
            "color: #26de81;"
          ),
        3000
      );
    };

    // Matrix Mode
    (window as any).matrixMode = () => {
      console.log(
        "%c💊 ENTERING THE MATRIX...",
        "color: #00ff00; font-size: 16px; background: #000;"
      );
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#00ff00";
      document.body.style.fontFamily = "monospace";

      // Add matrix rain effect
      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "-1";
      canvas.style.opacity = "0.3";
      document.body.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const matrix =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
      const drops: number[] = [];

      for (let x = 0; x < canvas.width / 10; x++) {
        drops[x] = 1;
      }

      const matrixInterval = setInterval(() => {
        if (!canvas.parentNode) {
          clearInterval(matrixInterval);
          return;
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = "10px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)];
          ctx.fillText(text, i * 10, drops[i] * 10);

          if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, 35);

      (window as any).matrixInterval = matrixInterval;
      console.log(
        "%c🔴 Matrix mode active! Ketik resetPage() untuk keluar.",
        "color: #ff0000; background: #000;"
      );
    };

    // Rotate World
    (window as any).rotateWorld = () => {
      console.log(
        "%c🌀 ROTATING THE WORLD!",
        "color: #ff6b6b; font-size: 16px;"
      );
      document.body.style.transform = "rotate(180deg)";
      document.body.style.transition = "transform 2s ease-in-out";
      setTimeout(() => {
        document.body.style.transform = "rotate(360deg)";
        setTimeout(() => {
          document.body.style.transform = "rotate(0deg)";
          console.log(
            "%c🎯 World rotated! Apakah kamu pusing?",
            "color: #26de81;"
          );
        }, 2000);
      }, 2000);
    };

    // Dark Mode
    (window as any).darkMode = () => {
      console.log(
        "%c🌙 DARK MODE ACTIVATED!",
        "color: #feca57; font-size: 16px;"
      );
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
      document.body.style.transition = "all 0.5s ease";

      // Invert images back to normal
      document.querySelectorAll("img").forEach((img) => {
        (img as HTMLElement).style.filter = "invert(1) hue-rotate(180deg)";
      });

      console.log(
        "%c🌟 Dark mode enabled! Lebih nyaman untuk mata ya?",
        "color: #45b7d1;"
      );
    };

    // Rainbow Mode
    (window as any).rainbowMode = () => {
      console.log(
        "%c🌈 RAINBOW MODE ACTIVATED!",
        "color: #ff6b6b; font-size: 16px;"
      );

      const style = document.createElement("style");
      style.textContent = `
        @keyframes rainbow-text { 0%{color: #ff0000} 16%{color: #ff8000} 33%{color: #ffff00} 50%{color: #00ff00} 66%{color: #0080ff} 83%{color: #8000ff} 100%{color: #ff0000} }
        @keyframes rainbow-bg { 0%{background: linear-gradient(45deg, #ff0000, #ff8000)} 25%{background: linear-gradient(45deg, #ffff00, #00ff00)} 50%{background: linear-gradient(45deg, #0080ff, #8000ff)} 75%{background: linear-gradient(45deg, #ff0080, #ff0000)} 100%{background: linear-gradient(45deg, #ff0000, #ff8000)} }
        .rainbow-text { animation: rainbow-text 2s infinite; }
        body.rainbow-mode { animation: rainbow-bg 5s infinite; }
      `;
      document.head.appendChild(style);

      document.body.classList.add("rainbow-mode");
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.classList.add("rainbow-text");
      });

      console.log(
        "%c🦄 Rainbow mode enabled! Dunia jadi penuh warna!",
        "color: #ff6b6b;"
      );
    };

    // Shake It
    (window as any).shakeIt = () => {
      console.log("%c📳 SHAKE IT BABY!", "color: #ff6b6b; font-size: 16px;");

      const style = document.createElement("style");
      style.textContent = `
        @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg) } 10% { transform: translate(-1px, -2px) rotate(-1deg) } 20% { transform: translate(-3px, 0px) rotate(1deg) } 30% { transform: translate(3px, 2px) rotate(0deg) } 40% { transform: translate(1px, -1px) rotate(1deg) } 50% { transform: translate(-1px, 2px) rotate(-1deg) } 60% { transform: translate(-3px, 1px) rotate(0deg) } 70% { transform: translate(3px, 1px) rotate(-1deg) } 80% { transform: translate(-1px, -1px) rotate(1deg) } 90% { transform: translate(1px, 2px) rotate(0deg) } 100% { transform: translate(1px, -2px) rotate(-1deg) } }
        .shake { animation: shake 0.5s infinite; }
      `;
      document.head.appendChild(style);

      document.body.classList.add("shake");

      setTimeout(() => {
        document.body.classList.remove("shake");
        console.log(
          "%c🎯 Shake selesai! Semoga nggak mual ya!",
          "color: #26de81;"
        );
      }, 3000);
    };

    // Float Elements
    (window as any).floatElements = () => {
      console.log(
        "%c🎈 MAKING ELEMENTS FLOAT!",
        "color: #ff6b6b; font-size: 16px;"
      );

      const style = document.createElement("style");
      style.textContent = `
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-20px) } 100% { transform: translateY(0px) } }
        .floating { animation: float 3s ease-in-out infinite; }
      `;
      document.head.appendChild(style);

      document
        .querySelectorAll("img, h1, h2, h3, button")
        .forEach((el, index) => {
          (el as HTMLElement).style.animationDelay = index * 0.2 + "s";
          el.classList.add("floating");
        });

      console.log(
        "%c☁️ Semua element sekarang mengambang! Seperti di luar angkasa!",
        "color: #45b7d1;"
      );
    };

    // Reset Page
    (window as any).resetPage = () => {
      console.log(
        "%c🔄 RESETTING PAGE TO NORMAL...",
        "color: #feca57; font-size: 16px;"
      );

      // Remove all added styles
      document.querySelectorAll("style").forEach((style) => {
        if (style.textContent?.includes("@keyframes")) {
          style.remove();
        }
      });

      // Remove canvas (matrix mode)
      document.querySelectorAll("canvas").forEach((canvas) => canvas.remove());

      // Clear intervals
      if ((window as any).matrixInterval) {
        clearInterval((window as any).matrixInterval);
      }

      // Reset body styles
      document.body.style.cssText = "";
      document.body.className = "";

      // Reset all elements
      document.querySelectorAll("*").forEach((el) => {
        (el as HTMLElement).style.animation = "";
        (el as HTMLElement).style.transform = "";
        (el as HTMLElement).style.filter = "";
        el.className = el.className
          .replace(/shake|floating|rainbow-text/g, "")
          .trim();
      });

      console.log(
        "%c✅ Page reset berhasil! Semuanya kembali normal.",
        "color: #26de81;"
      );
    };

    console.log(
      "%c💫 Pro tip: Ketik help() untuk melihat semua perintah tersembunyi!",
      "color: #a55eea; font-size: 11px; margin-top: 15px;"
    );
  }, []);

  return null; // This component doesn't render anything visible
}
