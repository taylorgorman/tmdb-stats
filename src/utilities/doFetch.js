
export default function doFetch ( endpoint, method, data ) {
  let body
  if ( method === "GET" )
    endpoint = endpoint + "?" + Object.keys(data).map(key => key + '=' + data[key]).join('&')
  else
    body = JSON.stringify(data)
  return fetch( endpoint, { method, body } )
    .then( async resp => [await resp.json(), {status:resp.status, message:resp.statusText}] )
    .catch( error => [null, error] )
}