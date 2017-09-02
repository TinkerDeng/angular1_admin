### 项目说明：
由于第三方工具bug导致，首次初始化项目需要手动修改的地方
1. bower_components/angular-datepicker/dist/angular-datepicker.js
修改871行
```javascript
element.triggerHandler('blur');
```
为
```javascript
element.triggerHandler('blur');
element.blur();
```

2. bower_components/jquery-ui/jquery-ui.js
修改16304行
```javascript
//po.top += this.scrollParent.scrollTop();
```

###项目运行 
npm install
bower install
gulp serve