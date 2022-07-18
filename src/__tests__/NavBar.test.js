import NavBar from '../components/NavBar'
import { render } from '../test-utils/testing-library-utils'

describe("navbar is loading correctly",()=>{
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<NavBar/>)
    })
    test("page displays unesgo logo",()=>{

    })
    test("page displays login/sign up button when user is not logged in",()=>{

    })
    test("page displays log out button when user is logged in",()=>{

    })
})

