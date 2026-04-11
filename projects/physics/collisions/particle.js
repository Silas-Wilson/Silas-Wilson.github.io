import { InputState } from "./inputHandler.js"

export class Particle {
    maxVectorLength = 100;
    isSimulated = false;

    constructor(position, velocity, mass, color) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = 10 * Math.sqrt(mass);
        this.color = color;
    }

    activateParticle(initialVelocity)
    {
        this.isSimulated = true;
        this.velocity = initialVelocity;
    }

    update() {
        this.position = this.position.add(this.velocity);
    }

    draw(ctx) {
        //Draw Particle
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        if (!InputState.isVectorsVisible) return;
        
        //Draw Vector Line
        const vectorTipX = this.position.x + this.maxVectorLength * InputState.vectorScale * this.velocity.x;
        const vectorTipY = this.position.y + this.maxVectorLength * InputState.vectorScale * this.velocity.y;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(vectorTipX, vectorTipY);
        ctx.stroke();

        //Draw Vector Arrow
        const arrowLength = 15 * InputState.vectorScale;
        const arrowWidth = 5 * InputState.vectorScale;
        const arrowTipX = vectorTipX + this.velocity.x * arrowLength;
        const arrowTipY = vectorTipY + this.velocity.y * arrowLength;

        ctx.beginPath();
        ctx.lineTo(vectorTipX + arrowWidth * this.velocity.y, vectorTipY + -arrowWidth * this.velocity.x);
        ctx.lineTo(arrowTipX , arrowTipY);
        ctx.lineTo(vectorTipX + -arrowWidth * this.velocity.y, vectorTipY + arrowWidth * this.velocity.x);
        ctx.lineTo(vectorTipX + arrowWidth * this.velocity.y, vectorTipY + -arrowWidth * this.velocity.x);
        ctx.stroke();
    }
}