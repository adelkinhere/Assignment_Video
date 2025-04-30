        // creating custom cursor
        const cursor = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        let player;
        let currentPath = 'intro';
        let previousPath = [];
        
        // video IDs linking to youtube videos
        let videoIds = {
            'intro': 'Tpp795hUaBs',       
            'choice1A': 'Ft0XApLsZ8g',   
            'choice1B': 'Jb-PkjbAhiY',  
            'choice2A': '9L62ehS6KWw',  
            'choice2B': 'sG-BF1i0uAE' 
        };
        
        // decision elements
        const choiceButtons1 = document.getElementById('choice-buttons-1');
        const choiceButtons2 = document.getElementById('choice-buttons-2');
        const navigationButtons = document.getElementById('navigation-buttons');
        const backBtn = document.getElementById('back-btn');
        const restartBtn = document.getElementById('restart-btn');

        // initializing YouTube Player API 
        function onYouTubeIframeAPIReady() {
            // creating the YouTube player with the intro video
            player = new YT.Player('youtube-player', {
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
            // ensuring video player is ready to receive commands
            console.log('YouTube player is ready');
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            // when video ends (state = 0)
            if (event.data === YT.PlayerState.ENDED) {
                if (currentPath === 'intro') {
                    choiceButtons1.style.display = 'flex'; // choice 1 buttons appear
                    navigationButtons.style.display = 'none';
                } else if (currentPath === 'choice1A') {
                    choiceButtons2.style.display = 'flex'; // choice 2 buttons appear
                    navigationButtons.style.display = 'flex'; // going back button appears
                    restartBtn.style.display = 'none';
                } else if (currentPath === 'choice1B') {
                    choiceButtons2.style.display = 'none';
                    navigationButtons.style.display = 'flex'; // going back button appears
                    restartBtn.style.display = 'none';
                } else if (currentPath.startsWith('choice2')) {
                    // end of story
                    navigationButtons.style.display = 'flex';
                    backBtn.style.display = 'block'; // going back button appears
                    restartBtn.style.display = 'block'; // restart button appears
                }
            }
        }

        function loadVideo(videoId) {
            // storing the current path for back navigation
            previousPath.push(currentPath);
            
            // setting current path based on videoId
            for (const [path, id] of Object.entries(videoIds)) {
                if (id === videoId) {
                    currentPath = path;
                    break;
                }
            }
            
            // hiding all choice buttons initially
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            
            // loading and playing the new video
            player.loadVideoById(videoId);
            
            navigationButtons.style.display = 'flex';
            backBtn.style.display = 'block';
            restartBtn.style.display = 'none';
        }

        function goBack() {
            if (previousPath.length > 0) {
                // getting the previous path
                const goBackTo = previousPath.pop();
                currentPath = goBackTo;
                
                // loading previous video
                player.loadVideoById(videoIds[goBackTo]);
                
                // hiding all choice buttons
                choiceButtons1.style.display = 'none';
                choiceButtons2.style.display = 'none';
                
                // hiding restart button
                restartBtn.style.display = 'none';
                
                // hiding navigation buttons completely if we're at intro
                if (goBackTo === 'intro') {
                    navigationButtons.style.display = 'none';
                }
            }
        }

        function restartFilm() {
            // resetting to intro video
            currentPath = 'intro';
            previousPath = [];
            
            player.loadVideoById(videoIds.intro);
            
            // hiding all buttons
            choiceButtons1.style.display = 'none';
            choiceButtons2.style.display = 'none';
            navigationButtons.style.display = 'none';
        }

                // team member data
                const teamMembers = [
                    {
                        name: "Aigerim Shakanova",
                        role: "Screenwriter",
                        image: "media/aigerim.png",
                        bio: "First-year student at NYU Abu Dhabi, originally from Kazakhstan. With a passion for creativity and cultural expression, she enjoys spending her free time baking and dancing. Whether experimenting with new dessert recipes or exploring traditional Kazakh music and movement, she brings warmth and enthusiasm to every project she’s involved in. Her interest in storytelling and visual media inspired her role as the screenwriter for this project."
                    },
                    {
                        name: "Adeliya Aitpayeva",
                        role: "Developer",
                        image: "media/adeliya.jpg",
                        bio: "First-year student at NYU Abu Dhabi, originally from Kazakhstan, majoring in Interactive Media. With a strong interest in storytelling through technology and design, she explores how digital tools can enhance creative expression. Outside the classroom, she enjoys dancing across a wide range of genres—from hip hop to traditional Kazakh dance—bringing both energy and cultural depth to her performances."
                    },
                    {
                        name: "Ali Noor",
                        role: "Actor + Editor",
                        image: "media/ali.png",
                        bio: "Junior at NYU Abu Dhabi, majoring in Computer Engineering and Interactive Media. With a passion for bridging creativity and technology, he explores the intersection of art and robotics through hands-on projects and experimental design. His work often blends technical precision with artistic curiosity, resulting in unique creations that are both functional and expressive."
                    },
                    {
                        name: "Linus Jiang",
                        role: "Cinematographer",
                        image: "media/linus.png",
                        bio: "Sophomore at NYU Abu Dhabi majoring in Interactive Media, with a strong interest in visual storytelling and filmmaking. As the project’s cinematographer, he demonstrated a sharp eye for framing, lighting, and movement, capturing scenes with clarity and emotional nuance. His technical skill behind the camera and creative instincts played a key role in shaping the tone and pacing of the visual narrative."
                    }
                ];
        
                // team member interactive functionality (expanding profiles)
                function expandTeamMember(index) {
                    const member = teamMembers[index];
                    document.getElementById('expanded-image').src = member.image;
                    document.getElementById('expanded-name').textContent = member.name;
                    document.getElementById('expanded-role').textContent = member.role;
                    document.getElementById('expanded-bio').textContent = member.bio;
                    
                    document.getElementById('team-expanded').classList.add('active');
                    document.body.style.overflow = 'hidden'; // preventing scrolling when modal is open
                }
        
                function closeExpandedView() {
                    document.getElementById('team-expanded').classList.remove('active');
                    document.body.style.overflow = ''; // re-enabling scrolling
                }
        
                // closing modal if user clicks outside the content
                document.getElementById('team-expanded').addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeExpandedView();
                    }
                });
        
                // adding keyboard support for closing the modal
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeExpandedView();
                    }
                });