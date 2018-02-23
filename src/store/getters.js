export const navbarBoo =  state => {
    if (state.token){
      return true
    } else {
       return false
    }
}
