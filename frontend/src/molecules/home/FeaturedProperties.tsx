import AllProperties from "../../components/views/AllProperties"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../core/axios.conf"
import { PropertyFromServer } from "../../core/@types"

const FeaturedProperties = () => {
    const [pptys, setPptys] = useState<PropertyFromServer[] | null>(null)
    const [_, setLoading] = useState(true)

    let url = '/api/properties'
    useEffect(() => {

        url = `${url}/?status=approved`
        axiosInstance.get(url)
            .then((value) => {
                let data = value.data.data
                setPptys(data)
                console.log(data)
                setLoading(false)
            })
    }, [])
    let element = <AllProperties 
                        pptys={pptys as PropertyFromServer[]}
                        setPptys={setPptys as React.Dispatch<React.SetStateAction<PropertyFromServer[]>>}
                        title="Featured Properties" 
                        /> 
    
    return (<> {(pptys && pptys.length) ? element : ''} </>)
}

export default FeaturedProperties