import React, { Component } from 'react';
import { Modal, Button, WingBlank, WhiteSpace, Toast, Icon } from 'antd-mobile';
import { hashHistory } from 'react-router';
import $ from 'jquery';

const prompt = Modal.prompt;
export default class Play extends Component {

	constructor(props) {
		super(props);
		this.state = {
			songname: '他不懂',
			autname: '张杰',
			src: '',
			imgsrc: '',
			arr: [],
			collect: '',
			id: '',
			tel: 15703976067,
			res: ''
		};
	}
	tap(e) {
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
		let oBody = $('#bodys');
		let word = $('#word');
		if(flag) {
			oBody.css({ 'transform': 'rotateY(-90deg)', 'opacity': '0' })
			word.css({ 'transform': 'rotateY(0deg)', 'opacity': '1' })
			flag = false;
		} else {
			oBody.css({ 'transform': 'rotateY(0deg)', 'opacity': '1' })
			word.css({ 'transform': 'rotateY(-90deg)', 'opacity': '0' })
			flag = true;
		}

	}
	componentWillMount() {
		this.setState({
			tel: Number(localStorage.getItem('tel')),
			id: Number(localStorage.getItem('songid')),
			songname: localStorage.getItem('songername'),
			autname: localStorage.getItem('songname'),
			src: 'http://ws.stream.qqmusic.qq.com/' + localStorage.getItem('songid') + '.m4a?fromtag=46',
			imgsrc: Number(localStorage.getItem('imgid')),
			id: Number(localStorage.getItem('songid'))
		})
	}

	componentDidMount() {

		let _this = this;
		var oP = document.getElementsByTagName('li');
		let index = 0;
		let num = 0;
		var coll = document.getElementById('collect')
		let id = this.state.id;
		let text, html = '';
		let newArr = [];
		let txt = `http://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`;

		$.ajax({
				url: 'http://wangzhisheng.info/php/del.php',
				type: 'POST',
				data: { txt },
				success: function(data) {
					text = data.split('[offset:0]')[1];
				}
			})
			.done(function() {
				text = text.replace(/\n/g, '');
				let textArr = text.split('[');
				var l = textArr.length;
				for(let i = 0; i < l; i++) {
					let text, html = '';
					let arr = textArr[i].split("]"); //分隔歌词与时间
					let time = arr[0].split("."); //分隔毫秒与其他时间
					let timer = time[0].split(":"); //分隔分钟与秒
					let ms = timer[0] * 60 + timer[1] * 1; //转化为秒钟
					let txt = arr[1];
					if(txt) {
						let obj = {
							time: ms,
							list: txt
						}
						newArr.push(obj)
					}
				}
				_this.setState({ arr: newArr })

			})
		let user = localStorage.getItem('tel');
		$.get('http://wangzhisheng.info/php/getLoveMusic.php', { tel: user }, function(data) {
			let datas = JSON.parse(data);

			_this.setState({ collect: datas })

			for(var i = 0; i < datas.length; i++) {
				if(datas[i][0] == _this.state.id) {
					coll.style.color = 'red';
					break;
				}
			}
		})

		$('#jdt').on('click', function(e) {
			let x = e.offsetX;
			let w = $(this).width();
			let sun = x / w;
			_this.refs.aud.currentTime = _this.refs.aud.duration * sun;
			let times = _this.refs.aud.currentTime
			let l = oP.length;
			for(let i = 0; i < l; i++) {
				if(oP[i].id > times && oP[i].id < times + 5) {
					for(let j = 0; j < l; j++) {
						oP[j].style.color = 'rgba(255,255,255,.7)';
						oP[j].style.transform = 'scale(1)';
					}
					i--;
					oP[i].style.color = 'rgba(255,255,255,1)';
					oP[i].style.transform = 'scale(1.2)';
					let sum = -.6 * (i - 5) + "rem";
					$('#liss').stop().animate({ 'top': sum }, 500)
					break;
				}
			}
		})
		function bar(dev) {
			return Math.floor(dev / 60) + ":" + (dev % 60 / 100).toFixed(2).slice(-2);
		}
		this.refs.aud.addEventListener('timeupdate', function() {
			foo(this)
		})
		let liststyles = localStorage.getItem('style');
		if(liststyles) {
			switch(liststyles) {
				case 'sx':
					$('#sx').addClass('ckit').siblings().removeClass('ckit');
					break;
				case 'sj':
					$('#sj').addClass('ckit').siblings().removeClass('ckit');
					break;
			}
		} else {
			$('#sx').addClass('ckit').siblings().removeClass('ckit');
		}
		this.refs.aud.addEventListener('timeupdate', function() {
			let liststyle = localStorage.getItem('style');
			if(liststyle) {
				switch(liststyle) {
					case 'sx':

						if(this.currentTime == this.duration) {
							let user = localStorage.getItem('tel');
							if(!user) {
								return Toast.info('请先登录', 1);
							}
							let arr = _this.state.collect
							let num = localStorage.getItem('songid')

							$.get('http://wangzhisheng.info/php/getLoveMusic.php', { tel: user }, function(data) {
								let datas = JSON.parse(data);

								if(!datas) {
									return Toast.info('收藏列表为空', 1);
								}
								let index = 0;
								for(let i = 0; i < datas.length; i++) {
									if(datas[i][0] == num) {
										index = i;
										break;
									}
								}
								index++;
								if(index > datas.length - 1) {
									index = 0;
								}
								localStorage.setItem('songid', datas[index][0]);
								localStorage.setItem('songername', datas[index][1]);
								localStorage.setItem('songname', datas[index][2]);
								localStorage.setItem('imgid', datas[index][3]);
								location.reload();
							})
						}
						break;

					case 'sj':
						if(this.currentTime == this.duration) {
							let user = localStorage.getItem('tel');
							if(!user) {
								return Toast.info('请先登录', 1);
							}
							let arr = _this.state.collect
							let num = localStorage.getItem('songid')

							$.get('http://wangzhisheng.info/php/getLoveMusic.php', { tel: user }, function(data) {
								let datas = JSON.parse(data);
								if(!datas) {
									return Toast.info('收藏列表为空', 1);
								}
								let index = 0;
								index = Math.floor(Math.random() * (arr.length - 1));
								localStorage.setItem('songid', datas[index][0]);
								localStorage.setItem('songername', datas[index][1]);
								localStorage.setItem('songname', datas[index][2]);
								localStorage.setItem('imgid', datas[index][3]);
								location.reload();
							})
						}
						break;
				}
			} else {
				if(this.currentTime == this.duration) {
					let user = localStorage.getItem('tel');
					if(!user) {
						return Toast.info('请先登录', 1);
					}
					let arr = _this.state.collect
					let num = localStorage.getItem('songid')
					$.get('http://wangzhisheng.info/php/getLoveMusic.php', { tel: user }, function(data) {
						let datas = JSON.parse(data);
						if(!datas) {
							return Toast.info('收藏列表为空', 1);
						}
						let index = 0;
						for(let i = 0; i < datas.length; i++) {
							if(datas[i][0] == num) {
								index = i;
								break;
							}
						}
						index++;
						if(index > datas.length - 1) {
							index = 0;
						}
						localStorage.setItem('songid', datas[index][0]);
						localStorage.setItem('songername', datas[index][1]);
						localStorage.setItem('songname', datas[index][2]);
						localStorage.setItem('imgid', datas[index][3]);
						location.reload();
					})
				}
			}
		})
		this.refs.after.style.display = 'block';
		this.refs.aud.play();
		function foo(aud) {
			let curtime = parseInt(aud.currentTime);
			_this.refs.times.innerHTML = bar(parseInt(aud.duration));
			_this.refs.time.innerHTML = bar(curtime);
			_this.refs.plan.style.width = parseInt(aud.currentTime) / parseInt(aud.duration) * 100 + '%';
			_this.refs.after.style.left = _this.refs.plan.offsetWidth - 4 + 'px';
			let l = oP.length;
			if(document.getElementById(curtime)) {
				for(let i = 0; i < l; i++) {
					oP[i].style.color = 'rgba(255,255,255,.7)';
					oP[i].style.transform = 'scale(1)';
				}
				index = $('#' + curtime).index();
				document.getElementById(curtime).style.color = 'rgba(255,255,255,1)';
				document.getElementById(curtime).style.transform = 'scale(1.2)';
			}
			if(aud.currentTime == aud.duration) {
				return;
			}
			if(index) {
				if(oP[index].id == curtime) {
					let sum = -.6 * (index - 4) + "rem";
					$('#liss').stop().animate({ 'top': sum }, 200)
				}
			}
		}

		$('.cki span').on('click', function() {
			$(this).addClass('ckit').siblings().removeClass('ckit')
		})

	}
	back() {
		let aud = document.getElementById('aud');
		aud.pause();
		hashHistory.goBack()
	}
	render() {
		return(
			<div style = {{'height':'100vh','overflow':'hidden'}}>
            <div style = {style.head}>
                <Icon type="left" onClick={this.back} style = {style.headleft} />
                Music
                <Icon type="ellipsis" style = {style.headright}/>
            </div>
            <div style = {style.bodywrap}>
                <p style = {style.links}>
                    <Icon id='collect' onClick ={()=>{
                        let user = localStorage.getItem('tel');
                        if(!user){
                            return Toast.info('请先登录', 1);
                        }

                        var coll = document.getElementById('collect')
                        var color = coll.style.color;
                        let _this = this;

                        if(color == 'red'){
                            let tel = this.state.tel;
                            let songID =this.state.id;

                            $.post('http://wangzhisheng.info/php/saveLoveMusic.php',{
                                delTel:tel,
                                delSongId:songID
                            },function(data){
                                coll.style.color = 'white'
                                Toast.info('取 消 收 藏', 1);
                            })
                        }else {
                            let tel = this.state.tel;
                            let songID =this.state.id;
                            let songerName = this.state.autname;
                            let songName = this.state.songname;
                            let imgsrc = this.state.imgsrc;
                            $.post('http://wangzhisheng.info/php/saveLoveMusic.php',{
                                tel:tel,
                                userName:'',
                                songId:songID,
                                songerName:songerName,
                                songName:songName,
                                songImgId:imgsrc
                            },function(data){
                                if(data == '1'){
                                    coll.style.color = 'red'
                                    Toast.info('收 藏 成 功', 1);
                                }
                            })

                        }
                        }} type="check-circle-o" size="md" color="#fff" style={{'margin':'.5rem .4rem 0 .4rem','width':'.7rem','height':'.7rem'}} />
                    <Icon  id='share' onClick = {()=>{
                        let use = localStorage.getItem('user');
                        let tel = localStorage.getItem('tel');
                        let songName = localStorage.getItem('songname');
                        let songerName = localStorage.getItem('songername');
                        let imgId = localStorage.getItem('imgid');
                        
                        let songId = this.state.id;
                        if(!tel){
                            return Toast.info('请先登录', 1);
                        }
                        prompt('分享至您的动态', '',
                          [
                            { text: '取消' },
                            {
                              text: '分享',
                              onPress: value => new Promise((resolve) => {
                                Toast.info('分 享 成 功', 1);
                                  resolve();
                                  $.ajax({
                      				type:"post",
                      				url:"http://wangzhisheng.info/php/musicShare.php",
                      				async:true,
                      				data:{tel:tel,imgId:imgId,songerName:songerName,songName:songName,content:value,username:use,date:getDate(),songId:songId}
                      			});
                              }),
                            },
                          ])
                        function getDate(){
            				var oDate = new Date();
            				var year = oDate.getFullYear();
            				var month = oDate.getMonth()+1;
            				var day = oDate.getDate();
            				var hours = oDate.getHours();
            				var minutes = oDate.getMinutes();
            				var seconds = oDate.getSeconds();
            				month = month<10?'0'+month:month;
            				day = day<10?'0'+day:day;
            				minutes = minutes<10?'0'+minutes:minutes;
            				seconds = seconds<10?'0'+seconds:seconds;
            				var str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            				return str;
            			}
                        }} type="check-circle" size="md" color="#fff"  style={{'margin':'.5rem .4rem 0 .4rem','width':'.7rem','height':'.7rem'}} />
                </p>
                <div onClick = {this.tap} style = {{'position':'relative','height':'53%'}}>
                    <div style = {style.body} id = 'bodys'>
                        <div style = {style.conhead} className = 'headpic'>
                            <img style={{'width':'100%','height':'100%'}} src = {`http://imgcache.qq.com/music/photo/album_300/${this.state.imgsrc%100}/300_albumpic_${this.state.imgsrc}_0.jpg`} />
                        </div>
                        <p style = {style.songname}>{this.state.songname}</p>
                        <p style = {style.autname}>{this.state.autname}</p>
                    </div>

                    <div style = {style.bodyrod} id = 'word'>
                        <div style = {{'width':'100%','height':'75%','overflow':'hidden','position':'absolute','top':'10%','right':'0','left':'0','margin':'auto'}}>
                            <ul ref='lis' id = 'liss' style = {{'color':'#fff','textAlign':'center','position':'relative'}}>
                                {
                                        this.state.arr.map(function(item){
                                            return <li style = {style.lists} id={item.time}>{item.list}</li>;
                                        })
                                }
                            </ul>
                        </div>

                        <audio src = {this.state.src}  ref='aud' id = 'aud'></audio>

                    </div>
                </div>

                <WhiteSpace size="lg" />
                <div style = {{'width':'100%','height':'38%','position':'absolute','bottom':'0'}}>
                    <div style = {style.jdwrap}>
                        <span ref='time' style = {{'fontSize':'.2rem','color':'#fff','width':'.3rem','marginRight':'.3rem'}}></span>
                        <div id = 'jdt'  style = {{'borderRadius':'.2rem',"height":'.1rem',"marginTop":'.08rem','flex':'1','background':'rgba(255,255,255,.5)'}}>
                            <p id = 'plan' ref = 'plan' style = {{'borderRadius':'.2rem',"height":'.1rem','background':'rgba(255,255,255,.8)'}}></p>
                            <em ref = 'after' style={{'top':'-.15rem','position':'relative','width':'.2rem','height':'.2rem','borderRadius':'50%','background':'#fff'}}></em>
                    </div>
                        <span ref='times' style = {{'fontSize':'.2rem','color':'#fff','width':'.3rem','marginLeft':'.3rem'}}></span>
                    </div>
                    <div style = {style.footer}>
                        <Icon type="left" style = {style.plays} onClick = {()=>{
                            let _this = this;
                            let s = localStorage.getItem('style');
                            if(s == 'sj'){
                                let user = localStorage.getItem('tel');
                                if(!user){
                                    return Toast.info('请先登录', 1);
                                }
                                let arr = _this.state.collect
                                let num = localStorage.getItem('songid')

                                $.get('http://wangzhisheng.info/php/getLoveMusic.php',{tel:user},function(data){
                                    let datas = JSON.parse(data);
                                    if(!datas){
                                        return Toast.info('收藏列表为空', 1);
                                    }
                                    let index = 0;
                                    index = Math.floor(Math.random()*(arr.length-1));
                                    localStorage.setItem('songid',datas[index][0]);
                                    localStorage.setItem('songername',datas[index][1]);
                                    localStorage.setItem('songname',datas[index][2]);
                                    localStorage.setItem('imgid',datas[index][3]);
                                    location.reload();
                            })
                        }else {
                                let user = localStorage.getItem('tel');
                                if(!user){
                                    return Toast.info('请先登录', 1);
                                }

                                let arr = this.state.collect
                                let num = localStorage.getItem('songid')
                                let _this = this;
                                $.get('http://wangzhisheng.info/php/getLoveMusic.php',{tel:user},function(data){
                                    let datas = JSON.parse(data);

                                    if(!datas){
                                        return Toast.info('收藏列表为空', 1);
                                    }
                                    let index = 0;
                                    for(let i = 0;i < datas.length;i++){
                                        if(datas[i][0] == num){
                                            index = i;
                                            break;
                                        }
                                    }
                                    index--;

                                    if(index < 0){
                                        index = datas.length - 1;
                                    }
                                    localStorage.setItem('songid',datas[index][0]);
                                    localStorage.setItem('songername',datas[index][1]);
                                    localStorage.setItem('songname',datas[index][2]);
                                    localStorage.setItem('imgid',datas[index][3]);
                                    location.reload();
                                })
                                }
                            }}/>
                        <Icon type="loading" style = {style.plays}  onClick = {this.stop}/>
                        <Icon type="right" style = {style.plays} id = 'under' onClick = {()=>{
                                let _this = this;
                                let s = localStorage.getItem('style');

                            if(s == 'sj'){
                                let user = localStorage.getItem('tel');
                                if(!user){
                                    return Toast.info('请先登录', 1);
                                }
                                let arr = _this.state.collect
                                let num = localStorage.getItem('songid')

                                $.get('http://wangzhisheng.info/php/getLoveMusic.php',{tel:user},function(data){
                                    let datas = JSON.parse(data);
                                    if(!datas){
                                        return Toast.info('收藏列表为空', 1);
                                    }
                                    let index = 0;
                                    index = Math.floor(Math.random()*(arr.length-1));
                                    localStorage.setItem('songid',datas[index][0]);
                                    localStorage.setItem('songername',datas[index][1]);
                                    localStorage.setItem('songname',datas[index][2]);
                                    localStorage.setItem('imgid',datas[index][3]);
                                    location.reload();

                                })

                            }else {


                                let user = localStorage.getItem('tel');
                                if(!user){
                                    return Toast.info('请先登录', 1);
                                }
                                let arr = this.state.collect
                                let num = localStorage.getItem('songid')

                                $.get('http://wangzhisheng.info/php/getLoveMusic.php',{tel:user},function(data){
                                    let datas = JSON.parse(data);

                                    if(!datas){
                                        return Toast.info('收藏列表为空', 1);
                                    }
                                    let index = 0;
                                    for(let i = 0;i < datas.length;i++){
                                        if(datas[i][0] == num){
                                            index = i;
                                            break;
                                        }
                                    }
                                    index++;
                                    if(index > datas.length - 1){
                                        index = 0;
                                    }
                                    localStorage.setItem('songid',datas[index][0]);
                                    localStorage.setItem('songername',datas[index][1]);
                                    localStorage.setItem('songname',datas[index][2]);
                                    localStorage.setItem('imgid',datas[index][3]);
                                    location.reload();
                                })

                            }
                            }}/>
                    </div>
                    <div  className='cki' style = {style.footer} >
                        <span id = 'sx' className = 'ckit' onClick = {()=>{
                                $('#aud').removeAttr('loop')
                                localStorage.setItem('style','sx');
                                Toast.info('列表循环', 1);
                            }}>列表循环</span>
                        <span onClick = {()=>{

                                $('#aud').attr('loop','loop');
                                $('#aud').off('timeupdate');
                                localStorage.setItem('style','loop');
                                Toast.info('单曲循环', 1)

                            }}>单曲循环</span>
                        <span id = 'sj' onClick = {()=>{
                            localStorage.setItem('style','sj');
                            Toast.info('随机播放', 1)
                            }}>随机播放</span>
                    </div>
                </div>
            </div>
        </div>
		);
	}

	stop() {
		let aud = document.getElementById('aud');
		if(aud.paused) {
			aud.play();
			$('.headpic').css('animationPlayState', 'running')
		} else {
			aud.pause();
			$('.headpic').css('animationPlayState', 'paused')
		}
	}
}
let flag = true;
let style = {
	head: { 'width': '100%', 'height': '.7rem', 'color': '#fff', 'lineHeight': '.7rem', 'background': '#b49781', 'textAlign': 'center', 'fontSize': '.4rem', 'position': 'relative' },
	headleft: { 'fontSize': '.4rem', 'position': 'absolute', 'top': '.17rem', 'left': '.37rem' },
	headright: { 'fontSize': '.4rem', 'position': 'absolute', 'top': '.17rem', 'right': '.37rem' },
	bodyrod: { 'transform': 'rotateY(-90deg)', 'opacity': '0', 'fontFamily': '楷体', 'position': 'absolute', 'transform-style': 'preserve-3d', 'transition': 'all .5s', 'overflow': 'hidden', 'width': '100%', 'height': '100%' },
	bodywrap: { 'position': 'relative', 'background': '-webkit-linear-gradient(top, #9b8376 0%,#9c8476 19%,#7f6e6a 37%,#62585c 57%,#4e4a54 74%,#4e4a54 100%)', 'width': '100%', 'height': '100%', 'perspective': '150vw', 'perspective-origin': '0 0' },
	body: { 'transform': 'rotateY(0deg)', 'opacity': '1', 'position': 'absolute', 'fontFamily': '楷体', 'transform-style': 'preserve-3d', 'transition': 'all .5s', 'textAlign': 'center', 'overflow': 'hidden', 'width': '100%', 'height': '100%' },
	conhead: { 'overflow': 'hidden', 'width': '2.8rem', 'height': '2.8rem', 'border': '3px solid #df8f75', 'borderRadius': '50%', 'margin': '0 auto', 'marginTop': '2.1rem', 'background-size': '3.6rem' },
	songname: { 'color': 'rgba(255,255,255,.9)', 'fontSize': '.6rem', 'marginTop': '.5rem' },
	autname: { 'color': 'rgba(255,255,255,.9)', 'fontSize': '.4rem', 'marginTop': '.2rem' },
	con: { 'width': '80%', 'height': '2.5rem', 'border': '1px solid #000', 'margin': '0 auto', 'marginTop': '.3rem' },
	links: { 'display': 'flex', 'justifyContent': 'center', 'fontSize': '1rem', 'position': 'absolute', 'bottom': '39%', 'width': '100%' },
	jdwrap: { 'width': '80%', "height": '.2rem', 'margin': "1rem auto", 'marginBottom': '.7rem', 'display': 'flex' },
	footer: { 'color': '#fff', 'width': '80%', 'margin': '0 auto', 'marginTop': '.3rem', 'height': '1rem', 'lineHeight': '1rem', 'display': 'flex', 'justifyContent': 'space-between' },
	plays: { 'color': '#fff', 'height': '1rem' },
	lists: { 'letterSpacing': '.06rem', 'fontSize': '.3rem', 'height': '.4rem', 'marginTop': '.2rem', 'color': 'rgba(255,255,255,.7)', 'transition': 'all .3s' }
}