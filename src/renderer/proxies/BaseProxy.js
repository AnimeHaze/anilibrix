import __get from 'lodash/get'
import store from '@store/index'
import axios from '@plugins/axios'
import FormData from 'form-data'
import { meta, version } from '@package'

export default class BaseProxy {
  /**
   * The method used to perform an AJAX-request.
   *
   * @param method
   * @param {string}  url The URL for the request.
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  async submit (method, url, parameters = {}) {
    // Set headers
    // Add user-agent
    const headers = { ...parameters.headers, ...this.getRequestHeaders() }

    // Make request
    // eslint-disable-next-line no-return-await
    return await axios.request({
      url,
      method, ...parameters,
      headers,
      timeout: 1000
    })
  }

  /**
   * Parse base response model
   *
   * @param response
   * @return {*}
   */
  handleResponse (response) {
    const data = __get(response, 'data', null)
    const status = __get(response, 'status', false)
    const message = __get(response, 'error.message', 'Ошибка при запросе')

    if (status === true) {
      return data
    } else {
      throw new Error(message)
    }
  }

  /**
   * Get api endpoint url
   *
   * @return {string}
   */
  getApiEndpoint () {
    const endpoint = store.getters['app/settings/system/apiEndpoint']
    console.log('Endpoint for api', endpoint)
    return endpoint + '/public/api/index.php'
  }

  getTorrentEndpoint () {
    const endpoint = store.getters['app/settings/system/apiEndpoint']
    console.log('Endpoint for torrent', endpoint)
    return endpoint
  }

  getApiLoginEndpoint () {
    const endpoint = store.getters['app/settings/system/apiEndpoint']
    console.log('Endpoint for login', endpoint)
    return endpoint + '/public/login.php'
  }

  getApiLogoutEndpoint () {
    const endpoint = store.getters['app/settings/system/apiEndpoint']
    console.log('Endpoint for logout', endpoint)
    return endpoint + '/public/logout.php'
  }

  /**
   * Get static endpoint url
   *
   * @return {string}
   */
  getStaticEndpoint () {
    // eslint-disable-next-line camelcase
    const endpoint = store.getters['app/settings/system/staticEndpoint']
    console.log('Endpoint for static', endpoint)
    return endpoint
  }

  /**
   * Get form data from provided data object
   *
   * @param data
   * @return {FormData}
   */
  getFormDataObject (data = null) {
    // Create form data object
    const formData = new FormData()

    // Set data
    Object.keys(data || {})
      .forEach(key => formData.append(key, typeof (data[key]) === 'object' ? JSON.stringify(data[key]) : data[key]))

    // Return form data
    return formData
  }

  /**
   * Get default request headers
   *
   * @return {{}}
   */
  getRequestHeaders () {
    // Create headers
    const headers = {}

    // Set header user agent
    headers['user-agent'] = `${meta.name}/${version}`

    // Set header session
    // Set session in cookies
    const session = __get(store, 'state.app.account.session')
    if (session && session.length > 0) {
      headers.Cookie = `PHPSESSID=${session}; Path=/; Secure; HttpOnly`
    }

    return headers
  }
}
