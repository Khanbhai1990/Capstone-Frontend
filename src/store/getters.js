export const navbarBoo =  state => {
    if (state.loginIn>2){
      return state.loggedIn = true
    } else {
       return state.loggedIn = false
    }
}
