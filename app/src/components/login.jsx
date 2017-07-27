import React from 'react';
import { List, InputItem, Toast ,Button,Modal,NavBar, Drawer } from 'antd-mobile';
import { Link , hashHistory} from 'react-router';
import $ from 'jquery';
 class Login extends React.Component {
 	constructor(props){
	    super(props);
	    this.state = {
	      title: '欢迎登录',
	      open: false,
	    };
	 }
 	state = {
	    hasError: false,
	    value: localStorage.getItem('tel'),
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
        Toast.info('请输入正确的用户名');
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
	  goReg = () =>{
	  	var _this=this;
	  	var tel = this.state.value;
	  	var psw = document.getElementById('psw').value;
	  	console.log(tel)
		if(!this.checkTel(tel)){
			this.setState({tit:'登录状态',con:'手机号码不符合'});
			this.showModal('modal1')
		}else if(psw==''){
			this.setState({tit:'登录状态',con:'密码不能为空'});
			this.showModal('modal1')
		}else{
		  	//执行登录
		  	 Toast.loading('登录中...', 0.5);
		  		$.ajax({
					type:"post",
					url:"http://wangzhisheng.info/php/login.php",
					async:true,
					data:{user:tel,password:psw},
					success:function(data){
						console.log(data);
						if(data==0){
							//
							_this.setState({tit:'登录状态',con:'账号或密码不存在，请重新登录'});
							_this.showModal('modal1')
						}else{
							data = JSON.parse(data);
							localStorage.setItem('tel',data[0]);
							localStorage.setItem('user',data[1]);
							localStorage.setItem('imgSrc',data[2]);
							_this.setState({tit:'登录成功',con:'去首页',flag:true});
							_this.showModal('modal1')
						}
					},
					error:function(err){
						console.log(err);
					}
				});
		  }
	  }
	render(){
		let sty={
			regBox:{
				'marginTop':'20vh',
				'width':'100%',
				'height':'50vh',
				'fontSize':'0.28rem'
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
		            placeholder="请输入手机号码或用户名"
		            error={this.state.hasError}
		            onErrorClick={this.onErrorClick}
		            onChange={this.telOnChange}
		            value={this.state.value}
		          >用户名</InputItem>
		          <InputItem
		            type="password"
		            placeholder="****"
		          id='psw'>密码</InputItem>
		        </List>
		        <div className="btn-container">
		        <Button className="btn" type="primary" onClick={
		        	()=>{
		        		this.goReg()
		        	}
		        }>登录</Button>
		        <p style={{'textAlign':'center'}}>
		        	没有账号?<Link to="/regist">请注册</Link>
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
export default Login
