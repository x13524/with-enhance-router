import * as React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {parse, stringify} from 'query-string'
import {formatRoute} from 'react-router-named-routes'

/**
 * 跳转装饰注入 react-router-dom
 * 近似 vue router api: https://router.vuejs.org/guide/essentials/navigation.html
 * @example
 *
 import { routeNames } from '@src/pages/app';
 @withEnhanceRouter
 export default class Example extends Component {
    handleClick = () => {
      const { $router } = this.props;
      $router.push(routeNames.MAIN);
      $router.push({url: routeNames.MAIN, params});
      $router.push({url: routeNames.MAIN, params: {id:123}, qs: {aa: '123'}});
      $router.replace(routeNames.MAIN);
      $router.replace({url: routeNames.MAIN, params});
      $router.replace({url: routeNames.MAIN, params: {id:123}, qs: {aa: '123'}});
      $router.go(<前进或后退>);
    }
    render() {
      // 直接获取路由参数
      console.log(this.props.$router.params);
      return (
        <button onClick={ this.handleClick }>
          Take me home!
        </button>
      );
    }
  }
 * @param ComposedComponent
 * @return {{new(): RedirectDecorator, prototype: RedirectDecorator}}
 */
const withEnhanceRouter = (ComposedComponent) => {
  return withRouter(
    class RedirectDecorator extends React.Component {
      state = RedirectDecorator.getInitialState()

      static getInitialState() {
        return {
          push: true,
          redirectUrl: null,
        }
      }

      // @ts-ignore
      componentDidUpdate(prevProps, prevState) {
        const {redirectUrl} = this.state
        // 判断是否已经重定向过 Url
        if (!prevState.redirectUrl && redirectUrl) {
          this.setState(RedirectDecorator.getInitialState())
        }
      }

      // 用来做判断是 qs 是否为空
      redirect = (push = true, {url, params = {}, qs = {}} = {}) => {
        let qsString = qs ? stringify(qs) : ''
        url = formatRoute(url, params);
        debugger
        this.setState({
          push,
          redirectUrl: `${url}?${qsString}`
        })
      }

      /**
       * 标准化 params
       * @param params
       */
      // 允许直接传参地址的使用方法
      static normalizeQueryString(params) {
        return typeof params === 'string' ? {url: params} : params
      }

      static normalizeRouterActionArg(arg) {
        if (typeof arg === 'string') {
          return {url: arg}
        }
        return arg
      }

      manageRouterMember({redirect, params, qs}) {
        return {
          push: (arg) => {
            debugger
            const {url, params, qs} = RedirectDecorator.normalizeRouterActionArg(arg)
            redirect(true, RedirectDecorator.normalizeQueryString({url, params, qs}))
          },
          replace: (arg) => {
            const {url, params, qs} = RedirectDecorator.normalizeRouterActionArg(arg)
            redirect(false, RedirectDecorator.normalizeQueryString({url, params, qs}))
          },
          go: (num) => this.props.history.go(num),
          qs,
          params
        }
      }

      /**
       * 校验 props 的命名空间
       */
      validatePropsNamespace() {
        if (process.env.NODE_ENV !== 'production' && this.props['$router']) {
          throw new Error('props 命中关键字 $router, 请更换传入的 props 命名')
        }
      }

      /**
       * 获取 query string
       */
      getQs() {
        let {search} = this.props.location
        return search ? parse(search) : undefined
      }

      /**
       * 获取 params
       */
      getParams() {
        return this.props.match.params
      }

      render() {
        const {push, redirectUrl} = this.state
        if (redirectUrl) {
          return <Redirect push={push} to={redirectUrl}/>
        }
        const qs = this.getQs()
        const params = this.getParams()
        this.validatePropsNamespace()
        return (
          <ComposedComponent
            {...this.props}
            $router={this.manageRouterMember({
              redirect: this.redirect,
              params,
              qs
            })}
          />
        )
      }
    },
  )
}

export default withEnhanceRouter
