const mobile_regex =/^((1[0-9]))\d{9}$/;

const isMobile =function(mobile){
    return mobile_regex.test(mobile);
}

export{
    isMobile
}