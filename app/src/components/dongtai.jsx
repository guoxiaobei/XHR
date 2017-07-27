import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import $ from 'jquery';
import { Modal,List, Button,WingBlank,Toast,TextareaItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
export default class Dongtai extends React.Component{
		state={
			res:"",
			arrAll:[]
		}
	componentWillMount(){			
			var _this=this
			$.ajax({
				type:"get",
				url:"http://wangzhisheng.info/php/musicShare.php",
				dataType:"json",
				success:function(data){
					console.log(data)
					_this.setState({arrAll:data})
				}
			})
	}
	render(){
		return(
			<div style={{'overflow':'hidden'}}>
			{
				this.state.arrAll.map((item)=>{
					return <div style={{"background":"#ccc","paddingLeft":"0.2rem"}}>
					        	<div className="bottom">
					        		<div style={{"height":"1.5rem",'lineHeight':'1.5rem','borderBottom':'1px dashed #aaa'}}>
					        			<div style={{'float':'left',"width":"1.5rem","height":"1.5rem","borderRadius":"50%","backgroundImage":"url("+item[8]+")","backgroundSize":"cover"}}></div>
					        			<div style={{'float':'left','marginLeft':'0.5rem','animation': 'change 3s infinite'}}>{item[1]}</div>
					        		</div>
									<div className="pinglun" style={{}}>
										<div className="text" style={{"width":"84%","minHeight":"2.5rem","maxHeight":"3rem","padding":"0 0.5rem","overflow":"auto"}}>
										<p style={{'lineHeight':'1rem','borderBottom':'1px dashed #333','marginBottom':'0.3rem'}}>快来吐槽--->《{item[3]}》的<Link to='/playPage'><span style={{'marginLeft':'0.1rem','color':'greenyellow'}} className='box' alt={item[2]} name={item[4]} value={item[3]} src={item[5]}>{item[4]}</span></Link></p>
										{item[7]}
										</div>
										<div style={{"width":"100%","height":"1rem"}}>
											<p style={{'width':'55%','float':'left','height':'1rem','lineHeight':'1rem'}}><span>{item[6]}</span></p>
											<p style={{'width':'40%','float':'right','height':'1rem','lineHeight':'1rem'}}><img src="./src/zan.png" style={{"width":"0.5rem"}} onClick={this.tapss} className="praise-img" />1455<span style={{'marginLeft':'0.5rem'}}>评论</span></p>
										</div>
									</div>
								</div>
				      		</div>
				})
			}
			</div>
			
		)
	}
	taps(){
		let newArr = this.state.arr;
		var text=document.getElementsByClassName("text")[0]
		if($("textarea").val()){
			newArr.push($("textarea").val())
		this.setState({arr:newArr});
		$("textarea").val("")
		
		}
			$(".yin").hide()		
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