document.addEventListener('DOMContentLoaded', function() {
    // Card flip functionality
    const card = document.querySelector('.birthday-card');
    const openCardBtn = document.getElementById('openCard');
    
    openCardBtn.addEventListener('click', function() {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            createConfetti();
        }
    });
    
    // Add wish functionality
    const addWishBtn = document.getElementById('add-wish');
    const wishesList = document.getElementById('wishes-list');
    
    addWishBtn.addEventListener('click', function() {
        const newWish = prompt('Add a wish for your love:');
        if (newWish) {
            const li = document.createElement('li');
            li.textContent = newWish;
            li.style.animation = 'fadeIn 0.5s';
            
            // Add random color to the wish
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            li.style.backgroundColor = randomColor + '20'; // Add transparency
            
            wishesList.appendChild(li);
            
            // Create a small confetti effect for the new wish
            createConfettiAtElement(li);
        }
    });
    
    // Create floating balloons
    function createBalloons() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a29bfe'];
        const container = document.body;
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.classList.add('balloon');
                
                // Random color
                const color = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.backgroundColor = color;
                
                // Random size
                const size = 50 + Math.random() * 50;
                balloon.style.width = size + 'px';
                balloon.style.height = size * 1.1 + 'px';
                
                // Random position
                const leftPos = Math.random() * 100;
                balloon.style.left = leftPos + '%';
                
                // Random animation duration
                const duration = 10 + Math.random() * 20;
                balloon.style.animationDuration = duration + 's';
                
                container.appendChild(balloon);
                
                // Remove balloon after animation completes
                setTimeout(() => {
                    balloon.remove();
                }, duration * 1000);
            }, i * 1000); // Create a new balloon every second
        }
    }
    
    // Confetti effect
    function createConfetti() {
        const confettiContainer = document.getElementById('confettiContainer');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a29bfe'];
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Random color
                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = color;
                
                // Random size
                const size = 5 + Math.random() * 10;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                // Random position
                const leftPos = Math.random() * 100;
                confetti.style.left = leftPos + '%';
                
                // Random animation duration and delay
                const duration = 3 + Math.random() * 4;
                confetti.style.animationDuration = duration + 's';
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation completes
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }, i * 20); // Stagger the confetti creation
        }
    }
    
    // Create confetti at a specific element
    function createConfettiAtElement(element) {
        const rect = element.getBoundingClientRect();
        const confettiContainer = document.getElementById('confettiContainer');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            
            // Random size
            const size = 5 + Math.random() * 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Position near the element
            confetti.style.left = (rect.left + rect.width/2 + Math.random() * 50 - 25) + 'px';
            confetti.style.top = (rect.top + rect.height/2) + 'px';
            
            // Random animation duration
            const duration = 1 + Math.random() * 2;
            confetti.style.animationDuration = duration + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
    
    // Initialize the page with balloons
    createBalloons();
    
    // Add some interactivity to the gallery images
    const galleryImages = document.querySelectorAll('.photo-container img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create a temporary larger view of the image
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            overlay.style.cursor = 'pointer';
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.borderRadius = '10px';
            enlargedImg.style.boxShadow = '0 0 30px rgba(255,255,255,0.5)';
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });
    
    // Add a little animation to list items on hover
    const wishItems = document.querySelectorAll('#wishes-list li');
    wishItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Add click animation to the wishes container
    const wishesContainer = document.querySelector('.wishes-container');
    wishesContainer.addEventListener('click', function(e) {
        if (e.target !== addWishBtn) {
            createConfettiAtElement(wishesContainer);
        }
    });
    
    // Countdown timer for special events
    function updateCountdown() {
        // Set the date for the next birthday (November 26)
        const today = new Date();
        let nextBirthday = new Date(today.getFullYear(), 10, 26); // Month is 0-indexed, so 10 = November
        
        // If this year's birthday has already passed, set to next year
        if (nextBirthday < today) {
            nextBirthday = new Date(today.getFullYear() + 1, 10, 26);
        }
        
        const diff = nextBirthday - today;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // If it's his birthday today!
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Add special message for birthday day
            if (today.getDate() === 26 && today.getMonth() === 10) {
                const countdownTitle = document.querySelector('.countdown h3');
                countdownTitle.textContent = 'Happy Birthday Today!';
                countdownTitle.style.color = '#ff6b6b';
                countdownTitle.style.fontSize = '2rem';
                
                // Create extra confetti for birthday
                for (let i = 0; i < 100; i++) {
                    setTimeout(() => {
                        createConfetti();
                    }, i * 50);
                }
            }
        }
    }
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Add a special effect when clicking on the header
    const header = document.querySelector('.header h1');
    header.addEventListener('click', function() {
        createConfettiAtElement(this);
        
        // Add a little animation to the header
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Music player functionality
    const audio = document.getElementById('birthday-song');
    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    
    playBtn.addEventListener('click', function() {
        audio.play();
        createConfettiAtElement(playBtn);
    });
    
    pauseBtn.addEventListener('click', function() {
        audio.pause();
        createConfettiAtElement(pauseBtn);
    });
    
    // Add special effect when music starts playing
    audio.addEventListener('play', function() {
        // Create a wave of confetti when music starts
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 100);
        }
    });
    
    // Special interaction counter for surprise effect
    let interactionCount = 0;
    const maxInteractions = 7;
    
    // Elements that count as interactions for the surprise
    const interactiveElements = [
        document.querySelector('.header h1'),
        document.getElementById('openCard'),
        document.getElementById('add-wish'),
        document.getElementById('play-music'),
        document.getElementById('pause-music'),
        ...document.querySelectorAll('.photo-container img'),
        ...document.querySelectorAll('#wishes-list li')
    ];
    
    interactiveElements.forEach(element => {
        if (element) {
            element.addEventListener('click', function() {
                interactionCount++;
                
                // Create confetti for each interaction
                createConfettiAtElement(this);
                
                // Check if we've reached the special interaction count
                if (interactionCount >= maxInteractions) {
                    triggerSpecialSurprise();
                    interactionCount = 0; // Reset counter after surprise
                }
            });
        }
    });
    
    // Function to trigger the special surprise
    function triggerSpecialSurprise() {
        // Create an extra special confetti effect
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 20);
        }
        
        // Change background temporarily
        document.body.style.transition = 'background 1s';
        document.body.style.background = 'radial-gradient(circle, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #8000ff, #ff00ff)';
        
        // Show a special message
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = '🎉 LOVE YOU SO MUCH! 🎉<br>Happy Birthday Again! 🎂';
        specialMessage.style.position = 'fixed';
        specialMessage.style.top = '50%';
        specialMessage.style.left = '50%';
        specialMessage.style.transform = 'translate(-50%, -50%)';
        specialMessage.style.fontSize = '2rem';
        specialMessage.style.color = 'white';
        specialMessage.style.fontWeight = 'bold';
        specialMessage.style.textAlign = 'center';
        specialMessage.style.zIndex = '1000';
        specialMessage.style.textShadow = '2px 2px 4px rgba(0,0,0,0.7)';
        specialMessage.style.pointerEvents = 'none';
        specialMessage.style.animation = 'fadeInOut 3s forwards';
        
        // Add animation for the special message
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(specialMessage);
        
        // Remove the special message after animation
        setTimeout(() => {
            document.body.removeChild(specialMessage);
            // Remove the style element as well
            document.head.removeChild(style);
            
            // Restore original background
            document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
        }, 3000);
    }
    
    // Add subtle background animation
    let hue = 0;
    function animateBackground() {
        hue = (hue + 0.1) % 360;
        document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 80%), hsl(${(hue + 40) % 360}, 100%, 80%))`;
        requestAnimationFrame(animateBackground);
    }
    
    // Uncomment the next line if you want a subtle animated background
    // animateBackground();
});