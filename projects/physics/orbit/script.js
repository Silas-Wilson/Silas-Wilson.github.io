import { Particle } from "../collisions/particle.js";
import { Presets } from "./presets.js";

const canvas = document.getElementById("canvas");
canvas.style.background = "rgb(0, 0, 0)"
const ctx = canvas.getContext("2d");

export const width = 1500;
export const height = 1500;

canvas.width = width;
canvas.height = height;

const G = 1;

let planets = []
function spawnPlanet(spawnPosition, spawnVelocity, mass, radius, color = "rgb(108, 164, 255)")
{
    planets.push(new Particle(spawnPosition, spawnVelocity, mass, radius, color))
}

function loadPreset(preset)
{
    for (let i = 0; i < preset.length; i++)
    {
        spawnPlanet(preset[i].spawnPosition, preset[i].spawnVelocity, preset[i].mass, preset[i].radius, preset[i].color)
    }
}

loadPreset(Presets.solarSystem);

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