(function(w){
    function Bird(option){
        this.img=option.img; //背景图片
        this.ctx=option.ctx;//画布
        this.x=option.x||100;
        this.y=option.y||100;
        this.width=this.img.width/3;
        this.height=this.img.height;
        this.index=0;//第几帧

        //加速运动属性
        this.speed=0;
        this.a=0.0005;
        this.maxSpeed=0.5;
        this.angle=0;
        this.maxAngle=45;

    }
    //渲染的方法
    Bird.prototype.render=function(Dvalue){
        /*
            V=Vo+a*t
            S=S+V*t+1/2*a*t*t
        */

        this.y=this.y+this.speed*Dvalue+1/2*this.a*Dvalue*Dvalue;
        this.speed=this.speed+this.a*Dvalue;
        // this.y=100;
        //角度和速度成正比
        this.angle=this.speed/this.maxSpeed*this.maxAngle;
        if(this.angle>45){//边界检测
            this.angle=45;
        }
        this.ctx.save(); //保存画布状态
        this.ctx.translate(this.x,this.y); //移动画布
        this.ctx.rotate(this.angle*Math.PI/180);//旋转画布
        this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);

        this.ctx.restore(); //恢复画布状态
        this.index++;
        this.index=this.index%3;
    }


    w.Bird=Bird;//把沙箱中的数据暴露给外界
})(Game)