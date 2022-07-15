import { screen } from '@testing-library/react'
import { render } from '../test-utils/testing-library-utils'
import CountrySiteList from '../components/CountrySiteList'

// test("", ()=>{})

describe("/site loads all components", ()=> {
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<CountrySiteList/>)
    })
    test("select province is loaded with default value of All Province / Region", ()=>{
        screen.getByText(/All Province/)
    })
    test("stats is loaded with default value of 0% and 56 national sites left", ()=>{
        // there are 2 "-" for local provincial progress when selection is "All Province / Region"
        expect(screen.getAllByText("-").length).toEqual(2)
    })
    test("login to save progress alert is loaded for non-signed in users", ()=>{
        screen.getByText(/Login to save your progress!/i)
    })
    test("login to save progress alert is hidden for signed in users", ()=>{
        const result = screen.queryAllByText(/Login to save your progress!/i)
        // test when user login can be simulated
        // expect(result).toBeNull()
    })
    test("Link to province list is hidden for non-signed in users", ()=>{
        const link = screen.queryByText(/View Province List/i)
        expect(link).toBeNull()
    })
    test("Link to province list is displayed for signed in users", ()=>{
        const link = screen.queryByText(/View Province List/i)
        // test when user login can be simulated
        // expect(link).toBeTruthy()
    })
    test("Table is loaded when there is data", ()=>{
        expect(screen.getByRole("table")).toBeTruthy()
        // 56 items if dropdown selection is All Province / Region
    })
})

describe("User selects another province from dropdown", ()=>{
    test("dropdown text updates upon user selection", ()=>{})
    test("provincial progress updates upon user selection", ()=>{})
    test("table item length updates based on num. of sites in province selected by user", ()=>{})
})

describe("User checks and unchecks an item from table", ()=>{
    test("user checks an item", ()=>{
        // need to await for table fields to load
        // const checkbox = screen.getByTestId("checkbox-element")
        // console.log(checkbox);
    })
    test("user unchecks an item", ()=>{})
})


