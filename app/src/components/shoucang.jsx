import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import {  Icon } from 'antd-mobile';
import $ from 'jquery';
class Shoucang extends React.Component{
	state={
		arrAll:[]
	}
    componentWillMount(){
    	var _this=this;
    	var userTel = localStorage.getItem('tel');
    	if(userTel){
    		$.ajax({
            type:"get",
            url:"http://wangzhisheng.info/php/getLoveMusic.php",
            data:{tel:userTel},
            success:function(data){
            	data = JSON.parse(data)
            	_this.setState({arrAll:data});
            }
        });
    	}
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
  	      	  	'background':'rgba(255,0,0,0.2)'
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
  	        	'background':'rgba(255,0,0,0.2)',
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
        return(
        	<div style={sty.box}>
				<div style={sty.con}>
				{
					this.state.arrAll.map((it,i)=>{
						console.log(it)
						var str = "http://imgcache.qq.com/music/photo/album_300/"+(it[3]%100)+"/300_albumpic_"+it[3]+"_0.jpg";
						return <Link to='/playPage' style={sty.item} className='box' alt={it[0]} name={it[1]} value={it[2]} src={it[3]}>
				    	<div style={{'width':'24%','height':'98%','float':'left','background':'url('+str+') no-repeat','borderRadius':'50%','backgroundSize':'contain'}}>
				    	</div>
				    	<div style={sty.txt}>
				    		<p style={sty.song}>  
				    			{it[2]}
				    		</p>
				    		<p style={sty.song}>
				    			{it[1]}
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

export default Shoucang;