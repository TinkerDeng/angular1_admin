angular.module('app', [
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ui.router',
    'ui.sortable',
    '720kb.tooltips',
    'ui.uploader',
    'ngDialog',
    'LocalStorageModule',
    'toastr',
    'datePicker',
    'highcharts-ng'
]).config(function (config, $httpProvider, $locationProvider, $urlRouterProvider, $stateProvider, tooltipsConfProvider, ngDialogProvider, toastrConfig, $provide, localStorageServiceProvider) {

    $httpProvider.interceptors.push('httpInterceptor');

    /*$locationProvider.html5Mode({
     enabled: true,
     requireBase: false
     });*/

    localStorageServiceProvider
        .setPrefix(config.projectName)
        .setStorageType('localStorage')
        .setNotify(true, true);

    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.when('/', '/login');
    //$urlRouterProvider.otherwise('/404');

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default withModal',
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });

    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        positionClass: 'toast-bottom-right',
        progressBar: false,
        timeOut: 2000,
        closeButton: true
    });

    $provide.decorator('mFormatFilter', function () {
        return function newFilter(m, format, tz) {
            if (!(moment.isMoment(m))) {
                return '';
            }
            return tz ? moment.tz(m, tz).format(format) : m.format(format);
        };
    });
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "图表导出菜单",
            decimalPoint: ".",
            downloadJPEG: "下载JPEG图片",
            downloadPDF: "下载PDF文件",
            downloadPNG: "下载PNG文件",
            downloadSVG: "下载SVG文件",
            drillUpText: "返回 {series.name}",
            loading: "加载中",
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            noData: "没有数据",
            numericSymbols: ["千", "兆", "G", "T", "P", "E"],
            printChart: "打印图表",
            resetZoom: "恢复缩放",
            resetZoomTitle: "恢复图表",
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            thousandsSep: ",",
            weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
        }
    });

})
    .run(function ($rootScope, $state, $stateParams, localStorageService, $window, toastr) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.toastr = toastr;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;
            if (!localStorageService.get('token') && toState.name != 'login' && toState.name != '404') {
                event.preventDefault();
                $state.go("login");
            }
        });
        $rootScope.back = function () {
            $window.history.back();
            /*if ($rootScope.previousStateName && $rootScope.previousStateParams) {
             $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
             } else {
             $state.go('login');
             }*/
        };

    });