import { useContext, useState } from "react"
import AppCtx from "../../context/AppCtx"
import Container from "../../components/Container"
import { Title, TabBar, AddBtn, AddMenu } from "../../components/views/Dashboard"

const Dashboard = () => {
    const { user } = useContext(AppCtx)
    const [tab, setTab] = useState<'ppty' | 'blogs'>("ppty")
    const [isAddMenu, setAddMenu] = useState(false)

    return (
        <Container className="static">
            <Title user={user} />
            <TabBar tab={tab} setTab={setTab} />
            { isAddMenu && <AddMenu /> }
            <AddBtn handleAddMenu={()=>setAddMenu(v=>!v)}/>
        </Container>
    )
}

export default Dashboard