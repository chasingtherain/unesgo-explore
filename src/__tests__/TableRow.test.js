import { screen } from '@testing-library/react'
import { render } from '../test-utils/testing-library-utils'
import userEvent from "@testing-library/user-event"
import TableRow from '../components/layout/TableRow'
import Table from '../components/layout/Table'

// test("", ()=>{})

describe("Checkbox is loaded in default state in document", () =>{
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<Table/>)
    })
    test("The checkbox should be unchecked by default", ()=>{})
})

// describe("User checks and unchecks an item from table", () =>{
//     const onChange = jest.fn()
//     render(<TableRow onChange={onChange}/>)
//     test("user checks an item", async () =>{
//         await userEvent.click(screen.getByRole("checkbox"))
//         expect(onChange).toHaveBeenCalledTimes(1)
//         // need to await for table fields to load
//         // const checkbox = screen.getByTestId("checkbox-element")
//         // console.log(checkbox);
//     })
//     test("user unchecks an item", ()=>{})
// })