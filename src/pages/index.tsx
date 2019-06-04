import React from 'react';
import styles from './index.css';
import axios from 'axios'

export default class extends React.Component {

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    // axios.get("http://localhost:3000/bus?handlerName=GetLineListByLineName&key=60&_="+new Date().getTime()).then((res)=>{
    //   console.log(res)
    // })

    return (
      <div className={styles.normal}>
      </div>
    );
  }

}
