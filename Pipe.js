(function(w){
    function Pipe(option){
        this.upImg=option.upImg;
        this.downImg=option.downImg;
        this.ctx=option.ctx;
        this.index=option.index||0;
        this.spaceX=200; //管子之间的水平距离
        this.spaceY=200; //管子之间的垂直距离
        this.x=(this.index+1)*this.spaceX;
        this.y=150;

        this.setY();//随机y坐标
    }
    
    Pipe.prototype={
        constructor:Pipe,
        //渲染
        render:function(){
            this.x-=5;
            if(this.x<-this.spaceX){
                this.x=this.spaceX*4; //移动到前面的 柱子回到最后做替补
                //重新随机位置
                this.setY();
            }
            //绘制上面的管道
            this.ctx.drawImage(this.upImg,0,this.upImg.height-this.y,this.upImg.width,this.y,this.x,0,this.upImg.width,this.y);
            //绘制上面的管道
            //下面管道的高度
            var sy=this.ctx.canvas.height-this.y-this.spaceY;
            var dy=this.y+this.spaceY; //下面管道在canvas中y坐标
            this.ctx.drawImage(this.downImg,0,0,this.downImg.width,sy,this.x,dy,this.downImg.width,sy);

            //把上下的管道都变成路径 ,把画管道的地方描成路径
            ctx.rect(this.x,0,this.upImg.width,this.y);
            ctx.rect(this.x,dy,this.downImg.width,sy);
            ctx.strokeStyle='red';
            ctx.stroke();
        },
        //随机Y坐标
        setY:function(){
            this.y=50+parseInt(Math.random()*100);
        }
    }
    
    
    w.Pipe=Pipe;
})(Game);
