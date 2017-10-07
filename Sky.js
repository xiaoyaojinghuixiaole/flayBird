(function(w){
    function Sky(option){
        this.img=option.img;
        this.ctx=option.ctx;
        //图片的等比例缩放
        this.height=this.ctx.canvas.height;
        //图片的宽*缩放后的高（画布的高）/图片的高 == 缩放后的宽
        this.width=this.img.width*this.height/this.img.height;
        this.index=option.index||0;//第几个天空对象
        this.x=this.index*this.width;//根据索引值算出坐标
        this.y=0;
        
        this.offsetX=this.x;
    }

    Sky.prototype.render=function(){
        this.offsetX-=2;
        if(this.offsetX<this.x-this.width){
            this.offsetX=this.x;
        }
        this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.offsetX,this.y,this.width,this.height)
    }

    w.Sky=Sky;
})(Game);