# The Movie Database Statistics

### Unrelated Notes

App load

how to fetch data
how to store data
how to retrieve data

retrieve data
if no data
  fetch data
  store data
display


const [clothes, setClothes] = useLocalStorage("clothes", fetchClothes)

useLocalStorage( key, fetchCallback ) {
  
  state in here somewhere
  
  function setValue( value ) {
    setLocalStorate( key, value )
  }
  
  let value = getLocalStorage( key )
  if ( ! value ) {
    value = fetchCallback()
    setValue( key, value )
  }
  
  return [value, setValue]
  
}

useLocalDatabase( key, fetchCallback ) {
  
  const [value setValue] = useCache(
    key,
    fetchCallback,
    value => getLocalDatabase( key, value ),
    value => setLocalDatabase( key, value ),
    3600
  )
  
  return [value, setValue]
  
}

useCache( key, fetch, read, write, expire = false ) {
  
  state in here somewhere
  
  function setValue( value ) {
    write( key, value )
  }
  
  let value = read( key )
  if ( ! value || expire ) {
    value = fetch()
    setValue( key, value )
  }
  
  return [value, setValue]
  
}
