export default (api:any) => {
  api.addHTMLHeadScript({
    type:"text/javascript",
    src: 'https://webapi.amap.com/maps?v=1.4.14&key='+process.env.AMAPKEY,
  });
};
