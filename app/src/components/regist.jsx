import React from 'react';
import { List, InputItem, Toast ,Button,Modal, NavBar, Drawer } from 'antd-mobile';
import { Link , hashHistory } from 'react-router';
import $ from 'jquery';
 class Regist extends React.Component {
 	constructor(props){
	    super(props);
	    this.state = {
	      title: 'app',
	      open: false,
	    };
	  }
 	state = {
	    hasError: false,
	    value: '',
	    telValue:'',
	    pswValue:'',
	    rePswValue:'',
	    flag:false,
	     modal1: false,
	     tit:'',
	     con:''
	}
    onErrorClick = () => {
      if (this.state.hasError) {
        Toast.info('请输入11位的电话号码');
      }
    }
    showModal =(key)=> {
	    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
	    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
//	    e.preventDefault(); // 修复 Android 上点击穿透
	    console.log('cacac')
	    this.setState({
	      [key]: true,
	    });
	  }
    onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
	  telOnChange = (value) => {
	    if (value.replace(/\s/g, '').length < 11) {
	      this.setState({
	        hasError: true,
	      });
	    } else {
	      this.setState({
	        hasError: false,
	      });
	    }
	    this.setState({
	      value
	    });
	  }
	  checkTel = (tel) =>{
	  	if((/^1[3|4|5|7|8][0-9]{9}$/.test(tel))) {
			return true;
		} else {
			return false;
		}
	  }
	  getMessage = () =>{
	  	return(prompt('输入名字', '匿名用户',
	      [
	        { text: '取消' },
	        {
	          text: '提交',
	          onPress: value => new Promise((resolve) => {
	            Toast.info('onPress promise', 1);
	            setTimeout(() => {
	              resolve();
	              console.log(`value:${value}`);
	            }, 1000);
	          }),
	        },
	      ]))
	  }
	  goReg = () =>{
	  	var _this=this;
	  	var tel = this.state.value;
	  	var psw = document.getElementById('psw').value;
	  	var rePsw = document.getElementById("rePsw").value;
	  	console.log(tel)
		if(!this.checkTel(tel)){
			this.setState({tit:'注册状态',con:'手机号码不符合'});
			this.showModal('modal1')
		}else if(psw!=rePsw){
	  		this.setState({tit:'注册状态',con:'两次密码不一致'});
	  		this.showModal('modal1')
	  }else{
	  	var str = this.getMessage();
		  if(str==''||str==null){
		  	this.setState({tit:'注册状态',con:'请输入昵称'});
		  	this.showModal('modal1')
		  }else{
		  	//执行注册
		  	 Toast.loading('注册中...', 0.5);
		  		$.ajax({
					type:"post",
					url:"http://wangzhisheng.info/php/regist.php",
					async:true,
					data:{tel:tel,pwd:psw,name:str},
					success:function(data){
						console.log(data);
						if(data==1){
							//
							localStorage.setItem('tel',tel);
							_this.setState({tit:'注册成功',con:'去首页',flag:true});
							_this.showModal('modal1')
							
						}else{
							
							_this.setState({tit:'注册状态',con:'该手机号码已被注册'});
							_this.showModal('modal1')
						}
					},
					error:function(err){
						console.log(err);
					}
				});
		  }
	  	}
	  }
	render(){
		let sty={
			regBox:{
				'marginTop':'20vh',
				'width':'100%',
				'height':'50vh',
				'fontSize':'0.28rem'
			},
			regList:{
				
			}
		}
		return(
			 <div className="container">
		        <NavBar mode="light"
		          onLeftClick={() => hashHistory.goBack()}
		          rightContent={<b onClick={() => this.setState({ open: true })}>...</b>}
		        >
		          {this.state.title}
		        </NavBar>
				<div style={sty.regBox}>
					<List style={sty.regList}>
			          <InputItem
			            placeholder="请输入你常用的手机号码"
			            error={this.state.hasError}
			            onErrorClick={this.onErrorClick}
			            onChange={this.telOnChange}
			            value={this.state.value}
			          >手机号码</InputItem>
			          <InputItem
			            type="password"
			            placeholder="****"
			          id='psw'>密码</InputItem>
			          <InputItem
			            type="password"
			            placeholder="请再次输入密码"
			          id='rePsw'>密码确认</InputItem>
			        </List>
			        <div className="btn-container">
			        <Button className="btn" type="primary" onClick={
			        	()=>{
			        		this.goReg()
			        	}
			        }>注册</Button>
			        <p style={{'textAlign':'center'}}>
			        	已有账号?<a href="">请登录</a>
			        </p>
					</div>
			        <Modal
			          title={this.state.tit}
			          transparent
			          maskClosable={false}
			          visible={this.state.modal1}
			          onClose={this.onClose('modal1')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); if(this.state.flag){location.href='index.html'}} }]}
			        >
			          {this.state.con}<br />
			        </Modal>
				</div>
			</div>
		)
	}
}
export default Regist
