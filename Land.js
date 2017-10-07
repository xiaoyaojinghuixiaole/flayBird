(function(w){
    function Land(option){
        this.img=option.img;
        this.ctx=option.ctx;
        this.width=this.img.width;
        this.height=this.img.height;     
        this.index=option.index||0; //第几块地板
        this.x=this.index*this.width; //位置
        this.y=this.ctx.canvas.height-this.height;
        this.offsetX=this.x; //用于让land做动画
    }

    Land.prototype.render=function(){
        this.offsetX-=13;
        if(this.offsetX<this.x-this.width){ //边界检测，
            this.offsetX=this.x;
        }
        this.ctx.drawImage(this.img,0,0,this.width,this.height,this.offsetX,this.y,this.width,this.height);
    }

    w.Land=Land;
})(Game);
