(function(w){
    function Game(option){
        this.ctx=option.ctx;//画布 舞台
        this.roles=[];//存放所有的游戏对象
        this.imgArr=['birds','land','pipe1','pipe2','sky'];//存放图片资源的名称
        this.timer=null;//定时器
        this.hero=null;//英雄

        //小鸟加速运动时间
        this.startTime=+new Date();
        this.endTime=0;

        this.start();//开始游戏
    }
    Game.prototype={
        start:function(){//游戏开始
            var that=this;
            //当资源加载完成后，才能进行后续的操作
            this.loadImage(function(imgList){
                //内部的this指向window
                //初始游戏对象（创建对象是需要图片资源）
                that.initGame(imgList);
                that.timer=setInterval(function(){
                    that.endTime=+new Date();
                    var Dvalue=that.endTime-that.startTime;
                    that.startTime=that.endTime;//下次的开始时间是本次的结束时间
                    // ctx.clearRect(0,0,cs.width,cs.height);
                    that.ctx.beginPath();//开始新路径
                    //渲染游戏对象
                    that.render(Dvalue);
                    //碰撞检测
                    that.impact();
                },30);


                //用户控制
                that.userControl();
            });


        },
        //加载图片
        loadImage:function(callback){
            //当5张图片加载完成后，才能进行后续的操作
            var imgList={};//存放加载后的图片

            for (var i = 0; i < this.imgArr.length; i++) {
                var obj = this.imgArr[i];
                var count=0;//计数器

                var img=new Image();
                img.src='imgs/'+obj+'.png';
                imgList[obj]=img;//将图片存放到imgList中
                var that=this;//缓存this
                img.onload=function(){
                    count++;
                    if(count>=that.imgArr.length){
                        //所有图片加载完成,执行后续操作
                        callback&&callback(imgList);
                        console.log(imgList);
                    }
                }


            }
        },
        //初始化游戏对象
        initGame:function(imgList){
            //天空
            for (var i = 0; i < 3; i++) {
               var  sky=new Game.Sky({
                   ctx:this.ctx,
                   img:imgList['sky'],
                   index:i
               });
               this.roles.push(sky);//将生成对象追加到roles中
            }
            //柱子
            for (var i = 0; i < 5; i++) {
                 var  p=new Game.Pipe({
                     ctx:this.ctx,
                     upImg:imgList['pipe2'],
                     downImg:imgList['pipe1'],
                     index:i
                 });
                this.roles.push(p);//将生成对象追加到roles中
            }
            //大地
            for (var i = 0; i < 4; i++) {
                var land=new Game.Land({
                    ctx:this.ctx,
                    img:imgList['land'],
                    index:i
                })
                this.roles.push(land);
            }
            //鸟
            var bird=new Game.Bird({
                ctx:this.ctx,
                img:imgList['birds']
            });

            this.roles.push(bird);
            this.hero=bird;//鸟是英雄
            console.log(this.roles);
        },
        //渲染游戏对象
        render:function(Dvalue){
            for (var i = 0; i < this.roles.length; i++) {
               var obj=this.roles[i];
                obj.render(Dvalue); //遍历渲染所有的游戏对象
            }
        },
        //碰撞检测
        impact:function(){
            if(this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-112){
                clearInterval(this.timer);
            }

        },
        //用户控制
        userControl:function(){
            var that=this;
            window.onclick=function(){
                that.hero.speed=-0.3;//跳起来
            }

        }
    }



    w.Game=Game;
})(window);
