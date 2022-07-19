import { screen } from '@testing-library/react'
import { render } from '../test-utils/testing-library-utils'
import '@testing-library/jest-dom'
import ProvinceListPage from '../pages/ProvinceListPage'

// test("", ()=>{})

describe("/site loads all components", ()=> {
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<ProvinceListPage/>)
    })
    test("province list stats is displaying", ()=>{
        expect(screen.getByText(/i have visited/i)).toBeInTheDocument()
        expect(screen.getByText(/regions in China/i)).toBeInTheDocument()
    })
    test("login to save progress alert is hidden for signed in users", ()=>{
        // test when user login can be simulated
        // const result = screen.queryAllByText(/Login to save your progress!/i)
        // expect(result).toBeNull()
    })
    test("Link to province list is hidden for non-signed in users", ()=>{
        const link = screen.queryByText(/View Province List/i)
        expect(link).toBeNull()
    })
    test("Link to province list is displayed for signed in users", ()=>{
        // test when user login can be simulated
        
        // const link = screen.queryByText(/View Province List/i)
        // expect(link).toBeTruthy()
    })
    test("Table is loaded when there is data", ()=>{
        // const trElements = await screen.findAllByRole("row")
        expect(screen.getByRole("table")).toBeInTheDocument()
        expect(screen.getByRole("row", {name: /province/i})).toBeInTheDocument()
        // expect(trElements.length).toBe(2)

        // 56 items if dropdown selection is All Province / Region
    })
    test("The checkbox should be in the document", async ()=>{
        // shows that checkbox in header is displaying
        expect(screen.getByRole("checkbox")).toBeInTheDocument()
        
        // const checkBoxes = await screen.findAllByRole("checkbox")
        // expect(checkBoxes).toHaveLength(5) could only get the first checkbox found in the table header, unable to get the rest
    })
})