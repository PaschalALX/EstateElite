import { useContext, useState } from "react"
import AppCtx from "../../context/AppCtx"
import Container from "../../components/Container"
import { Title, TabBar, AddBtn, AddMenu } from "../../components/views/Dashboard"
import ServiceUnavailable from "../serviceUnavailable"
import { RiAdminFill } from "react-icons/ri"
import AllProperties from "../../components/views/AllProperties"


const Dashboard = () => {
    const { user } = useContext(AppCtx)
    const [tab, setTab] = useState<'ppty' | 'blogs'>("ppty")
    const [isAddMenu, setAddMenu] = useState(false)

    return (
        <Container className="static">
            <div className="flex items-center gap-1">
                <Title user={user} />
                {user?.isAdmin && <RiAdminFill color='#222' size={25}/>}
            </div>
            <TabBar tab={tab} setTab={setTab} />
            <main>
                {tab === 'blogs' && <ServiceUnavailable />}
                <div className="mt-2">
                    {tab === 'ppty' && <AllProperties isUserAccount={!!user} isAdminAccount={user?.isAdmin} squeeze={true} />}
                </div>
            </main>
            {isAddMenu && <AddMenu />}
            <AddBtn handleAddMenu={() => setAddMenu(v => !v)} />
        </Container>
    )
}

export default Dashboard