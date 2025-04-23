window.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    const numStars = 1000;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position and size
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;

        star.style.top = `${y}px`;
        star.style.left = `${x}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random twinkle speed
        const twinkleSpeed = Math.random() * 2 + 1;
        star.style.animationDuration = `${twinkleSpeed}s`;

        body.appendChild(star);
    }

    // Move stars with mouse movement
    window.addEventListener('mousemove', function (event) {
        const stars = document.querySelectorAll('.star');

        stars.forEach(function (star) {
            const x = event.clientX / window.innerWidth * 100;
            const y = event.clientY / window.innerHeight * 100;

            // Increase the movement speed and intensity
            star.style.transform = `translate(${x * 2}%, ${y * 2}%)`;
        });
    });
});