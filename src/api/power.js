 // 主要连接地址 
 const home='http://192.168.3.72:21004';
/*
// 图片列表获取
 const imgUrl='http://192.168.3.74:5500';
// 获取图片存储文件路径
 const imgFileUrl='/files/images/';

// grpc连接地址 
 const grpcUrl='http://192.168.3.72:21082';
 const grpcUrlNew='http://192.168.3.72:21092';
// grpc连接超时时间(12小时)
 const grpcTimeout=43200000;
// grpc请求间歇时间 
 const grpcPeriod=900;//(500-1000之间) */

 import request from "@/utils/request";
/** 获取历史数据界面信号树列表*/
export function listTree() {
  return request({
    url: home + "/report/signal/tree",
    method: "get",
  });
}

