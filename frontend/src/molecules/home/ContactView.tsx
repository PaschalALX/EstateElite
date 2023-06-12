import Container from "../../components/Container"
import { BsGithub } from "react-icons/bs"
import ViewTitle from "../../components/ViewTitle"
import React from "react"
import { MdOutlineDeveloperMode } from "react-icons/md"
import { InputGroupControl, InputGroup, TextFieldControl, Button, LastFooter } from "../../components/FormComponents"
import { unavailableServiceMsg } from "../../assets/data"

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(unavailableServiceMsg)
}
const ContactView = () => {
    return (
        <footer className="bg-[#1f1c18] mt-10 text-[#f7f3ed] py-5 px-6" id="contacts">
            <Container className="">
                <ViewTitle title="Contact Us" className="text-[#f7f3ed] mb-2" />
                <p className="text-center text-lg">
                    We use an agile approach to test assumptions and connect
                    <br /> with the needs of your audience early and often.
                </p>
                <div className="md:flex w-full h-30 mt-10 gap-x-5">
                    <div className="flex-grow md:w-2/3">
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <InputGroupControl>
                                <InputGroup id="first-name" label="First Name" placeholder="John" width="w-1/2"/>
                                <InputGroup id="last-name" label="Last Name" placeholder="Doe" width="w-1/2"/>
                            </InputGroupControl>
                            <InputGroupControl>
                                <InputGroup id="email" label="Your email" placeholder="john.doe2023@mail.com" type="email" width="w-1/2"/>
                                <InputGroup id="phone" label="Phone Number" placeholder="+234-802-887-5187" width="w-1/2"/>
                            </InputGroupControl>
                            <TextFieldControl 
                                id="message" 
                                label="Your message" 
                                cols={30} rows={5} 
                                placeholder='Leave a comment...' 
                                className="mb-8"
                                handleChange={()=>{}}
                                />
                            <Button> Send Message </Button>
                        </form>
                    </div>
                    <div className="flex-grow md:w-1/3 text-center flex md:flex-col md:justify-evenly md:items-end items-center justify-between mt-5">
                        <div>
                            <div className="p-4 inline-block rounded-lg bg-[#503e25] ">
                                <BsGithub size={30} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Github Repo:</h3>
                                <a href="https://github.com/PaschalALX/EstateElite" className=" hover:text-[#b2835f]">
                                    github.com/PaschalALX/EstateElite
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className="p-4 inline-block rounded-lg bg-[#503e25] ">
                                <MdOutlineDeveloperMode size={30} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Developers:</h3>
                                <div className="">
                                    <a href="" className="hover:text-[#b2835f]">+234 814 160 0811 (Paschal-Mark) </a> <br />
                                    <a href="" className="hover:text-[#b2835f]">+234 705 867 9688 (Eze)</a> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <LastFooter/>
            </Container>
        </footer>
    )
}

export default ContactView