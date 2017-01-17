window.addEventListener("load",function() {

    var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
        .setup({width:600,height:800,scaleToFit:true})
        .controls().touch()
        .enableSound()
    Q.scene("start",function(stage){
        var sprite1 = new Q.Sprite({ x: Q.width/2 ,y:Q.height/2, asset: 'bg1.png', 
                                 angle: 0, collisionMask: 1, scale: 1});
        stage.insert(sprite1);
        var seconds=1;
        var interval = setInterval(function(){
            --seconds;
            if(seconds<=0){
                clearInterval(interval);
                Q.stageScene("main");
            }
        },1000);
        stage.insert(new Q.UI.Text({x:Q.width/2,y:500,label:"Loading . . . . "}));
    });
    Q.scene("main",function(stage){
      var sprite1 = new Q.Sprite({ x: Q.width/2 ,y:Q.height/2, asset: 'bg2.png', 
                                 angle: 0, collisionMask: 1, scale: 1,});
      
      stage.insert(sprite1);
      stage.insert(new Q.UI.Button({x:Q.width/2+10,y:380,asset:'playbtn.png'},function(){
        Q.load("bg4.png,box.png,apple/1.png,apple/2.png,apple/3.png,apple/4.png,apple/5.png,apple/6.png,apple/7.png,apple/8.png,apple/9.png",function(){
            Q.stageScene("play");
        });
      }));
    });
    Q.scene("stages",function(stage){
         var sprite1 = new Q.Sprite({ x: Q.width/2 ,y:Q.height/2, asset: 'bg3.png', 
                                 angle: 0, collisionMask: 1, scale: 1});
      stage.insert(sprite1); 
    });
    var time = 1, myTimer;
    Q.scene("play",function(stage){
         var sprite1 = new Q.Sprite({ x: Q.width/2 ,y:Q.height/2, asset: 'bg4.png', 
                                 angle: 0, collisionMask: 1, scale: 1});
      stage.insert(sprite1); 
      var first = generateRandom();
      var second = generateRandom();
      var ans = new Q.UI.Button({ x: 450 ,y:255, label:' ',size:'75',font:'Myriad Pro'
      },function(){
        if(this.p.fontColor == 'red'){
          this.p.label = ' ';
        }
      });
      stage.insert(new Q.UI.Text({ x: 150 ,y:212, label:first,style:'bold',size:'75',family:'Myriad Pro'}));
      stage.insert(new Q.UI.Text({ x: 300 ,y:212, label:second,style:'bold',size:'75',family:'Myriad Pro'}));
      stage.insert(ans);
      var X = 110,Y=370;
      var sprite2 = new Q.Sprite({});
      var apple = '';
      var answer = first * second;
      var ctr = 0;
      var arr = [{}];
      for(var i=0;i<first;i++){
        if(i==4 || i==8){
          X=110;
          Y+=115;
        }
   
        arr[i] = new Q.Sprite({ x:X, y:Y});
        stage.insert(new Q.UI.Button({ x: X ,y:Y, asset: 'box.png',size:0,ctr:i
         },function(){
            this.p.size+=1;
            apple = 'apple/'+this.p.size+'.png';
            if(this.p.size > second)
              this.p.disableMouseControls();      
              ctr++;
            if(this.p.size > 1){
             stage.remove(arr[this.p.ctr]);
            }
            arr[this.p.ctr] = new Q.Sprite({ x:this.p.x, y:this.p.y ,asset:apple});
            stage.insert(arr[this.p.ctr]);
            if(answer == ctr){
            var ar = shuffle(generateRandoms(answer));
           
            var T = 110;
            for(var q=0;q<4;q++){
               stage.insert(new Q.UI.Button({ x: T ,y:650, label:ar[q]+'',textStyle:'italic',size:'75',font:'Myriad Pro'
               },function(){
                ans.p.label=this.p.label; 
                if(ans.p.label == answer){
                  ans.p.fontColor = "black";
                  myTimer = setInterval(timerFunction,1000);               
                }else{
                  ans.p.fontColor = "red";
                }
               }));
               T+=130;

            }
          }
         }));

        X+=130;
      }
      // stage.insert(new Q.Sprite({ x: 100 ,y:370, asset: 'box.png'})); 
    });

     Q.load("bg1.png,bg2.png,playbtn.png,quitbtn.png,bg3.png", function() {
    // Finally call `stageScene` to start the show
    Q.stageScene("start");
  });
     
    // Q.load("liberty11.jpg,a.png,b.png,C.png,d.png,e.png,f.png,g.png,h.png,i.png,j.png,k.png,l.png,m.png,n.png,o.png,p.png,q.png,r.png,s.png,t.png,u.png,v.png,w.png,x.png,y.png,z.png,dot.png,space.png,play.png,clear.png,menu.png",function(){
   //           Q.stageScene("inputName");
   //       });
   // Q.load("help1.png,menu_help.png",function(){
   //               Q.stageScene("help");
   //           });
   function generateRandom(){
    return Math.floor((Math.random() * 9) + 1) + '';
   }
   function generateRandoms(answer){
        var arr = []
        arr.push(answer);
    while(arr.length < 4){
  var randomnumber=Math.ceil(Math.random()*99)-1
  var found=false;
  for(var i=0;i<arr.length;i++){
    if(arr[i]==randomnumber){found=true;break}
  }
  if(!found)arr[arr.length]=randomnumber;
}
    
    return arr;
    }     
    function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function timerFunction(){
  time--;
  if(time<0){
    clearInterval(myTimer);
    Q.stageScene('play');
  }

}  
});