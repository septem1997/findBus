import React, { createRef } from 'react';
import styles from './index.less';
import { Toast, Icon, List } from 'antd-mobile';
import SearchPanel from '@/components/SearchPanel';

export default class extends React.Component {

  // @ts-ignore
  AMap = window.AMap;

  state = {
    searchBarDisplay: false,
    tipsList: [],
    myPosition : {
      lat: 22.255168,
      lng: 113.54712,
    },
    map:new this.AMap.Map('container', {
      resizeEnable: true,
      zoom: 12,
    })
  };



  searchPanel = createRef<SearchPanel>();

  toastFailAndCenterToZhuHai = () => {
    Toast.fail('定位失败，默认为您定位到珠海市');
    this.state.map.setZoomAndCenter(12, [113.54712, 22.255168]);
    this.setState({
      myPosition:{
        lat: 22.255168,
        lng: 113.54712,
      }
    })
  };


  async componentDidMount(): Promise<void> {
    await new Promise((resolve) => {
      this.setState({
        map: new this.AMap.Map('container', {
          resizeEnable: true,
          zoom: 12,
        })
      },()=>{
        resolve()
      })
    })

    this.AMap.plugin('AMap.Transfer');
    this.AMap.plugin('AMap.TransferPolicy');
    this.state.map.plugin('AMap.Geolocation', () => {
      let geolocation = new this.AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new this.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      this.state.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      this.AMap.event.addListener(geolocation, 'complete', (res: any) => {
        if (res.addressComponent) {
          if (res.addressComponent.city !== '珠海市') {
            Toast.info('亲~非珠海市地区无法体验完整功能噢，这边建议您先收藏，以后来珠海玩再使用');
          }
        } else {
          this.toastFailAndCenterToZhuHai();
        }
      });//返回定位信息
      this.AMap.event.addListener(geolocation, 'error', () => {
        this.toastFailAndCenterToZhuHai();
      });      //返回定位出错信息
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    // axios.get("http://localhost:3000/bus?handlerName=GetLineListByLineName&key=60&_="+new Date().getTime()).then((res)=>{
    //   console.log(res)
    // })

    let openSearchModal = ()=>{
      return this.searchPanel.current?this.searchPanel.current.openSearchModal():null;
    }

    return (
      <div className={styles.map} id="container">
        <SearchPanel myPosition={this.state.myPosition} AMap={this.AMap} map={this.state.map} ref={this.searchPanel}/>
        <Icon onClick={openSearchModal} className={styles.searchIcon} type={'search'}/>
      </div>
    );
  }

}
