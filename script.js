document.addEventListener('DOMContentLoaded', function() {
    
    // Add promise functionality
    const addPromiseBtn = document.getElementById('add-promise');
    const promisesList = document.getElementById('promises-list');
    
    addPromiseBtn.addEventListener('click', function() {
        const newPromise = prompt('Add a friendship promise:');
        if (newPromise) {
            const li = document.createElement('li');
            li.textContent = newPromise;
            
            // Add random gradient to the promise
            const gradients = [
                'linear-gradient(45deg, #ffb6c1, #87cefa)',
                'linear-gradient(45deg, #ff6b6b, #45b7d1)',
                'linear-gradient(45deg, #96ceb4, #ffe1a8)',
                'linear-gradient(45deg, #feca57, #ff9ff3)',
                'linear-gradient(45deg, #a29bfe, #fd79a8)',
                'linear-gradient(45deg, #fd79a8, #fdcb6e)'
            ];
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
            li.style.background = randomGradient;
            
            promisesList.appendChild(li);
            
            // Create a small confetti effect for the new promise
            createConfettiAtElement(li);
        }
    });
    
    // Random quote functionality
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote');
    
    // Function to fetch a random quote from an API
    async function fetchRandomQuote() {
        try {
            // Using a fallback quote in case the API call fails
            const fallbackQuotes = [
                { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
                { text: "Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" },
                { text: "True friendship comes when silence between two people is comfortable.", author: "David Tyson Gentry" },
                { text: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" },
                { text: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson" },
                { text: "The best of friends must part, but a true friendship never ends.", author: "Unknown" },
                { text: "In the sweetness of friendship let there be laughter, and sharing of pleasures. For in the dew of little things the heart finds its morning and is refreshed.", author: "Khalil Gibran" },
                { text: "A friend is what the heart needs all the time.", author: "Henry Van Dyke" }
            ];
            
            // Try to fetch from an API first
            const response = await fetch('https://type.fit/api/quotes');
            if (response.ok) {
                const quotes = await response.json();
                // Filter for friendship/love related quotes
                const friendshipQuotes = quotes.filter(quote => 
                    quote.text.toLowerCase().includes('friend') || 
                    quote.text.toLowerCase().includes('love') ||
                    quote.text.toLowerCase().includes('relationship') ||
                    quote.text.toLowerCase().includes('heart') ||
                    quote.text.toLowerCase().includes('best friend')
                );
                
                let selectedQuote;
                if (friendshipQuotes.length > 0) {
                    selectedQuote = friendshipQuotes[Math.floor(Math.random() * friendshipQuotes.length)];
                } else {
                    selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
                }
                
                quoteText.textContent = `"${selectedQuote.text}"`;
                quoteAuthor.textContent = `- ${selectedQuote.author}`;
            } else {
                // Use fallback quotes if API fails
                const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                quoteText.textContent = `"${randomQuote.text}"`;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
            }
        } catch (error) {
            // If API fails completely, use fallback quotes
            const fallbackQuotes = [
                { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
                { text: "Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" },
                { text: "True friendship comes when silence between two people is comfortable.", author: "David Tyson Gentry" },
                { text: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" }
            ];
            
            const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            quoteText.textContent = `"${randomQuote.text}"`;
            quoteAuthor.textContent = `- ${randomQuote.author}`;
        }
    }
    
    // Initialize with a random quote
    fetchRandomQuote();
    
    // Add event listener to the new quote button
    newQuoteBtn.addEventListener('click', fetchRandomQuote);
    
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
    
    // Add some interactivity to the cute elements
    const cuteItems = document.querySelectorAll('.cute-item');
    cuteItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create a kiss animation effect
            createKissEffect(item);
        });
    });
    
    // Function to create kiss effect
    function createKissEffect(element) {
        const rect = element.getBoundingClientRect();
        const confettiContainer = document.getElementById('confettiContainer');
        
        for (let i = 0; i < 15; i++) {
            const kiss = document.createElement('div');
            kiss.textContent = '💋';
            kiss.style.position = 'fixed';
            kiss.style.fontSize = '1.5rem';
            kiss.style.left = (rect.left + rect.width/2) + 'px';
            kiss.style.top = (rect.top + rect.height/2) + 'px';
            kiss.style.pointerEvents = 'none';
            kiss.style.zIndex = '1000';
            kiss.style.opacity = '1';
            
            // Random movement
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            const duration = 1 + Math.random() * 1;
            
            kiss.style.transition = `all ${duration}s ease-out`;
            
            confettiContainer.appendChild(kiss);
            
            // Animate
            setTimeout(() => {
                kiss.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                kiss.style.opacity = '0';
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                if (kiss.parentNode) {
                    kiss.parentNode.removeChild(kiss);
                }
            }, duration * 1000);
        }
    }
    
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
        document.getElementById('add-promise'),
        document.getElementById('new-quote'),
        document.getElementById('add-wish'),
        document.getElementById('play-music'),
        document.getElementById('pause-music'),
        ...document.querySelectorAll('.cute-item'),
        ...document.querySelectorAll('#wishes-list li'),
        ...document.querySelectorAll('#promises-list li')
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
        specialMessage.innerHTML = '🎉 BESTIE M, YOU\'RE AMAZING! 🎉<br>Happy Birthday Again! 🎂';
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