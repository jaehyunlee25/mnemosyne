var game=new RAIN_DROP(),
	mne=new MNEMOSYNE();

game.outside_input=act;	//게임으로 부터 현재의 상태를 전달받고, 그 상태에 따라, 게임에 agent의 행동을 전달
game.outside_output=response;	//게임으로부터 agent의 행동 결과와 그에 따른 보상을 전달 받음

var direction=-1,
	action_list=[];
	
function act(ar){
	//0 - 정지, 1 - 오른쪽 이동, -1 - 왼쪽 이동
	var action=direction;
	
	//니마시니에게 판단을 구하는 부분///////////////////////
	if(action_list.length==0) action_list=mne.think(ar);//
	////////////////////////////////////////////////////////
	
	if(action_list.length>0) return action_list.shift();
	else return action;
	
};
function response(ar,pail_status){
	
	if(pail_status=="right end") direction=-1;
	else if(pail_status=="left end") direction=1;
	
	mne.record(ar);
};


