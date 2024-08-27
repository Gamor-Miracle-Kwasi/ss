        class CelestialBody {
            constructor(name, color, size, orbit, speed, texture) {
                this.name = name;
                this.color = color;
                this.size = size;
                this.orbit = orbit;
                this.speed = speed;
                this.texture = texture;
                this.angle = Math.random() * Math.PI * 2;
                this.element = null;
                this.labelElement = null;
            }

            create(container) {
                if (this.orbit > 0) {
                    const orbit = document.createElement('div');
                    orbit.className = 'orbit';
                    orbit.style.width = `${this.orbit * 2}px`;
                    orbit.style.height = `${this.orbit * 2}px`;
                    container.appendChild(orbit);
                }

                this.element = document.createElement('div');
                this.element.className = this.orbit === 0 ? 'sun' : 'planet';
                this.element.style.width = `${this.size}px`;
                this.element.style.height = `${this.size}px`;
                if (this.orbit > 0) {
                    this.element.style.background = this.texture;
                    this.element.style.boxShadow = `inset -2px -2px 8px rgba(0,0,0,0.5), 0 0 5px ${this.color}`;
                }
                container.appendChild(this.element);

                if (this.orbit > 0) {
                    this.labelElement = document.createElement('div');
                    this.labelElement.className = 'label';
                    this.labelElement.textContent = this.name;
                    container.appendChild(this.labelElement);
                }

                this.update();
            }

            update() {
                if (this.orbit > 0) {
                    const x = Math.cos(this.angle) * this.orbit;
                    const y = Math.sin(this.angle) * this.orbit;
                    this.element.style.left = `calc(50% + ${x}px)`;
                    this.element.style.top = `calc(50% + ${y}px)`;
                    this.labelElement.style.left = `calc(50% + ${x}px)`;
                    this.labelElement.style.top = `calc(50% + ${y + this.size/2 + 10}px)`;
                }
            }

            move(speedFactor) {
                if (this.orbit > 0) {
                    this.angle += this.speed * speedFactor;
                    this.update();
                }
            }
        }

        class SolarSystem {
            constructor() {
                this.bodies = [
                    new CelestialBody('Sun', 'var(--sun-color)', 90, 0, 0, ''),
                    new CelestialBody('Mercury', 'var(--mercury-color)', 15, 120, 0.02, 'radial-gradient(circle at 30% 30%, #A97450 0%, #8C7853 50%, #5C4033 100%)'),
                    new CelestialBody('Venus', 'var(--venus-color)', 25, 170, 0.015, 'radial-gradient(circle at 30% 30%, #FFA500 0%, #FF8C00 50%, #FF4500 100%)'),
                    new CelestialBody('Earth', 'var(--earth-color)', 28, 220, 0.01, 'radial-gradient(circle at 30% 30%, #4169E1 0%, #1E90FF 50%, #000080 100%)'),
                    new CelestialBody('Mars', 'var(--mars-color)', 20, 270, 0.008, 'radial-gradient(circle at 30% 30%, #FF6347 0%, #FF4500 50%, #8B0000 100%)'),
                    new CelestialBody('Jupiter', 'var(--jupiter-color)', 60, 340, 0.002, 'radial-gradient(circle at 30% 30%, #DEB887 0%, #CD853F 50%, #8B4513 100%)'),
                    new CelestialBody('Saturn', 'var(--saturn-color)', 55, 410, 0.0009, 'radial-gradient(circle at 30% 30%, #F4C542 0%, #E6BE8A 50%, #C5A26E 100%)'),
                    new CelestialBody('Uranus', 'var(--uranus-color)', 35, 470, 0.0004, 'radial-gradient(circle at 30% 30%, #4FD0E7 0%, #3AA8C1 50%, #2C7A8E 100%)'),
                    new CelestialBody('Neptune', 'var(--neptune-color)', 33, 520, 0.0001, 'radial-gradient(circle at 30% 30%, #4B70DD 0%, #3A5BB1 50%, #2A417F 100%)')
                ];
                this.container = document.getElementById('solarSystem');
                this.speedFactor = 1;
                this.isPlaying = true;
                this.initControls();
            }

            init() {
                this.bodies.forEach(body => body.create(this.container));
                this.animate();
            }

            animate() {
                if (this.isPlaying) {
                    this.bodies.forEach(body => body.move(this.speedFactor));
                }
                requestAnimationFrame(() => this.animate());
            }

            initControls() {
                const pausePlay = document.getElementById('pausePlay');
                const speedUp = document.getElementById('speedUp');
                const slowDown = document.getElementById('slowDown');

                pausePlay.addEventListener('click', () => {
                    this.isPlaying = !this.isPlaying;
                    pausePlay.textContent = this.isPlaying ? 'Pause' : 'Play';
                });

                speedUp.addEventListener('click', () => {
                    this.speedFactor *= 1.5;
                });

                slowDown.addEventListener('click', () => {
                    this.speedFactor /= 1.5;
                });
            }
        }

        const solarSystem = new SolarSystem();
        solarSystem.init();