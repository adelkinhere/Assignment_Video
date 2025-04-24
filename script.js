        // Custom cursor
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Video navigation system
        const videoPlayer = document.getElementById('video-player');
        const choiceButtons1 = document.getElementById('choice-buttons-1');
        const choiceButtons2 = document.getElementById('choice-buttons-2');
        const navigationButtons = document.getElementById('navigation-buttons');
        const backBtn = document.getElementById('back-btn');
        const restartBtn = document.getElementById('restart-btn');
        
        let currentPath = 'intro';
        let previousPath = [];

        videoPlayer.addEventListener('ended', function() {
            if (currentPath === 'intro') {
                choiceButtons1.style.display = 'flex';
                navigationButtons.style.display = 'none';
            } else if (currentPath === 'choice1A' || currentPath === 'choice1B') {
                choiceButtons2.style.display = 'flex';
                navigationButtons.style.display = 'flex';
                restartBtn.style.display = 'none';
            } else if (currentPath.startsWith('choice2')) {
                // End of story - show both back and restart buttons
                navigationButtons.style.display = 'flex';
                backBtn.style.display = 'block';
                restartBtn.style.display = 'block';
            }
        });

        function loadVideo(src, choiceLevel) {
            // Store the current path for back navigation
            previousPath.push(currentPath);
            
            // Extract path name from src
            currentPath = src.replace('media/', '').replace('.mp4', '');
            
            // Hide all choice buttons
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            
            // Load and play the new video
            videoPlayer.src = src;
            videoPlayer.load();
            videoPlayer.play();
            
            // Show navigation buttons container but only show back button (restart only appears at the end)
            navigationButtons.style.display = 'flex';
            backBtn.style.display = 'block';
            restartBtn.style.display = 'none';
        }

        function goBack() {
            if (previousPath.length > 0) {
                // Get the previous path
                const goBackTo = previousPath.pop();
                currentPath = goBackTo;
                
                // Load previous video
                videoPlayer.src = `media/${goBackTo}.mp4`;
                videoPlayer.load();
                videoPlayer.play();
                
                // Hide all choice buttons
                choiceButtons1.style.display = 'none';
                choiceButtons2.style.display = 'none';
                
                // Hide restart button
                restartBtn.style.display = 'none';
                
                // Hide navigation buttons completely if we're at intro
                if (goBackTo === 'intro') {
                    navigationButtons.style.display = 'none';
                }
            }
        }

        function restartFilm() {
            // Reset to intro video
            currentPath = 'intro';
            previousPath = [];
            
            // Load intro video
            videoPlayer.src = 'media/intro.mp4';
            videoPlayer.load();
            videoPlayer.play();
            
            // Hide all buttons
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            navigationButtons.style.display = 'none';
        }