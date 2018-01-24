
import Login from './components/pre-login/Login';
import SignUp from './components/pre-login/SignUp'
import Active from './components/loggedframe/Active'
import Create from './components/loggedframe/Create'
import MyChallenges from './components/loggedframe/MyChallenges'

export const routes = [
    { path: '/', component: Login, name:"home" },
    { path: '/signup', component: SignUp, name:"signup"},
    { path: '/active', component: Active, name: "Active"},
    { path: '/create', component: Create, name: "Create"},
    { path: '/my_challenges', component: MyChallenges, name: "My Challenges"}
];
