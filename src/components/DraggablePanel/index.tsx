import React, { ClassAttributes } from 'react';
import styles from './index.less'

type Props = {
  baseWidth:number,
  height:string,
  className:string,
  visible:boolean
};



export default class extends React.Component<Props> {

  touchMove = (e:any) => {
    let width = window.innerWidth-e.targetTouches[0].pageX
    // @ts-ignore
    if (width>this.panel.current.clientWidth||width<this.props.baseWidth){
      return
    }
    this.setState({
      slideWidth:width,
      transition:'none'
    })
  }

  touchEnd = ()=>{
    // @ts-ignore
    let clientWidth = this.panel.current.clientWidth
    let dis = clientWidth-this.props.baseWidth
    let slidedDis = this.state.slideWidth-this.props.baseWidth
    let slideOverHalf = dis/2<slidedDis
    this.setState({
      transition:'transform 300ms',
      slideWidth:slideOverHalf?clientWidth:this.props.baseWidth,
    })
  }

  state={
    slideWidth:this.props.baseWidth,
    transition:'none'
  }

  panel = React.createRef<HTMLDivElement>();

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    let slideWidth = this.state.slideWidth+'px'
    return (
      <div ref={this.panel} className={styles.panel + ' ' +this.props.className} style={{transition:this.state.transition,transform:'translateX(calc(100% - '+slideWidth+'))', height:this.props.height,display:this.props.visible?'block':'none'}}>
        {this.props.children}
        <span onTouchEnd={this.touchEnd} onTouchMove={this.touchMove} className={styles.toLeft} aria-labelledby={"slide to left"} role={"img"}>👈</span>
      </div>
    );
  }
}
