import React, {Component} from 'react'
import withEnhanceRouter from 'with-enhance-router'

/**
 * 路由名常量
 * 使用参考: https://github.com/adamziel/react-router-named-routes
 */
export const routeNames = {
  MAIN: '/',
  LOGIN: '/login',
  KOL: '/kol',
  AUTH: '/auth',
  AWARD: '/award/:noKolModal/:id/:text',
  FRIEND: '/friend'
}

class App extends Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    console.log(this.props.$router);
  }

  onClick() {
    this.props.$router.replace({
      url: routeNames.AWARD,
      params: {
        noKolModal: '哈哈哈哈'
      },
      qs: {
        aa: '嘿嘿额'
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>点击</button>
      </div>
    )
  }
}

export default withEnhanceRouter(App)
