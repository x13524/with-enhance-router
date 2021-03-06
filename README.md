# with-enhance-router

> 增强 with-router 

[![NPM](https://img.shields.io/npm/v/with-enhance-router.svg)](https://www.npmjs.com/package/with-enhance-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save with-enhance-router
```


#### 插件作用:
 跨页面传参

#### 使用方法：
引入此装饰器后, 可以直接点击调转跳转到新页面进行跨页面传参
```javascript

import withEnhanceRouter from 'with-enhance-router';

export const routeNames = {
  MAIN: '/',
  LOGIN: '/login',
  KOL: '/kol',
  AUTH: '/auth',
  AWARD: '/award/:noKolModal/:id/:text',
  FRIEND: '/friend'
}

@withEnhanceRouter
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: {
        account: '',
        authenticated: false,
        modal: null
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleClick = () => {
    const { $router } = this.props;
    $router.push({
      url: routeNames.AWARD,
      params: {
        id: 123
      },
      qs: {
        aa: '123'
      }
    });
  };

  render() {
    return (
      <MobileLayout>
        <div className={styles.main}>
          <div onClick={this.handleClick}>点击按钮</div>
        </div>
      </MobileLayout>
    );
  }
}

```

传参用法如下:
1. 在页面中最顶层设置好各个路由地址
```javascript
/*路由地址*/
export const routeNames = {
  MAIN: '/',
  LOGIN: '/login',
  KOL: '/kol',
  AUTH: '/auth',
  AWARD: '/award/:noKolModal/:id/:text',
  FRIEND: '/friend'
}
```

一、不带参数跳转使用方法, 即直接传入 url 地址:
```javascript
const { $router } = this.props;
 handleClick = () => {
    this.props.$router.push(routeNames.MAIN);  
 }
```
<br>  
二、只通过 params 传递参数

```javascript


 handleClick = () => {
   $router.push({
       url: routeNames.MAIN,
       params: {
           id: 123
       }
   });  
 }
 
```
<br> 
三、只通过 qs 传递参数  

```javascript
handleClick = () => {
   $router.push({
       url: routeNames.MAIN,
       qs: {
           aa: '123'
       }
   }); 
 }
 
```
<br> 
四、通过 params 和 qs 一起传递参数  

```javascript
 handleClick = () => {
    $router.push({
        url: routeNames.MAIN,
        params: {
            id: 123
        }, qs: {
            aa: '123'
        }
    }); 
  }
```
<br> 


#### 获取跨页面传参的值(直接打印获取 this.props.$router 的值)
```javascript
  componentDidMount() {
    console.log(this.props.$router);
  }
```


按实际需求,可以直接穿地 进行 params (类似于:routeNames.AWARD ) 或 querystring 传参('./index.html?aa=123')
- $router.push(routeNames.MAIN);
- $router.push({url: routeNames.MAIN, params});
- $router.push({url: routeNames.MAIN, params: {id:123}, qs: {aa: '123'}});
- $router.replace(routeNames.MAIN);
- $router.replace({url: routeNames.MAIN, params});
- $router.replace({url: routeNames.MAIN, params: {id:123}, qs: {aa: '123'}});
- $router.go(<前进或后退>);


## License

MIT © [x13524](https://github.com/x13524)

author: x13524    
