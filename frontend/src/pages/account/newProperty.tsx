import { InputGroup, Input, SelectControl, TextFieldControl, Button } from "../../components/FormComponents"
import { categories, states } from "../../assets/data"
import { firstLetterCapital } from "../../core/util"
import React, { useState } from "react"

const NewProperty = () => {
  const [desc, setDesc] = useState('')
  const [numDesc, setNumDesc] = useState(300)
  const [addr, setAddr] = useState('')
  const [numAddr, setNumAddr] = useState(150)


  const handleChange = (e: React.FormEvent) => {
    const textArea = e.target as any as HTMLTextAreaElement

    if (textArea.id === 'address') {
      setAddr(textArea.value)
      setNumAddr(150 - textArea.value.length)
    }
    if (textArea.id === 'description') {
      setDesc(textArea.value)
      setNumDesc(300 - textArea.value.length)
    }
  }
  return (
    <div className=" w-[450px] max-w-[95%] m-auto my-4 mb-8 text-gray-700">

      <form action="">
        <div className="mb-4 py-4 relative rounded-lg bg-[#fefefe]">
          <h3 className="text-center font-semibold"> Post Property Ad. </h3>
          <button className="text-[#B97745] absolute top-1/2 -translate-y-1/2 right-6 text-sm" type="reset"> clear </button>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <InputGroup id="title" label="Title*" placeholder="2 bedroom for sale" className=" mb-3" />

          <SelectControl label="Category*" name="category" id="category" className=" mb-3">
            <option value="-" selected disabled> Select Property's Category </option>
            {
              categories.map(([val, text]) => (
                <option value={val} key={val}> {text} </option>
              ))
            }
          </SelectControl>

          <TextFieldControl
            label="Description*"
            placeholder="Describe your property here..."
            id="description" rows={3}
            className="-mb-1"
            maxLength={300}
            handleChange={handleChange} />
          <span className="mb-3 block text-xs text-[#B97745]">{numDesc}</span>

          <TextFieldControl
            label="Address*"
            placeholder="Property address..."
            id="address"
            rows={3} className="-mb-1"
            maxLength={150}
            handleChange={handleChange}
          />
          <span className="mb-3 block text-xs text-[#B97745]">{numAddr}</span>

          <div className="flex gap-x-3 mb-3">
            <div className="flex-1">

              <SelectControl label="State*" name="state" id="state" className=" mb-3">
                <option value="abuja" selected> Abuja </option>
                <option value="lagos"> Lagos </option>
                {states.sort().map((state, idx) => (
                  <option value={state} key={idx}> {firstLetterCapital(state)} </option>
                ))}
              </SelectControl>
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="price" className="font-semibold"> Price* </label>
              <div className="flex items-center gap-x-1">
                &#8358;<Input id='price' placeholder="2000000" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <input type="file" multiple accept="image/*" />
            <Button className="text-white bg-green-500 hover:bg-green-700 active:scale-95 py-1 rounded-sm"> Add </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewProperty