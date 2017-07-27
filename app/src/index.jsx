import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Drawer ,Icon} from 'antd-mobile';
import $ from  'jquery'; 
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Home from './components/home';
import App from './components/App';
import List from './components/list';
import Login from './components/login';
import Regist from './components/regist';
import Paihang from './components/paihang';
import Dongtai from './components/dongtai';
import Phlist from './components/ph_list';
import Playpage from './components/playPage';
import Shoucang from './components/shoucang';
import Usercenter from './components/userCenter';
import './index.less';
class Index extends React.Component {
	state={
	src:'1913719',
	name:'关喆',
	title:'想你的夜',
	imgsrc:'139643',
}
  render() {
    return (
			   <div className="body">
			  <div id="home">
          <header>
           <Link className="head-tab home-tab"  to='/home'>推荐</Link>
           <Link className="head-tab"  to='/paihang'>排行榜</Link>
           <Link className="head-tab"  to='/dongtai'>动态</Link>
           <Link className="head-tab"  to='/userCenter'>我的</Link>
          </header>
			</div>
        <div style={{ position: 'relative', height: '100%' }}>
          <Drawer>
            {this.props.children}
          </Drawer>
        </div>
        <Link id="foots" to="/playPage" >
           <audio 
           	src={`http://ws.stream.qqmusic.qq.com/${this.state.src}.m4a?fromtag=46`}
           	id='action'
           ></audio>
           <a  className="hlist-pic" ><img id="Hplay" 
           src={`http://imgcache.qq.com/music/photo/album_300/${this.state.imgsrc%100}/300_albumpic_${this.state.imgsrc}_0.jpg`}
           /></a>
           <p  className="hlist-n"><span>{this.state.title}</span><br/><span>{this.state.name}</span></p>
           
        </Link>
      </div>
    );
  }
  componentWillReceiveProps(){
  		let _this=this
    	let strid=""
  		let arr="";
  	setTimeout(()=>{
  		$('.hcon').on('click',function(){
		     strid=$(this).attr('alt');
	 for(var i  in arr){		
	  	if(arr[i].albumId==strid){
		     		  _this.setState({
		     		  	    src:arr[i].id,
		     		  	    name:arr[i].singerName,
		     		  	    title:arr[i].songName,
		     		  	    imgsrc:strid
		     		  })
		     	}
		     }
		localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
  		})
  				$('#box').on('click','li',function(){
	     		  _this.setState({
	     		  	    src:$(this).attr('src'),
	     		  	    name:$(this).attr('value'),
	     		  	    title:$(this).attr('name'),
	     		  	    imgsrc:$(this).attr('id')
	     		  })
	   localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
		 });
  		$('.imgid').on('click',function(){
  			setTimeout(()=>{
  			document.getElementById('action').play()
  			$('#action').attr({'autoplay':'autoplay'})
  			},100)
		    _this.setState({
		     		  	    src:$(this).attr('src'),
		     		  	    name:$(this).attr('value'),
		     		  	    title:$(this).attr('name'),
		     		  	    imgsrc:$(this).attr('id')
		  })
	   localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
		 });
		  $.ajax({
			  type: "get",
			  async: false,
			  url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js",
			  dataType: "jsonp",
			  jsonp: "callback",
			  jsonpCallback: "JsonCallback",
			  scriptCharset: 'GBK',//设置编码，否则会乱码
			  success: function(data) {

			   arr=data.songlist
			  }
			});
  	},400)
  }	componentDidMount(){
  		let _this=this
    	let strid=""
  		let arr="";
  	setTimeout(()=>{
  		$('header').on('click','a',function(){
  			$(this).addClass('home-tab').siblings().removeClass('home-tab');
  		})
  			$('#box').on('click','li',function(){
	     		  _this.setState({
	     		  	    src:$(this).attr('src'),
	     		  	    name:$(this).attr('value'),
	     		  	    title:$(this).attr('name'),
	     		  	    imgsrc:$(this).attr('id')
	     		  })
	   localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
		 });
  		$('.imgid').on('click',function(){
  			setTimeout(()=>{
  			document.getElementById('action').play()
  			$('#action').attr({'autoplay':'autoplay'})
  			},100)
              _this.setState({
		     		  	    src:$(this).attr('src'),
		     		  	    name:$(this).attr('value'),
		     		  	    title:$(this).attr('name'),
		     		  	    imgsrc:$(this).attr('id')
		  })
	   localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
		 });
		$('.hcon').on('click',function(){
		     strid=$(this).attr('alt');
	 for(var i  in arr){		
	  	if(arr[i].albumId==strid){
		     		  _this.setState({
		     		  	    src:arr[i].id,
		     		  	    name:arr[i].singerName,
		     		  	    title:arr[i].songName,
		     		  	    imgsrc:strid
		     		  })
		     	}
		     }
		localStorage.setItem('imgid',_this.state.imgsrc);
	   localStorage.setItem('songid',_this.state.src);
	   localStorage.setItem('songname',_this.state.name);
	    localStorage.setItem('songername',_this.state.title);
  		})
		  $.ajax({
			  type: "get",
			  async: false,
			  url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js",
			  dataType: "jsonp",
			  jsonp: "callback",
			  jsonpCallback: "JsonCallback",
			  scriptCharset: 'GBK',//设置编码，否则会乱码
			  success: function(data) {
			   arr=data.songlist
			  },
			  error: function() {
			  }
			});
  	},400)
  
	}
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/playPage' component={Playpage} ></Route>
    <Route path='/login' component={Login} ></Route>
    <Route path='/regist' component={Regist} ></Route>
    <Route path="/" component={Index}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
      <Route path='/paihang' component={Paihang} />
      <Route path='/dongtai' component={Dongtai} />
      <Route path='/userCenter' component={Usercenter} />
      <Route path='/shoucang' component={Shoucang} />
      <Route path='/phlist/:id' component={Phlist} />
      <Route path="/list/:id" component={List} />Usercenter
      
    </Route>
  </Router>
, document.getElementById('example'));
