import React from 'react';
import styles from './index.css';
import axios from 'axios';
import router from 'umi/router';

export default class extends React.Component {


  componentDidMount(): void {
    // @ts-ignore
    let map = new window.AMap.Map('container', {
      resizeEnable:true,
      zoom:12
    });
    map.plugin('AMap.Geolocation', function () {
      let geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      window.AMap.event.addListener(geolocation, 'complete', (res)=>{
        console.log(res)
      });//返回定位信息
      window.AMap.event.addListener(geolocation, 'error', (err)=>{
        console.log(err)
      });      //返回定位出错信息
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    // axios.get("http://localhost:3000/bus?handlerName=GetLineListByLineName&key=60&_="+new Date().getTime()).then((res)=>{
    //   console.log(res)
    // })

    return (
      <div className={styles.normal} id="container"/>
    );
  }

}
