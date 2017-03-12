function RAIN_DROP(){
	var self=this,
		W=300,
		H=200;

	var pail=new PAIL(),
		rd=new RAINDROP(getRainPosition()),
		rd1=new RAINDROP(getRainPosition());

	var cnt=0,
		verySlow=250,
		lngLow=5,
		lngHigh=1;

	var pailvector=[],
		hash={
			right:true,
			left:false
		},
		clock=new Date();
	
	var timer,
		score=0,
		got=0,
		missed=0,
		last25=[];

	el_start.onclick=function(){
		
		score=0;
		got=0;
		missed=0;
		last25=[];
		
		if(this.status){
			clearInterval(timer);
			this.status=false;
			this.innerHTML="START";
			
		}else{
			start();
			this.innerHTML="STOP";
			this.status=true;
			clock=new Date();
		}
	};
	
	this.outside_input=function(){};
	this.outside_output=function(){};
	this.isManual=false;
	this.pushKey=function(opt){
		var num=-1;
		if(opt) num=1;
		
		around(100,function(){
			pailvector.push(num);
		});
	};
	this.emptyKey=function(){
		pailvector=[];
	};
	
	function start(){
		timer=setInterval(function(){
			
			var action=0,
				reward=0,
				direction;
			
			rd.setpos();
			
			if(self.isManual) 
				action=pailvector.shift();
			else
				action=self.outside_input([pail.x,pail.y,rd.x,rd.y]);
			
			if(action==1 || action==-1){
				if(action==1) direction=hash.right;
				else if(action==-1) direction=hash.left;
				pail.setpos(direction);
			}else{
				//log("not action vecor",typeof action,action);
				action=0;
			}
			if(rd.x+rd.w>=pail.x && rd.x<=pail.x+pail.w){	//빗방울이 양동이의 x 범위 안에 들어오면,
				if(rd.y+rd.h>=pail.y){	//빗방울이 양동이의 y안으로 들어오면,
					reward=1;
					rd.remove();
					//rd=new RAINDROP(gr(W-10));
					rd=new RAINDROP(getRainPosition());
				}
			}else{
				if(rd.y>H){
					reward=-1;
					rd.remove();
					//rd=new RAINDROP(gr(W-10));
					rd=new RAINDROP(getRainPosition());
				}
			}
			if(reward!=0){
				score+=reward;
				if(reward==-1){
					missed++;
					notif.innerHTML="Missed!!";
				}else if(reward==1){
					got++;
					notif.innerHTML="Got!!";
					/* if(mode_analogy) notif.innerHTML="Got by Analogy!!";
					if(mode_experience) notif.innerHTML="Got by Experience!!";
					if(mode_classification) notif.innerHTML="Got by Classification!!"; */
				}
				el_score.innerHTML=" "+(score*7)+" ml";
				el_got.innerHTML=" "+got+" times";
				el_missed.innerHTML=" "+missed+" times";
				el_rate.innerHTML=" "+cf.rommify((got/(got+missed))*100,2)+" %";
				
				last25.push(reward);
				if(last25.length==51) last25.shift();
				var tmpgot=0;
				last25.trav(function(val,i){
					if(val==1) tmpgot++;
				});
				el_50.innerHTML=" "+cf.rommify((tmpgot/last25.length)*100,2)+" %";
				
			}
			
			self.outside_output([pail.x,pail.y,rd.x,rd.y,action,reward],pail.status);
			
			if(cnt%verySlow==0){
				if(notif.innerHTML!="") notif.innerHTML="";
			}
			el_clock.innerHTML=" "+expTime((new Date-clock))+" secs";
			
			cnt++;
			
		},20);
	};
	function expTime(mil){
		var secs=parseInt(mil/1000),
			mins=parseInt(secs/60);
		
		return cf.addzero(parseInt(mins%60))+":"+cf.addzero(secs%60);
	};
	function getRainPosition(){
		var //posRain=[50,75,100,125,150,175,200,225,250],
			posRain=[50],
			num=posRain[0];
		return num;
	};
	function RAINDROP(x){
		this.x=x;
		this.y=0;
		this.h=10;
		this.w=5;
		this.el=cf.mkAbsoluteDiv(this.x,this.y-this.h,this.w,this.h,board);
		cf.setCss(this.el,{backgroundColor:"blue"});
		this.setpos=function(){
			if(!this.el) return;
			this.y+=3;
			cf.setCss(this.el,{top:this.y+"px"});
		};
		this.remove=function(){
			cf.killTag(this.el);
		};
	};
	function PAIL(){
		this.w=50;
		this.h=10;
		this.y=H-this.h;
		this.x=W/2-this.w/2;
		this.el=cf.mkAbsoluteDiv(this.x,this.y,this.w,this.h,board);
		cf.setCss(this.el,{backgroundColor:"red",zIndex:1});
		this.status="normal";
		this.setpos=function(opt){
			if(opt) this.x+=5;
			else this.x-=5;
			
			this.status="normal";
			if(this.x<0){
				this.status="left end";
				if(this.x<-100) log("left",this.x);
			}
			if(this.x>W-this.w){
				this.status="right end";
			}
			cf.setCss(this.el,{left:this.x+"px"});
		};
	};
	function gr(num){
		return getRandom(0,num);
	};
	function getRandom(start,end){
		var amount=end-start,
			rslt=Math.random()*(amount+1)+start;
		return parseInt(rslt);
	};
};