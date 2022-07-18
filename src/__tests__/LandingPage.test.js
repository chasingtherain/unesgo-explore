import { screen } from '@testing-library/react'
import LandingPage from '../pages/LandingPage'
import { render } from '../test-utils/testing-library-utils'

describe("landing page loads completely",()=>{
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<LandingPage/>)
    })
    test("page displays China card",()=>{
        screen.getByText(/china/i)
    })
    test("page displays unesco button site button",()=>{
        screen.getByRole("button", {name: /view unesco sites/i})
    })
    test("page displays province list button",()=>{
        screen.getByRole("button", {name: /view province list/i})
    })
    test("there are 2 buttons in China card component",()=>{
        screen.getAllByRole("button")
        expect(screen.getAllByRole("button").length).toEqual(2)
    })
})

