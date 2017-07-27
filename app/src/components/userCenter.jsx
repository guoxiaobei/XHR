import React from 'react';
import { Router,Route,Link,IndexRoute } from 'react-router';
import $ from 'jquery';
class userCenter extends React.Component{
	constructor(props){
	    super(props);
	    this.componentWillMount=this.componentWillMount.bind(this);
	}
	state={
	    count:"点击此处登录",
	    res:"none",
	    res1:"#fff",
	    imgsrc:'src/components/12.jpg',
	    loveSum:'0',
	    login:'/login'
	}
	componentWillMount(){
		var stt=localStorage.getItem('tel');
		var str=localStorage.getItem('imgSrc');
		var name=localStorage.getItem('user');
		if(stt){
			var _this = this;
			$.ajax({
				type:"get",
				url:"http://wangzhisheng.info/php/getLoveMusic.php",
				async:true,
				data:{tel:stt},
				success:function(data){
					if(JSON.parse(data).length==""){
						JSON.parse(data).length==0
					}
					_this.setState({loveSum:JSON.parse(data).length})
				}
			});
			this.setState({count:name,res:"",res1:"#fff",imgsrc:str,login:"/userCenter"});
		}
	}
	tap(){
		localStorage.removeItem("tel")
		localStorage.removeItem("user")
		location.reload()
	}
	render() {
		return(
			<div style={{"position":"relative"}}>
				<div style={{"height":"5.2rem","width":"100vw","background":"url(src/components/bj2.jpg) no-repeat center/100vw 5rem","position":"relative"}}>
					<div style={{'position':"absolute","bottom":"0","padding":"0.3rem"}}>
						<div style={{"width":"1.5rem","height":"1.5rem","background":"url("+this.state.imgsrc+") no-repeat center/1.5rem","float":"left","borderRadius":"50%","marginRight":"0.3rem","fontSize":"0.5rem","textAlign":"center"}}>
						</div>
						<div style={{"float":"left","height":"1.1rem","paddingTop":"0.2rem"}}>
							<Link to={this.state.login}>
								<span style={{"fontSize":"0.35rem","display":"block","color":this.state.res1,"fontWeight":"100",'marginTop':'0.15rem','lineHeight':'0.6rem'}} onClick={this.componentWillMount}>{this.state.count}</span>
							</Link>
							<span style={{"fontSize":"0.25rem","display":"block","color":"#dedede"}}>好声音,尽在XHR</span>
						</div>
					</div>
				</div>
				<div style={{"overflow":"hidden","background":"url(src/components/111.jpg) no-repeat center/100vw","width":"100vw","height":"70vh"}}>
					<ul style={{"marginLeft":"6vw","overflow":"hidden"}}>
						<li style={{"marginTop":"2vh","marginRight":"6vw","width":"40vw","height":"1.5rem","float":"left","border":"1px solid","borderRadius":"0.1rem","background":" rgba(255, 255, 255,.2)","letterSpacing":"4px",}}>
							<span style={{"width":"0.5rem","height":"0.5rem","float":"left","background":"rgba(255, 255, 255,.2)","marginTop":"0.6rem","marginLeft":"0.2rem","marginRight":"0.2rem",'borderRadius':'0.1rem'}}></span>
							<p style={{"float":"left","marginTop":"0.3rem"}}>
								<span style={{"fontSize":"0.35rem","display": "block","marginBottom":"0.1rem","color":"#fff"}}>本地音乐</span>
								<span style={{"fontSize":"0.25rem","display": "block","color":"#c2c8cf"}}><b>0</b>首歌曲</span>
							</p>
						</li>
						<li style={{"marginTop":"2vh","width":"40vw","height":"1.5rem","float":"left","border":"1px solid","borderRadius":"0.1rem","background":" rgba(255, 255, 255,.2)","letterSpacing":"4px"}}>
							<span style={{"width":"0.5rem","height":"0.5rem","float":"left","background":"rgba(255, 255, 255,.2)","marginTop":"0.6rem","marginTop":"0.5rem","marginLeft":"0.2rem","marginRight":"0.2rem",'borderRadius':'0.1rem'}}></span>
							<p style={{"float":"left","marginTop":"0.3rem"}}>
								<span style={{"fontSize":"0.35rem","display": "block","marginBottom":"0.1rem","color":"#fff"}}>歌曲下载</span>
								<span style={{"fontSize":"0.25rem","display": "block","color":"#c2c8cf"}}><b>0</b>首歌曲</span>
							</p>
						</li>
						<li style={{"marginTop":"2vh","marginRight":"6vw","width":"40vw","height":"1.5rem","float":"left","border":"1px solid","borderRadius":"0.1rem","background":" rgba(255, 255, 255,.2)","letterSpacing":"4px"}}>
							<span style={{"width":"0.5rem","height":"0.5rem","float":"left","background":"rgba(255, 255, 255,.2)","marginTop":"0.6rem","marginLeft":"0.2rem","marginRight":"0.2rem",'borderRadius':'0.1rem'}}></span>
							<p style={{"float":"left","marginTop":"0.3rem"}}>
								<span style={{"fontSize":"0.35rem","display": "block","marginBottom":"0.1rem","color":"#fff"}}>MV下载</span>
								<span style={{"fontSize":"0.25rem","display": "block","color":"#c2c8cf"}}><b>0</b>首歌曲</span>
							</p>
						</li>
						<li style={{"marginTop":"2vh","width":"40vw","height":"1.5rem","float":"left","border":"1px solid","borderRadius":"0.1rem","background":" rgba(255, 255, 255,.2)","letterSpacing":"4px"}}>
							<span style={{"width":"0.5rem","height":"0.5rem","float":"left","background":"rgba(255, 255, 255,.2)","marginTop":"0.6rem","marginLeft":"0.2rem","marginRight":"0.2rem",'borderRadius':'0.1rem'}}></span>
							<p style={{"float":"left","marginTop":"0.3rem"}}>
								<span style={{"fontSize":"0.35rem","display": "block","marginBottom":"0.1rem","color":"#fff"}}>最近播放</span>
								<span style={{"fontSize":"0.25rem","display": "block","color":"#c2c8cf"}}><b>0</b>首歌曲</span>
							</p>
						</li>
					</ul>
					<div style={{"padding":"3vw 3vh"}}>
						<h3 style={{"fontSize":"0.3rem","marginBottom":"1vh",'color':'#fff','fontWeight':'100'}}>我的收藏</h3>
						<Link to="/shoucang">
							<div style={{"overflow":"hidden","position":"relative","marginBottom":"2vh"}}>
								<span style={{"width":"1.5rem","height":"1.5rem","float":"left","background":"#6e96b9","marginRight":"3vw"}}></span>
								<span style={{"marginTop":"2vh","fontSize":"0.4rem","display":"block","letterSpacing":"4px","color":"#dedede"}}>我喜欢的</span>
								<span style={{"fontSize":"0.3rem","display":"block","color":"#dedede"}}><b style={{'color':'red'}}>{this.state.loveSum}</b>首</span>
								<span style={{"fontSize":"0.5rem","color":"#fff","position":"absolute","right":"2vw","bottom":"4vh"}}>&gt;</span>
							</div>
						</Link>
						<Link to="/shoucang">
							<div style={{"overflow":"hidden","position":"relative","marginBottom":"2vh"}}>
								<span style={{"width":"1.5rem","height":"1.5rem","float":"left","background":"#6e96b9","marginRight":"3vw"}}></span>
								<span style={{"marginTop":"2vh","fontSize":"0.4rem","display":"block","letterSpacing":"4px","color":"#dedede"}}>默认收藏</span>
								<span style={{"fontSize":"0.3rem","display":"block","color":"#dedede"}}><b style={{'color':'red'}}>{this.state.loveSum}</b>首</span>
								<span style={{"fontSize":"0.5rem","color":"#fff","position":"absolute","right":"2vw","bottom":"4vh"}}>&gt;</span>
							</div>
						</Link>
					</div>
				</div>
				<div style={{"display":this.state.res}}>
					<button style={{"width":"100vw","height":"8vh","fontSize":"0.4rem","background":"red","color":"#fff","display":"block"}} onClick={this.tap}>退出登录</button>
				</div>
			</div>
		)
	}
	
}
export default userCenter;
