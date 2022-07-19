import { screen } from '@testing-library/react'
import { render } from '../test-utils/testing-library-utils'
import '@testing-library/jest-dom'
import RegionSiteList from '../components/RegionSiteList'


// test("", ()=>{})

describe("all components are working correctly", ()=> {
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<RegionSiteList/>)
    })
    test("province list stats is displaying", ()=>{
        expect(screen.getByText(/Progress/)).toBeInTheDocument()
        expect(screen.getByText(/sites left/i)).toBeInTheDocument()
    })
    test("Alert is hidden for non-logged in user", ()=>{
        expect(screen.getByText(/login to save your progress/i)).toBeInTheDocument()
    })
    test("Table is loaded when there is data", ()=>{
        // const trElements = await screen.findAllByRole("row")
        expect(screen.getByRole("table")).toBeInTheDocument()
        expect(screen.getByRole("row", {name: /country/i})).toBeInTheDocument()
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