function showTip() {
    const tips = [
      "Always remove your makeup before sleeping!",
      "Use a primer for a smooth base.",
      "Clean your brushes regularly to avoid skin issues.",
      "Red lipstick suits every skin tone!",
      "Hydration is key for glowing skin!"
    ];
  
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    alert("💄 Beauty Tip: " + randomTip);
  }
  
