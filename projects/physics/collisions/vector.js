export class Vector2 {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    scale(s)
    {
        return new Vector2(this.x * s, this.y * s);
    }
    add(v)
    {
        return new Vector2(this.x + v.x, this.y + v.y)
    }
    subtract(v)
    {
        return new Vector2(this.x - v.x, this.y - v.y)
    }
    dot(v)
    {
        return this.x * v.x + this.y * v.y;
    }
    magnitude()
    {
        return Math.sqrt(this.x**2 + this.y**2);
    }
    normalized()
    {
        return new Vector2
        (
            this.x / this.magnitude(),
            this.y / this.magnitude()
        )
    }
    abs()
    {
        return new Vector2
        (
            Math.abs(this.x),
            Math.abs(this.y)
        )
    }

    toString()
    {
        return ("<" + this.x + ", " + this.y + ">");
    }
}