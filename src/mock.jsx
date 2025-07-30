import Mock from 'mockjs'

const domain = '/api/'

// 模拟login接口
Mock.mock(domain + 'login', function () {
    let result = {
        code: 200,
        message: 'OK',
        headers: {
            authorization: "jwt.token.yyds2023"
        },
        data: {
            loginUid: 10000,
            nickname: '兔子先生',
            token: 'yyds2023',
        },
    }
    // let result = {
    //     code: 401,
    //     message: '用户认证失败！'
    // }
    return result
})