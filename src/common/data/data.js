const sortList = [{
  id: 1,
  text: '默认排序'
}, {
  id: 2,
  text: '价格降序'
}, {
  id: 3,
  text: '价格升序'
}, {
  id: 5,
  text: '最新发布'
}]


const typeList = [{
    id: 1,
    text: '全部'
  },
  {
    id: 2,
    text: '房产'
  },
  {
    id: 3,
    text: '机动车'
  },
  {
    id: 4,
    text: '土地'
  }
]

const statusList =[
  {id:-1,text:'不限'},
  {id:2,text:'即将开始'},
  {id:3,text:'已结束'},
  {id:4,text:'流拍'},
  {id:5,text:'终止'},
  {id:6,text:'撤回'},
]

const timeList =[
  {id:-1,text:'不限'},
  {id:0,text:'今天'},
  {id:3,text:'3天内'},
  {id:7,text:'7天内'}
]

const assetTypeList= [
  {id:0,txt:'房产'},
  {id:1,txt:'机动车'},
  {id:2,txt:'土地'}
  // {id:3,txt:'资产'},
  // {id:4,txt:'股权'},
  // {id:5,txt:'无形资产'},
  // {id:6,txt:'林权'},
  // {id:7,txt:'矿权'},
  // {id:8,txt:'船舶'},
  // {id:9,txt:'债券'}
]



export {
  sortList,
  typeList,
  statusList,
  timeList,
  assetTypeList
}
