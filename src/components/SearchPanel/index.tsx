import React, { createRef } from 'react';
import styles from './index.less';
import {  Modal, SearchBar, List } from 'antd-mobile';

const Item = List.Item;


type Props = {
  map:any;
  AMap:any;
  myPosition:any;
};

export default class extends React.Component<Props> {


  state = {
    searchBarDisplay: false,
    tipsList: [],
  };

  searchBar = createRef<SearchBar>();


  openSearchModal = () => {
    this.setState({
      searchBarDisplay: true,
    }, () => {
      // @ts-ignore
      this.searchBar.current.focus();
    });
  };


  closeSearchModal = () => {
    this.setState({
      searchBarDisplay: false,
    });
  };

  onTipsClick = (item: any) => {
    this.closeSearchModal();

    let transferOption = {
      city: '珠海市',
      nightflag: true, // 是否计算夜班车
      policy: this.props.AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
    };


    let transfer = new this.props.AMap.Transfer(transferOption);

    //根据起、终点坐标查询公交换乘路线
    transfer.search(new this.props.AMap.LngLat(this.props.myPosition.lng, this.props.myPosition.lat), new this.props.AMap.LngLat(item.location.lng, item.location.lat),
      (status: string, result: any) => {
        // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
        if (status === 'complete') {
          let route = result.plans[0];
          if (result.plans && result.plans.length) {
            let startMarker = new this.props.AMap.Marker({
              position: route.segments[0].transit.origin,
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
              map: this.props.map,
            });

            let endMarker = new this.props.AMap.Marker({
              position: route.segments[route.segments.length - 1].transit.destination,
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
              map: this.props.map,
            });

            let routeLines = [];

            for (let i = 0, l = route.segments.length; i < l; i++) {
              let segment = route.segments[i];
              let line = null;

              line = new this.props.AMap.Polyline({
                path: segment.transit.path,
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 2,
                strokeWeight: 5,
                strokeColor: '#0091ff',
                lineJoin: 'round',
                strokeStyle: 'solid',
              });

              line.setMap(this.props.map);
              routeLines.push(line);
            }

            // 调整视野达到最佳显示区域
            this.props.map.setFitView([startMarker, endMarker].concat(routeLines));
          }

        } else {
        }
      });
  };

  onSearchBarChange = (val: string) => {
    if (!val) {
      this.setState({
        tipsList: [],
      });
      return;
    }
    this.props.AMap.plugin('AMap.Autocomplete', () => {
      let autoComplete = new this.props.AMap.Autocomplete({
        city: '珠海市',
        datatype: 'poi|bus',
      });
      autoComplete.search(val, (status: any, result: any) => {
        this.setState({
          tipsList: result.tips.reverse(),
        });
      });
    });
  };


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <Modal visible={this.state.searchBarDisplay}>
        <div className={styles.modal}>
          <SearchBar onChange={this.onSearchBarChange} className={styles.searchPanel} ref={this.searchBar} placeholder={'请输入您的目的地'} onBlur={this.closeSearchModal} onCancel={this.closeSearchModal}/>
          <List>
            {this.state.tipsList && this.state.tipsList.map((item: any) => <Item arrow={'horizontal'} onClick={this.onTipsClick.bind(this, item)} key={item.name}>{item.name}</Item>)}
          </List>
        </div>
      </Modal>
    );
  }
}
