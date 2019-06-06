import React, { createRef } from 'react';
import styles from './index.less';
import {Toast,Icon,Modal,SearchBar,List} from 'antd-mobile';
const Item = List.Item

export default class extends React.Component {

  map: any;

  // @ts-ignore
  AMap = window.AMap;

  state={
    searchBarDisplay:true,
    tipsList:[]
  }

  myPosition = {}

  searchBar = createRef<SearchBar>()

  toastFailAndCenterToZhuHai = ()=>{
    Toast.fail("定位失败，默认为您定位到珠海市")
    this.map.setZoomAndCenter(12,[113.54712,22.255168])
    this.myPosition = {
      lat:22.255168,
      lng:113.54712
    }
  }

  openSearchModal = ()=>{
    this.setState({
      searchBarDisplay:true
    },()=>{
      // @ts-ignore
      this.searchBar.current.focus()
    })
  }


  onTipsClick = (item:any)=>{
    console.log(item)
    this.closeSearchModal()

    let transferOption = {
      city: '珠海市',
      nightflag: true, // 是否计算夜班车
      policy: this.AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
    }

    let transfer = new this.AMap.Transfer(transferOption)

    //根据起、终点坐标查询公交换乘路线
/*
    transfer.search(new this.AMap.LngLat(116.291035,39.907899), new this.AMap.LngLat(116.427281, 39.903719), (status, result)=> {
      // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
      if (status === 'complete') {
        let route = result.plans[0]
        if (result.plans && result.plans.length) {
          let startMarker = new this.AMap.Marker({
            position: route.segments[0].transit.origin,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            map: map
          })

          let endMarker = new this.AMap.Marker({
            position: route.segments[route.segments.length - 1].transit.destination,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: this.map
          })

          let routeLines = []

          for (let i = 0, l = route.segments.length; i < l; i++) {
            let segment = route.segments[i]
            let line = null

            line = new this.AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              lineJoin: 'round',
              strokeStyle: 'solid'
            })

            line.setMap(this.map)
            routeLines.push(line)
          }

          // 调整视野达到最佳显示区域
          this.map.setFitView([ startMarker, endMarker ].concat(routeLines))
        }

      } else {
      }
    });
*/
  }

  onSearchBarChange = (val:string)=>{
    if (!val){
      this.setState({
        tipsList:[]
      })
      return
    }
    this.AMap.plugin('AMap.Autocomplete', ()=>{
      let autoComplete = new this.AMap.Autocomplete({
        city: '珠海市',
        datatype:'poi|bus'
      });
      autoComplete.search(val, (status:any, result:any)=>{
        this.setState({
          tipsList:result.tips.reverse()
        })
      })
    })
  }

  closeSearchModal= ()=>{
    // this.setState({
    //   searchBarDisplay:false
    // })
  }

  componentDidMount(): void {
    this.map = new this.AMap.Map('container', {
      resizeEnable:true,
      zoom:12
    });
    this.map.plugin('AMap.Geolocation',  ()=> {
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
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      this.AMap.event.addListener(geolocation, 'complete', (res:any)=>{
        console.log("定位",res)
        if (res.addressComponent){
          if (res.addressComponent.city!=='珠海市'){
            Toast.info("亲~非珠海市地区无法体验完整功能噢，这边建议您先收藏着，以后来珠海玩再使用")
          }
        }else {
          this.toastFailAndCenterToZhuHai()
        }
      });//返回定位信息
      this.AMap.event.addListener(geolocation, 'error', ()=>{
        this.toastFailAndCenterToZhuHai()
      });      //返回定位出错信息
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    // axios.get("http://localhost:3000/bus?handlerName=GetLineListByLineName&key=60&_="+new Date().getTime()).then((res)=>{
    //   console.log(res)
    // })


    return (
        <div className={styles.map} id="container">
          <Modal  visible={this.state.searchBarDisplay}>
            <div className={styles.modal}>
              <SearchBar onChange={this.onSearchBarChange} className={styles.searchBar} ref={this.searchBar} placeholder={"请输入您的目的地"} onBlur={this.closeSearchModal} onCancel={this.closeSearchModal} />
              <List>
                {this.state.tipsList&&this.state.tipsList.map((item:any)=><Item arrow={"horizontal"} onClick={this.onTipsClick.bind(this,item)} key={item.name}>{item.name}</Item>)}
              </List>
            </div>
          </Modal>
          <Icon onClick={this.openSearchModal}  className={styles.searchIcon} type={"search"} />
        </div>
    );
  }

}
