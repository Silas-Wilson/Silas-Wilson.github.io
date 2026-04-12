import { Vector2 } from "../collisions/vector.js";

const screenCenter = new Vector2(750, 750);

class planetBlueprint
{
    constructor(spawnPosition, spawnVelocity, mass, radius, color = "rgb(108, 164, 255)")
    {
        this.spawnPosition = spawnPosition;
        this.spawnVelocity = spawnVelocity;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
    }
}

const a = 10;
function normalizeMass(m) { return a * m / (1.9891 * 10**30); }
function normalizeDistance(r) { return Math.cbrt(a) * r / (432685); }

const massSun = normalizeMass(1.9891 * 10**30);

const massMercury = normalizeMass(3.285 * 10**23);
const distanceMercury = normalizeDistance(36000000);

const massVenus = normalizeMass(4.867 * 10**24);
const distanceVenus = normalizeDistance(67000000);

const massEarth = normalizeMass(5.97219 * 10**24);
const distanceEarth = normalizeDistance(93000000);

const massMars = normalizeMass(6.417 * 10**23);
const distanceMars = normalizeDistance(142000000);

console.log(distanceMercury);
console.log(distanceMars);

export const Presets =
{
    solarSystem:
    [
        new planetBlueprint(screenCenter, new Vector2(0,0), massSun, 20, "rgb(255, 183, 0)"), //sun
        new planetBlueprint(screenCenter.add(new Vector2(distanceMercury, 0)), new Vector2(0, 0.3), massMercury, 5, "rgb(150, 154, 186)"), //mercury
        new planetBlueprint(screenCenter.add(new Vector2(distanceVenus, 0)), new Vector2(0, 0.23), massVenus, 7, "rgb(160, 88, 36)"), //venus
        new planetBlueprint(screenCenter.add(new Vector2(distanceEarth, 0)), new Vector2(0, 0.2), massEarth, 7, "rgb(85, 153, 255)"), //earth
        new planetBlueprint(screenCenter.add(new Vector2(distanceMars, 0)), new Vector2(0, 0.17), massMars, 5, "rgb(201, 95, 19)") //mars
    ]
}