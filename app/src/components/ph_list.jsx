import React from 'react';
import { SearchBar,Icon, WingBlank ,NoticeBar,WhiteSpace} from 'antd-mobile';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import $ from 'jquery';
export default class PhList extends React.Component{
	state={
		arrAll:[]
	}
	componentWillMount(){
		var _this=this;
		var zong=[];
		var dan=[];
		$.ajax({
		  type: "get",
		  async: false,
		  url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js",
		  dataType: "jsonp",
		  jsonp: "callback",
		  jsonpCallback: "JsonCallback",
		  scriptCharset: 'GBK',//设置编码，否则会乱码
		  success: function(data) {
		    data.songlist.map((item,i)=>{
		    	if(i!=0&&i%10==0){
		    		zong.push(dan);
		    		dan=[];
		    	}
		    	dan.push(item);
		    	if(i==data.songlist.length-1){
		    		zong.push(dan);
		    	}
		    })
		    _this.setState({arrAll:zong[_this.props.params.id]});
		  },
		  error: function() {

		  }
		});
	}
	render(){
	     var sty={
	     	box:{
	     		'width':'100vw',
	     		'height':'100vh',

	     	},
	     	con:{
	     		'width':'100%',
	     		'height':'auto',
	     		'overflow':'hidden',

	     	},
  	        item:{
  	          'display':'block',
  	      	  'width':'94%',
  	      	  'height':'13vh',
  	      	  'borderBottom':'2px solid #8e7cc6',
  	      	  'padding':'1vh 3%'
  	        },
  	        txt:{
  	        	'width':'69%',
  	        	'height':'9vh',
  	        	'float':'right',
  	        	'borderRadius':'10px',
  	        	'padding':'0 3% ',
				'marginTop':'2vh',
				'color':'#fff',
				'position':'relative'
  	        },
  	        song:{
				'marginTop':'1vh',
				'width':'100%',
				'whiteSpace':'nowrap',
				'overflow':'hidden',
				'textOverflow':'ellipsis',

  	        },
  	        str12:{
				'width':'5vw',
				'height':'5vh',
				'position':'absolute',
				'right':'0',
				'top':'2vh',
				'color':'#e1dac8',
			    'fontSize':'1rem',
				 'lineHeight':'13vh'
			}
	      }
		return (
			<div style={sty.box}>
				<div style={sty.con}>
				{
					this.state.arrAll.map((it,i)=>{
						var str = "http://imgcache.qq.com/music/photo/album_300/"+(it.albumId%100)+"/300_albumpic_"+it.albumId+"_0.jpg";
						return <Link to='/playPage' style={sty.item} className='box' alt={it.id} name={it.singerName} value={it.songName} src={it.albumId}>
				    	<div style={{'width':'24%','height':'98%','float':'left','background':'url('+str+') no-repeat','borderRadius':'50%','backgroundSize':'contain'}}>
				    	</div>
				    	<div style={sty.txt}>
				    		<p style={sty.song}>  
				    			{it.songName}
				    		</p>
				    		<p style={sty.song}>
				    			{it.singerName}
				    		</p>
				    		<Icon style={sty.str12} type="right" />
				    	</div>
				    </Link>
					})
				}
				</div>
			</div>
		)
	}
	componentDidMount() {
    setTimeout(()=>{
    	$('.box').on('click',function(){
   			var songId = $(this).attr('alt')
   			var songName = $(this).attr('name')
   			var songerName = $(this).attr('value')
   			var imgId = $(this).attr('src')
   			localStorage.setItem('songid',songId);
   			localStorage.setItem('songname',songName);
   			localStorage.setItem('songername',songerName);
   			localStorage.setItem('imgid',imgId);
   		})
    },400)
   	
  }
	
}
