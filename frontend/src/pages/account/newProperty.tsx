import { InputGroup, Input, SelectControl, TextFieldControl, Button } from "../../components/FormComponents"
import { categories, states } from "../../core/data"
import { firstLetterCapital } from "../../core/util"
import React, { useContext, useState } from "react"
import * as Yup from 'yup'
import { transform } from "../../core/process-image"
import { PropertyPayloadType } from "../../core/@types"
import AppCtx from "../../context/AppCtx"
import { axiosInstance } from "../../core/axios.conf"
import { useNavigate } from "react-router-dom"


const NewPropertySchema = Yup.object().shape({
  title: Yup.string().min(10).required(),
  category: Yup.string().required(),
  description: Yup.string().min(10).required(),
  state: Yup.string().required(),
  address: Yup.string().min(10).required(),
  price: Yup.number().required(),
  images: Yup.array(Yup.string()).min(1).max(4).required('Property images are required')
})



const NewProperty = () => {
  const [_, setTitle] = useState('')
  const [numTitle, setNumTitle] = useState(50)
  const [__, setDesc] = useState('')
  const [numDesc, setNumDesc] = useState(300)
  const [___, setAddr] = useState('')
  const [numAddr, setNumAddr] = useState(150)
  const [base64Images, setBase64Images] = useState<string[] | null>(null)
  const {user} = useContext(AppCtx)
  const navigate = useNavigate()

  const handleTitleChange = (e: React.ChangeEvent) => {
    const titleInput = e.target as any as HTMLInputElement
    setTitle(titleInput.value)
    setNumTitle(50 - titleInput.value.length)
  }
  const handleTextAreaChange = (e: React.FormEvent) => {
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

  const handleFileChange = (e: React.ChangeEvent) => {
    const inputField = e.target as HTMLInputElement
    const imageList = inputField.files

    if (imageList!.length < 1) {
      inputField.value = ''
      return alert('You must upload atleast one property image')
    }
    if (imageList!.length > 3) {
      inputField.value = ''
      return alert('You can only upload a maximum of 3 property images')
    }
    transform(imageList as FileList, (base64Images)=>{ setBase64Images(base64Images) })
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const pptyForm = e.target as unknown as HTMLFormControlsCollection & {
      title: HTMLInputElement,
      category: HTMLOptionElement,
      description: HTMLTextAreaElement,
      address: HTMLTextAreaElement,
      price: HTMLInputElement,
      state: HTMLOptionElement
    }
    const payload:PropertyPayloadType = {
      user_id: user?.userId as string,
      title: pptyForm.title.value,
      category: pptyForm.category.value,
      description: pptyForm.description.value,
      address: pptyForm.address.value,
      price: pptyForm.price.valueAsNumber,
      state: pptyForm.state.value,
      images: base64Images as string[]
    }

    try {
      let data = await NewPropertySchema.validate(payload, {abortEarly: false})
      
      axiosInstance.post(`/api/users/${user?.userId}/properties`, data)
      .then(()=>{
        alert('Well Done! \n Your ad will be published after review.')
        navigate('/myaccount/dashboard')
      }).catch((e)=>{
        console.log(e)
      })
    } catch(err){
      if (err instanceof Yup.ValidationError) {
        let currentErr = err.inner[0].errors[0]
        if (currentErr.match('NaN'))
          alert('price is required')
        else
          alert(currentErr)
    }
    }
  }
  return (
    <div className=" w-[450px] max-w-[95%] m-auto my-4 mb-8 text-gray-700">

      <form action="" onSubmit={handleSubmit}>
        <div className="mb-4 py-4 relative rounded-lg bg-[#fefefe]">
          <h3 className="text-center font-semibold"> Post Property Ad. </h3>
          <button className="text-[#B97745] absolute top-1/2 -translate-y-1/2 right-6 text-sm" type="reset"> clear </button>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <InputGroup 
            id="title" 
            label="Title*" 
            placeholder="2 bedroom for sale" 
            className="mb-1" 
            handleChange={handleTitleChange} 
            maxLength={50}
            />
            <span className="mb-3 block text-xs text-[#B97745]">{numTitle}</span>

          <SelectControl label="Category*" name="category" id="category" className=" mb-3">
            <option value="" selected disabled> Select Property's Category </option>
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
            handleChange={handleTextAreaChange} />
          <span className="mb-3 block text-xs text-[#B97745]">{numDesc}</span>

          <TextFieldControl
            label="Address*"
            placeholder="Property address..."
            id="address"
            rows={3} className="-mb-1"
            maxLength={150}
            handleChange={handleTextAreaChange}
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
                &#8358;<Input id='price' placeholder="2000000" type="number" handleChange={()=>{}}/>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
            <Button className="text-white bg-green-500 hover:bg-green-700 active:scale-95 py-1 rounded-sm"> Add </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewProperty