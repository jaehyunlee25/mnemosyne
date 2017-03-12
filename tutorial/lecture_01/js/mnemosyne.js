function MNEMOSYNE(){
	
	var self=[],
		memory=[];
		
	this.record=function(result){
		var res=result.copy();
		memory.unshift(res);
	};
	
	this.searchPath=function(status){
		var reward,
			reward_index,
			status_index;
		memory.trav(function(ar,i){
			if(ar[5]==1 || ar[5]==-1){
				reward=ar[5];
				reward_index=i;
			}
			if(status[0]==ar[0] && status[1]==ar[1] && status[2]==ar[2] && status[3]==ar[3])
				if(reward_index!=undefined){
					status_index=i;
					return true;
				}
		});
		if(reward==1 && status_index!=undefined) return {start:reward_index,end:status_index};
		else return false;
	};
	
	this.think=function(status){
		var res=this.searchPath(status);
		if(res){
			var action_list=[],
				flg=false;
				
			memory.trav(function(ar,i){
				if(i==res.start) flg=true;
				if(flg) action_list.unshift(ar[4]);
				if(i==res.end) return true;
			});
			
			return action_list;
		}
		return [];
	};
	
};