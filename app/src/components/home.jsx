import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './banner';
import Hlist from './Hlist';
import {Link} from 'react-router';
import { Icon, Grid } from 'antd-mobile';
import $ from 'jquery';
export default class Home extends React.Component { 
	state={
		newArr:[]
	}
	componentDidMount(){
		var _this=this;
	setTimeout(()=>{
			$('.htxt').on('click',function(){
				$('#hsearch').css('display','block');
			})
			$('#fanhui').on('click',function(){
				$('#hsearch').css('display','none');
			})
	},300)
	$('.htxt1').on('input',function(){
		
		setTimeout(()=>{
		        var newArr=[];
				var str = $('.htxt1').val();
				var txt =  "http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=%s&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w="+str;	
				$.post("http://wangzhisheng.info/php/musicCode.php", {txt},
							function(data) {
				        data = JSON.parse(data)
				        data['data']['song']['list'].map(function(item){
				        	newArr.push(item['f'].split('|'));
				        })
				        _this.setState({newArr:newArr})
				      })
						},300)
			})	
	
	}
 render(){
 	return(
 		<div>
 		<div id="hmodel">
 		 <input  type="text" className="htxt"  placeholder="	请输入歌曲、歌手、MV..."/>
 		 </div>
 		 <div  id="hsearch"  style={{display:'none'}}>
 		   <Icon type="left"  id="fanhui" />
 		  <input  type="text" className="htxt1"  placeholder="	　请输入歌曲、歌手、MV..."/>
 		   <div id='box'>
 		    {
 		    	this.state.newArr.map((item)=>{
 		    		if(item[3]){
 		    			return <li className='sealist' value={item[3]} name={item[1]} src={item[0]} id={item[4]}><Link to='/playPage' ><span>{item[1]}</span><span>{item[3]}</span></Link></li>
 		    		}
 		    	})
 		    }
 		   </div>
 		 </div>
 	     <Banner />
 	     <Hlist/>
 		</div>
 	)
 }
}
