import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import $ from  'jquery'; 

export default class Banner extends React.Component {
 state = {
    data: [],
    value:[],
    name:[],
    src:[],
    width:'300',
    initialHeight: 200,
 }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
   			 let _this=this
   				 let banarr=['989994','7879','1147271','60671','985806'];
   				  let value=['薛之谦','陈奕迅','鹿晗','周杰伦','金润吉'];
   				   let name=['绅士','浮夸','致爱','夜曲','路'];
   				  let src=['102425546','1251166','104251904','718477','102380700'];
   				  _this.setState({
			        data:banarr ,
			        value:value,
			        name:name,
			        src:src
			      });
    }, 100);
  }	   

   render() {
   
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
         <div>
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={2}
          swipeSpeed={35}
        >
          {this.state.data.map((ii,j) => (
            <a  key={ii} id={ii} className='imgid' value={this.state.value[j]}
                name={this.state.name[j]}
                src={this.state.src[j]}  style={hProp}>
              <img  
                src={`http://imgcache.qq.com/music/photo/album_300/${ii%100}/300_albumpic_${ii}_0.jpg`}
                alt={ii} 
                
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>
        </div>
    );
  }
}
