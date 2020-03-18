import httputil from './httputil'

export function login(params){
    return httputil.post('/user/login',params)
}
export  function signup(params){
    return httputil.post('/user/signup',params)
}
export function getSmCode(params){
    return httputil.post('/sm/send',params);
}

export function addBook(params){
    return httputil.post('/book/add',params)
}

export function assetDetail(params){
    return httputil.get('/asset/detail',params)
}

export function assetPublish(params){
    return httputil.get('/asset/publish',params)
}

export function getAssetArticle(params){
    return httputil.get('/asset/article',params)
}

export function wxAuth(param){
    return httputil.get('/wx/mp/auth',param)
}

export function assetList(param){
    return httputil.get('/asset/list',param)
}


export function bookQrcode(param){
    return httputil.post('/book/qrcode',param)
}

export function assetQrcode(param)
{
    return httputil.post('/asset/qrcode',param)
}



export function bookCheckin(param){
    return httputil.post('/book/checkin',param)
}


export function getAssetTimes(param){
    return httputil.get('/asset/times',param)
}

export function wxRedirect(param){
    return httputil.get('/wx/mp/redirect',param)
}