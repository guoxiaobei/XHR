import React from 'react';
import ReactDOM from 'react-dom';
import {Link}  from 'react-router';
export default class Hlist extends React.Component {
 	render(){
 		const list={
 		pic:[['77485','435269','1147271'],['62342','443691','140341'],['1181889','646647','852443']],
			data:['最新单曲','最新专辑','MV精选'],
		title:['欧美','内地','港台']
		};
 	return(
 		<div>
 	     {list.data.map((item,i) =>(
 	      	<div>
 	      	<p style={style.title} className='htit'>{item}</p>
 	      	<ul className='hlist'>
 	         {
 	         	list.title.map((items,l) =>(
 	         		<li>
 	         		<Link  to={"/list/"+list.pic[i][l]} id={list.pic[i][l]} >
 	         		<img
 	         		src={`http://imgcache.qq.com/music/photo/album_300/${list.pic[i][l]%100}/300_albumpic_${list.pic[i][l]}_0.jpg`}
 	         		alt='pic'
 	         		/></Link>
 	         		<p>{items}</p>
 	         		</li>
 	         	))
 	         }
 	      	</ul>
 	      	</div>
 	      	
 	      ))}
 		</div>
 	)
 }
}
let style={
	title:{paddingLeft:' 0.2rem',color:'#fff',borderLeft:'5px solid #fff',margin:'0.25rem 0 0 0.05rem',fontSize:'0.28rem'}
	
}
