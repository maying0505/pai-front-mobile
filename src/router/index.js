import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Books from '@/pages/books'
import Book from '@/pages/book'
import UC from '@/pages/uc'
import Login from '@/pages/login'
import PasswordReset from '@/pages/password-reset'
import Signup from '@/pages/signup'
import MyAuction from '@/pages/my-auction'
import MyMessage from '@/pages/my-message'
import Auctions from '@/pages/auctions.vue'
import AuctionDetail from '@/components/auction-detail'
import AuctionDetailWeapp from '@/components/auction-detail-weapp'
import AuctionPublish from '@/pages/auction-publish'
import AuctionArticle from '@/pages/auction-article'
import AuctionQRCode from '@/pages/auction-qrcode'
import AuctionCheckin from '@/pages/auction-checkin'
import Test from '@/pages/test.vue'
import AuctionBook from '@/pages/auction-book'
import { wxAuth, wxRedirect } from '@/common/utils/api.js'
Vue.use(Router)


const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { title: '首页' }
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
      meta: { title: '预约', auth: true }
    },
    {
      path: '/uc',
      name: 'uc',
      component: UC,
      meta: { title: '我的', auth: true }
    },
    {
      path: '/auction/detail/:id',
      name: 'auctionDetail',
      component: AuctionDetail,
      meta: { title: '拍卖标的详情' }
    },
    {
      path: '/auction/detail-weapp/:id',
      name: 'auctionDetailWeapp',
      component: AuctionDetailWeapp,
      meta: { title: '拍卖标的详情微信小程序' }
    },
    {
      path: '/auction/qrcode/:assetId',
      name: 'auctionQRCode',
      component: AuctionQRCode
    },
    {
      path: '/auction/checkin/:assetId/:timeId',
      name: 'auctionCheckin',
      component: AuctionCheckin,
      meta: { title: '预约签到'}
    },
    {
      path: '/auction/article/:type/:assetId/:isWeapp',
      name: 'auctionArticle',
      component: AuctionArticle,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: '用户登录'
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordReset,
      meta: { title: '密码重置', auth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { title: '用户注册' }
    },
    {
      path: '/my-auction',
      name: 'myauction',
      component: MyAuction,
      meta: { title: '我的拍卖', auth: true }
    },
    {
      path: '/my-message',
      name: 'mymessage',
      component: MyMessage,
      meta: { title: '我的消息', auth: true }
    },
    {
      path: '/auctions/:type',
      name: 'auctions',
      component: Auctions,
      meta: ''
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: ''
    }, {
      path: '/auction/book/:assetId',
      name: 'auctionbook',
      component: AuctionBook,
      meta: {
        title: '预约看样',
        auth: true
      }
    },
    {
      path: '/auction/publish/:assetId',
      name: 'auctionpublish',
      component: AuctionPublish,
      meta: {
        title: '标的物介绍'
      }
    }
  ]
})


const isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
function getQueryString(name) {
  var reg = new RegExp('[?&]' + name + '=([^&#]+)');
  var query = location.href.match(reg);
  return query ? query[1] : null;
}
const code = getQueryString('code');
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.auth) {
    const token = localStorage.getItem('token')
    if (!token) {
      if (isWeixin) {
        //跳转微信授权登陆
        console.log('code=>' + code)
        if (code) {
          let param = { code: code }
          wxAuth(param).then(res => {
            if (res.code == 0) {
              localStorage.setItem("user", res.data)
              next();
            } else {
              next({
                path: '/'
              })
            }
          });
        } else {
          let path = to.fullPath ? to.fullPath.replace(/\//g, '') : '';
          let redirectUrl = encodeURIComponent(window.location.href + path)
          // let redirectUrl = window.location.href + path
          let params = { redirectUrl: redirectUrl };
          wxRedirect(params).then(res => {
            if (res.code == 0) {
              if (res.data) {
                alert(res.data)
                window.location.href = res.data
              }
            }
          })

        }
      } else {
        next({
          path: 'login',
          query: { redirect: to.fullPath }  
        })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})






export default router;
