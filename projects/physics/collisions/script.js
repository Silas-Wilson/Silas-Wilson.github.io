import { Vector2 } from "./vector.js";
import { Particle } from "./particle.js";
import { InputState } from "./inputHandler.js"

const canvas = document.getElementById("canvas");
canvas.style.background = "rgb(255, 255, 255)"
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;

let particles = []
function spawnParticle(spawnPosition, spawnVelocity, mass)
{
    particles.push(new Particle(spawnPosition, spawnVelocity, mass, 10 * Math.cbrt(mass), "rgb(187, 0, 0)"))
}

const maxGravity = 0.2;
function loop()
{
    //Spawning Particles
    if (InputState.mouseDown)
    {
        spawnParticle(new Vector2(InputState.mousePositionX, InputState.mousePositionY), new Vector2(0,0), 5);
        InputState.mouseDown = false;
    }
    if (InputState.mouseUp)
    {
        const releasedParticle = particles.at(-1);
        const initialVelocity = new Vector2(InputState.mousePositionX - releasedParticle.position.x, InputState.mousePositionY - releasedParticle.position.y).scale(0.01);

        releasedParticle.isSimulated = true;
        releasedParticle.velocity = initialVelocity;

        InputState.mouseUp = false;
    }

    //Rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => 
        {
            p.vectorScale = InputState.vectorScale;
            p.isVectorVisible = InputState.isVectorsVisible;
            p.draw(ctx, InputState.isVectorsVisible, InputState.vectorScale)
        });

    if (InputState.isPaused)
    {
        requestAnimationFrame(loop); //Do not simulate physics when paused
        return; 
    }

    //Collision
    let elasticity = 1 * InputState.elasticity;
    for (let i = 0; i < particles.length; i++)
    {
        let p = particles[i];
        console.log(!p.isSimulated);
        if (!p.isSimulated) {continue;}

        //Apply Gravity
        p.velocity.y += maxGravity * InputState.gravityStrength;

        //Wall Collisions
        if (p.position.y + p.radius > canvas.height)
        {
            p.position.y = canvas.height - p.radius;
            p.velocity.y *= -1 * elasticity;
        }
        if (p.position.y - p.radius < 0)
        {
            p.position.y = p.radius;
            p.velocity.y *= -1 * elasticity;
        }
        if (p.position.x + p.radius > canvas.width)
        {
            p.position.x = canvas.width - p.radius;
            p.velocity.x *= -1 * elasticity;
        }
        if (p.position.x - p.radius < 0)
        {
            p.position.x = p.radius;
            p.velocity.x *= -1 * elasticity;
        }

        //Ball Collisions
        for (let j = i + 1; j < particles.length; j++)
        {
            let p2 = particles[j];
            if (!p2.isSimulated) {continue;}

            let positionDifference = p2.position.subtract(p.position);
            let distance = positionDifference.magnitude(); //sqrt
            let overlap = (p.radius + p2.radius) - distance;

            if (overlap >= 0)
            {
                let cv = positionDifference.normalized(); //sqrt

                //OVERLAP CORRECTION DOES NOT WORK WELL FOR PARTICLES WITH LARGELY DIFFERENT MASSES
                const p1Offset = cv.scale(overlap * 0.5);// * (p.mass / p2.mass));
                const p2Offset = cv.scale(overlap).subtract(p1Offset);

                p.position = p.position.subtract(p1Offset);
                p2.position = p2.position.add(p2Offset);

                let v1normal = positionDifference.scale(positionDifference.dot(p.velocity)).scale(1 / positionDifference.dot(positionDifference));
                let v2normal = positionDifference.scale(positionDifference.dot(p2.velocity)).scale(1 / positionDifference.dot(positionDifference));

                p.velocity = p.velocity.add((v2normal.subtract(v1normal)).scale( (1 + elasticity)*(p2.mass) / (p.mass + p2.mass) ));
                p2.velocity = p2.velocity.add((v1normal.subtract(v2normal)).scale( (1 + elasticity)*(p.mass) / (p2.mass + p.mass) ));
            }
        }
    }
    particles.forEach(p => {p.update();});

    requestAnimationFrame(loop);
}

loop();