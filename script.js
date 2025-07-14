document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader after 2s
    setTimeout(() => document.getElementById('loader').style.display = 'none', 2000);

    // Starfield Canvas
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1
        });
    }
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.x -= star.speed; // Move left for parallax
            if (star.x < 0) star.x = canvas.width;
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // Lightsaber Sound (Optional)
    const saberSound = document.getElementById('saber-sound');
    document.getElementById('lightsaber-nav').addEventListener('mouseover', () => saberSound.play());

    // Hyperspace Jump on Nav Clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('hyperspace');
            setTimeout(() => {
                window.location.href = link.href;
                document.body.classList.remove('hyperspace');
            }, 1000);
        });
    });

    // Force Quote Generator
    const quotes = [
        'May the Force be with you.',
        'I am one with the Force.',
        'Do or do not, there is no try.',
        'These aren\'t the droids you\'re looking for.'
    ];
    document.getElementById('force-quote').addEventListener('click', () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('force-quote').textContent = randomQuote;
    });

    // 3D TIE Fighter with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000); // Height fixed at 500px
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 500);
    document.getElementById('tie-fighter-container').appendChild(renderer.domElement);

    // Simple TIE Fighter geometry (box wings + sphere body)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: true });
    const tie = new THREE.Mesh(geometry, material);
    scene.add(tie);

    // Wings
    const wingGeo = new THREE.BoxGeometry(2, 0.1, 3);
    const leftWing = new THREE.Mesh(wingGeo, material);
    leftWing.position.set(-2, 0, 0);
    tie.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeo, material);
    rightWing.position.set(2, 0, 0);
    tie.add(rightWing);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        tie.rotation.y += 0.01; // Spin
        renderer.render(scene, camera);
    }
    animate();

    // Explode on Click
    tie.userData = { exploded: false };
    renderer.domElement.addEventListener('click', () => {
        if (!tie.userData.exploded) {
            // "Explode" by scaling and fading
            tie.scale.set(2, 2, 2);
            tie.material.opacity = 0.5;
            setTimeout(() => {
                // Reveal project details (e.g., alert or DOM update)
                alert('Current Build: TIE Fighter Replica - In progress with 3D printing and electronics.');
                tie.scale.set(1, 1, 1);
                tie.material.opacity = 1;
            }, 1000);
            tie.userData.exploded = true;
        }
    });
});