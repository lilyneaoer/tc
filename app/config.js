/**
 * Created by Administrator on 2017/4/11.
 */
export default {
    appName: '统一管理平台',
    version: 'v0.1.0',
    fae: {
        name: '云南犀鸟科技有限公司',
        email: '',
        telephone: '(+86)0871-68303126',
    },
    formatter: {
    date: 'YYYY-MM-DD',
    },
    error: {
    duration: 12,
    },
    success: {
    duration: 3,
    text: '操作成功',
    },
    http: {
        // 66的配置(开发人员可以更换)
        apiPrefix: 'http://172.50.40.66:8097/main/api/v2',
        wsSocket: 'ws://172.50.40.66:8097/main/ws/app',
        apiPrecms: 'http://172.50.40.66:8199/cms/api/v2',
        apiForgetPassword: 'http://172.50.40.66:8902/password/api/v2',
        fileServer: {
            upload: 'http://172.50.254.247:9898/api/files/upload',
            img: 'http://172.50.254.247:9898/web/files/get/image',
            download: 'http://172.50.254.247:9898/api/files/download/get',
            thumbPrefix: 'http://172.50.254.247:9898/web/files/get/display/dis/',
            ueditor: 'http://172.50.254.247:8899/ueditor/upload',
        },
        pdfPreview: 'http://172.50.254.247:8011/react-viewerjs',
        wordPreview: 'http://172.50.40.66:8080/wordtohtml',
        // 247的配置(不要随意更改)
        // apiPrefix: 'http://172.50.254.247:8097/main/api/v2',
        // wsSocket: 'ws://172.50.254.247:8097/main/ws/app',
        // apiPrecms: 'http://172.50.254.247:8199/cms/api/v2',
        // apiForgetPassword: 'http://172.50.254.247:8902/password/api/v2',
        // fileServer: {
        //   upload: 'http://172.50.254.247:9898/api/files/upload',
        //   img: 'http://172.50.254.247:9898/web/files/get/image',
        //   download: 'http://172.50.254.247:9898/api/files/download/get',
        //   thumbPrefix: 'http://172.50.254.247:9898/web/files/get/display/dis/',
        //   ueditor: 'http://172.50.254.247:8899/ueditor/upload',
        // },
        // pdfPreview: 'http://172.50.254.247:8011/react-viewerjs',
        // wordPreview: 'http://172.50.254.247:8182/wordtohtml',
        // 外网访问的配置(不要随意更改)
        // apiPrefix: 'http://220.165.250.226:9080/main/api/v2',
        // wsSocket: 'ws://220.165.250.226:9080/main/ws/app',
        // apiPrecms: 'http://220.165.250.226:9080/cms/api/v2',
        // apiForgetPassword: 'http://220.165.250.226:9080/password/api/v2',
        // fileServer: {
        //   upload: 'http://220.165.250.226:9080/api/files/upload',
        //   img: 'http://220.165.250.226:9080/web/files/get/image',
        //   download: 'http://220.165.250.226:9080/api/files/download/get',
        //   thumbPrefix: 'http://220.165.250.226:9080/web/files/get/display/dis/',
        //   ueditor: 'http://220.165.250.226:9080/ueditor/upload',
        // },
        // pdfPreview: 'http://220.165.250.226:9080/react-viewerjs',
        // wordPreview: 'http://220.165.250.226:9080/wordtohtml',
        status: {
            success: 'success',
            fail: 'fail',
        },
    },
};
