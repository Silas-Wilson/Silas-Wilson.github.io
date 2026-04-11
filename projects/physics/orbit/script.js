import { Vector2 } from "../collisions/vector.js";
import { Particle } from "../collisions/particle.js";

const canvas = document.getElementById("canvas");
canvas.style.background = "rgb(255, 255, 255)"
const ctx = canvas.getContext("2d");

const width = 800;
const height = 800;
const screenCenter = new Vector2(width / 2, height / 2);

canvas.width = width;
canvas.height = height;

const G = 70;

let planets = []
function spawnPlanet(spawnPosition, spawnVelocity, mass)
{
    planets.push(new Particle(spawnPosition, spawnVelocity, mass, "rgb(187, 0, 0)"))
}

spawnPlanet(screenCenter.add(new Vector2(300, 0)), new Vector2(0, 0 - 5), 0.4); //vy = -5
spawnPlanet(screenCenter.add(new Vector2(323, 0)), new Vector2(0, 1.6 - 5), 0.01);

spawnPlanet(screenCenter.add(new Vector2(200, 0)), new Vector2(0, 6), 0.2);
spawnPlanet(screenCenter.add(new Vector2(100, 0)), new Vector2(0, -8), 0.1);
spawnPlanet(screenCenter, new Vector2(-0.05, 0.05), 50);

main();

function main()
{
    function loop()
    {
        //Physics
        
        for (let i = 0; i < planets.length; i++)
        {
            const p1 = planets.at(i);

            for (let j = 0; j < planets.length; j++)
            {
                if (i == j) continue;

                const p2 = planets.at(j);

                const distance = p2.position.subtract(p1.position).magnitude();
                const direction = p2.position.subtract(p1.position).normalized();
                const forceOnP1 = direction.scale( (G * p1.mass * p2.mass) / (distance**2) );
                const forceOnP2 = forceOnP1.scale(-1);

                p1.velocity = p1.velocity.add(forceOnP1.scale(1 / p1.mass));
                p2.velocity = p2.velocity.add(forceOnP2.scale(1 / p2.mass));
            }

            p1.update();
        }

        //rendering
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        planets.forEach(p => {p.draw(ctx)});

        requestAnimationFrame(loop);
    }

    loop();
}