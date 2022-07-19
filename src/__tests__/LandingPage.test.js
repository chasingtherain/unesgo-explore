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
    test("page displays SEA region card",()=>{
        screen.getByText(/southeast asia/i)
    })
    test("page displays unesco button site button",()=>{
        const numOfUnescoSiteBtn = screen.getAllByRole("button", {name: /view unesco sites/i})
        expect(numOfUnescoSiteBtn.length).toBe(2)
    })
    test("page displays province list button",()=>{
        screen.getByRole("button", {name: /view province list/i})
    })
    test("there are 3 buttons in landing page excluding navbar",()=>{
        screen.getAllByRole("button")
        expect(screen.getAllByRole("button").length).toEqual(3)
    })
})

