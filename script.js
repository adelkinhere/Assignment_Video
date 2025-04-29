        // Custom cursor
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        let player;
        let currentPath = 'intro';
        let previousPath = [];
        
        // *** REPLACE THESE IDS WITH YOUR YOUTUBE VIDEO IDS ***
        let videoIds = {
            'intro': 'Tpp795hUaBs',          // Replace with your intro video ID
            'choice1A': 'YOUTUBE_ID_FOR_CHOICE1A',    // Replace with your choice1A video ID
            'choice1B': 'Jb-PkjbAhiY',    // Replace with your choice1B video ID
            'choice2A': 'YOUTUBE_ID_FOR_CHOICE2A',    // Replace with your choice2A video ID
            'choice2B': 'YOUTUBE_ID_FOR_CHOICE2B'     // Replace with your choice2B video ID
        };
        
        // DOM Elements
        const choiceButtons1 = document.getElementById('choice-buttons-1');
        const choiceButtons2 = document.getElementById('choice-buttons-2');
        const navigationButtons = document.getElementById('navigation-buttons');
        const backBtn = document.getElementById('back-btn');
        const restartBtn = document.getElementById('restart-btn');

        // Initialize YouTube Player API - this automatically loads when the YouTube API script loads
        function onYouTubeIframeAPIReady() {
            // Create the YouTube player with the intro video
            player = new YT.Player('youtube-player', {
                // This is where we set the initial video to the intro
                videoId: videoIds.intro, 
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0,
                    'fs': 1,
                    'modestbranding': 1,
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            // Player is ready to receive commands
            console.log('YouTube player is ready');
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            // When video ends (state = 0)
            if (event.data === YT.PlayerState.ENDED) {
                if (currentPath === 'intro') {
                    choiceButtons1.style.display = 'flex';
                    navigationButtons.style.display = 'none';
                } else if (currentPath === 'choice1A') {
                    choiceButtons2.style.display = 'flex';
                    navigationButtons.style.display = 'flex';
                    restartBtn.style.display = 'none';
                } else if (currentPath === 'choice1B') {
                    choiceButtons2.style.display = 'none';
                    navigationButtons.style.display = 'flex';
                    restartBtn.style.display = 'none';
                } else if (currentPath.startsWith('choice2')) {
                    // End of story - show both back and restart buttons
                    navigationButtons.style.display = 'flex';
                    backBtn.style.display = 'block';
                    restartBtn.style.display = 'block';
                }
            }
        }

        function loadVideo(videoId) {
            // Store the current path for back navigation
            previousPath.push(currentPath);
            
            // Set current path based on videoId
            for (const [path, id] of Object.entries(videoIds)) {
                if (id === videoId) {
                    currentPath = path;
                    break;
                }
            }
            
            // Hide all choice buttons
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            
            // Load and play the new video
            player.loadVideoById(videoId);
            
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
                player.loadVideoById(videoIds[goBackTo]);
                
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
            player.loadVideoById(videoIds.intro);
            
            // Hide all buttons
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            navigationButtons.style.display = 'none';
        }

                // Team member data
                const teamMembers = [
                    {
                        name: "Aigerim Shakanova",
                        role: "Screenwriter",
                        image: "media/aigerim.png",
                        bio: "Alex Johnson is a passionate filmmaker whose work explores the intersection of traditional narrative and interactive media. After graduating from NYU's Tisch School of the Arts, Alex directed several award-winning short films before developing a keen interest in interactive storytelling."
                    },
                    {
                        name: "Adeliya Aitpayeva",
                        role: "Developer",
                        image: "media/adeliya.jpg",
                        bio: "Jamie Smith brings a distinctive visual style to every project, with a particular talent for creating evocative lighting setups that enhance emotional storytelling. A graduate of the American Film Institute, Jamie has shot music videos, commercials, and short films that have screened at festivals worldwide. Jamie's work is characterized by purposeful camera movement and a mastery of both digital and analog formats. For 'Prom?', Jamie embraced the challenge of ensuring visual continuity across multiple narrative branches while maintaining a cohesive aesthetic throughout."
                    },
                    {
                        name: "Ali Noor",
                        role: "Actor + Editor",
                        image: "media/ali.png",
                        bio: "Sam Rodriguez specializes in cutting-edge editing techniques that push the boundaries of conventional storytelling. With a background in both film and interactive media, Sam was uniquely qualified to tackle the complex editing demands of an interactive film. After working on several major studio productions as an assistant editor, Sam established a reputation for innovative approaches to pacing and rhythm. On 'Prom?', Sam developed a custom workflow to manage the multiple narrative branches and ensure seamless transitions between choice points, creating an immersive viewing experience."
                    },
                    {
                        name: "Linus Jiang",
                        role: "Cinematographer",
                        image: "media/linus.png",
                        bio: "Taylor Chen is an audio engineer and musician whose sound design creates immersive auditory experiences that elevate visual storytelling. With formal training in music composition and audio production, Taylor approaches film sound as both a technical and creative art form. Having worked on independent features and experimental short films, Taylor brought a wealth of experience to 'Prom?', designing distinctive soundscapes for each narrative branch while maintaining aural continuity. Taylor's innovative approach to interactive audio helps guide viewers through emotional shifts as they make choices throughout the film."
                    }
                ];
        
                // Team member interactive functionality
                function expandTeamMember(index) {
                    const member = teamMembers[index];
                    document.getElementById('expanded-image').src = member.image;
                    document.getElementById('expanded-name').textContent = member.name;
                    document.getElementById('expanded-role').textContent = member.role;
                    document.getElementById('expanded-bio').textContent = member.bio;
                    
                    document.getElementById('team-expanded').classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
        
                function closeExpandedView() {
                    document.getElementById('team-expanded').classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
        
                // Close modal if user clicks outside the content
                document.getElementById('team-expanded').addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeExpandedView();
                    }
                });
        
                // Add keyboard support for closing the modal
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeExpandedView();
                    }
                });