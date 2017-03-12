function jCommon(){
	
	this.mkTag=function(tagName,parent){
		var doc = document.createElement(tagName);
		parent.appendChild(doc);
		return doc;
	};
	
	this.killTag=function(id){
		if(typeof id=="string"){
			if(document.getElementById(id)){
				var doc = document.getElementById(id);
				doc.parentNode.removeChild(doc);
			}
		}else{
			if(id){
				id.parentNode.removeChild(id);
			}
		}
	};
	
	this.mkAbsoluteDiv=function(x,y,w,h,p){
		var sltr=this.mkTag("div",p);
		cf.setCss(sltr,{position:"absolute",top:y+"px",left:x+"px",width:w+"px",height:h+"px"});
		
		return sltr;
	};
	
	this.setCss=function(target, css){
		var cssInfo = target.style.cssText,
			str = ";";
		
		for(var el in css) {
			if ( !Object.prototype.isPrototypeOf(css[el]) ) {
				str += getUpper(el)+":"+css[el]+";";
			}
		}
		target.style.cssText = cssInfo + str;

		function getUpper(str){
			var chars = "abcdefghijklmnopqrstuvwxyz",
				tp, i, lng;
			for ( i=0, lng=str.length; i<lng; i++ ) {
				if ( chars.indexOf(str.charAt(i))==-1 ) {
					tp = str.split(str.charAt(i));
					tp[1] = str.charAt(i).toLowerCase() + tp[1];
					str = tp[0] +"-"+ tp[1];
				}
			}
			return str;
		};
	};
	
	this.addzero=function(num){
		var result=num;
		if(num<10)
			result="0"+num;
		return result;
	};
	
	this.roundXL=function(n,digits){
		if(n=="void")return false;
		
		if (digits >= 0) return parseFloat(n.toFixed(digits));
		digits = Math.pow(10, digits);
		var t = Math.round(n * digits) / digits;
		return parseFloat(t.toFixed(0));
	};
	
	this.commify=function(n){
		var reg=/(^[+-]?\d+)(\d{3})/;
		n += "";
		while(reg.test(n))
			n = n.replace(reg,"$1" + "," + "$2");
		
		return n;
	};
	
	this.rommify=function(n,num){
		n=n*1;
		return this.commify(this.roundXL(n,num));
	};
	
};