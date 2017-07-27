import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router';
export default class List extends React.Component { 
	state={
		bg:'',
		list:[],
	}
	 ComponentwillMount(){
            console.log('aaa')	
	 }
	 componentWillMount(){	
	 	this.setState({bg:this.props.params.id})
	 	 	let  _this=this;
	 	let bigarr=[];
	 	let str="";
	 	  $.ajax({
			  type: "get",
			  async: false,
			  url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js",
			  dataType: "jsonp",
			  jsonp: "callback",
			  jsonpCallback: "JsonCallback",
			  scriptCharset: 'GBK',//设置编码，否则会乱码
			  success: function(data) { 	

			    data=data.songlist
			     for(var i=0;i<5;i++){	
			     	let arr=[];
		     	  for(var j=20*i;j<Math.min((i*20+20),data.length);j++){
		     	  	arr.push(data[j]);
		     	  }
		     	  bigarr.push(arr);
			     }

			     let num=Math.floor(Math.random()*5);
			     let  dan=bigarr[num];
		        _this.setState({list:dan});

			  },
			  error: function() {

			  }
			});
	 }
 render(){
 	return(
 		<div>
 	     <div id="hbg">
 	     <img src={`http://imgcache.qq.com/music/photo/album_300/${this.state.bg%100}/300_albumpic_${this.state.bg}_0.jpg`}
 	     />
 	     </div>
 	     {this.state.list.map((item,i)=>{
 	     	return   <Link to='/playPage' className="hcon" src={item.id} value={item.singerName} name={item.songName} alt={item.albumId} style={{'display':'block'}}>
 	     		 <a href="" className="hlist-pic" ><img id="Hplay" 
 src={`http://imgcache.qq.com/music/photo/album_300/${item.albumId%100}/300_albumpic_${item.albumId}_0.jpg`}
           /></a>
           <p  className="hlist-n"><span>{item.songName}</span><br/><span>{item.singerName}</span></p>
 	     			</Link>
 	     	})}
 		</div>
 	)
 }
 componentDidMount(){
 	var _this=this;
 	setTimeout(()=>{
 		 	$('.hcon').on('click',function(){
   			var songId = $(this).attr('src');
   			var songName = $(this).attr('value');
   			var songerName = $(this).attr('name');
   			var imgId = $(this).attr('alt');
   			localStorage.setItem('songid',songId);
   			localStorage.setItem('songname',songName);
   			localStorage.setItem('songername',songerName);
   			localStorage.setItem('imgid',imgId);
   		})
 	},400)
 }
}
