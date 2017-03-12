window.log=function(){
	var a=new Array();
	for(var i=0;i<arguments.length;i++)
		a.push(arguments[i]);
	console.log(a.join(" "));
};
window.dir=function(){
	console.dir(arguments[0]);
};
window.around=function(lmt,fnc){
	for(var i=0;i<lmt;i++){
		var a=fnc(i);
		if(a) break;
	}
};

var ap=Array.prototype;
ap.trav=function(fnc){
	for(var i=0,lng=this.length;i<lng;i++){
		var a=fnc(this[i],i);
		if(a) break;
	}
};
ap.copy=function(){
	//1차원 배열의 하드카피
	var res=[];
	this.trav(function(el,i){
		res.push(el);
	});
	return res;
};