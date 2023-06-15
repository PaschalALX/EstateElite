import { useContext, useState, useEffect } from "react"
import AppCtx from "../../context/AppCtx"
import Container from "../../components/Container"
import { Title, TabBar, AddBtn, AddMenu } from "../../components/views/Dashboard"
import ServiceUnavailable from "../NoticePage"
import { RiAdminFill } from "react-icons/ri"
import AllProperties from "../../components/views/AllProperties"
import { axiosInstance } from "../../core/axios.conf"
import { PropertyFromServer } from "../../core/@types"
import NoticePage from "../NoticePage"

const Dashboard = () => {
    const { user } = useContext(AppCtx)
    const [tab, setTab] = useState<'ppty' | 'blogs'>("ppty")
    const [isAddMenu, setAddMenu] = useState(false)
    const [pathQuery, setPathQuery] = useState('')
    const [pptys, setPptys] = useState<PropertyFromServer[] | null>(null)

    const [_, setLoading] = useState(true)
    

    let url = '/api/properties'
    useEffect(() => {

        url = pathQuery ? `${url}/${pathQuery}` : url
        axiosInstance.get(url)
            .then((value) => {
                let data = value.data.data
                setPptys(data)
                console.log(data)
                setLoading(false)
            })
    }, [pathQuery])

    return (
        <Container className="static">
            <div className="flex items-center gap-1">
                <Title user={user} />
                {user?.isAdmin && <RiAdminFill color='#222' size={25} />}
            </div>
            <TabBar tab={tab} setTab={setTab} toggleStatus={(status)=>{
                if (status == 'all') setPathQuery('')
                else setPathQuery(`?status=${status}`)
            }} />
            <main>
                {tab === 'blogs' && <ServiceUnavailable />}
                <div className="mt-2">
                    {pptys && !pptys?.length && <NoticePage text="No property ads here..."/>}
                    {tab === 'ppty' && pptys && <AllProperties 
                                            pptys={pptys as PropertyFromServer[]} 
                                            setPptys={setPptys as React.Dispatch<React.SetStateAction<PropertyFromServer[]>>}
                                            isUserAccount={!!user} 
                                            isAdminAccount={user?.isAdmin} 
                                            squeeze={true} />}
                </div>
            </main>
            {isAddMenu && <AddMenu />}
            <AddBtn handleAddMenu={() => setAddMenu(v => !v)} />
        </Container>
    )
}

export default Dashboard