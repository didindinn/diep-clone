class bullet {
    constructor(x, y, xd, yd, speed, owner) {
        this.x = x;
        this.y = y;
        this.xd = xd;
        this.yd = yd;
        this.speed = speed;
        this.d = 19;
        this.damage = 1;
        this.penetration = 1;
        this.owner = owner;

        this.t = 0;
        this.transparency = 0;
        this.dying = false;
    }

    update() {
        this.x += this.xd * this.speed;
        this.y += this.yd * this.speed;
        this.t++;
        if(this.t >= 500 && this.dying === false) this.dying = true;
        if(this.dying) {
            this.transparency += 0.15;
            this.d += 1.75;
        }
        if(this.transparency >= 1) bulletServer.getBullets().splice(bulletServer.getBullets().indexOf(this), 1);
    }
};

module.exports = bullet;
