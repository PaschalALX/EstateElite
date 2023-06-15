import React, { useContext } from "react"
import PropertyCard from "../../components/PropertyCard"
import ViewTitle from "../../components/ViewTitle"
import { PropertyFromServer } from "../../core/@types"
import { axiosInstance } from "../../core/axios.conf"
import { joinToBaseURL } from "../../core/util"
import AppCtx from "../../context/AppCtx"

const AllProperties = ({ pptys, setPptys, title, squeeze, isAdminAccount, isUserAccount }: {
  pptys: PropertyFromServer[],
  setPptys: React.Dispatch<React.SetStateAction<PropertyFromServer[]>>
  title?: string,
  squeeze?: boolean,
  isAdminAccount?: boolean,
  isUserAccount?: boolean
}) => {
  const { user } = useContext(AppCtx)

  let url = '/api/properties'

  const getPptys = () => {
    axiosInstance.get(url)
      .then((value) => {
        let data = value.data.data
        setPptys([...data])
      })
  }
  const updateStatus = (pptyId: string, status: 'approved' | 'declined') => {
    axiosInstance.put(joinToBaseURL(`properties/${pptyId}?status=${status}`))
      .then(() => {
        getPptys()
      })
  }

  const handleApprove = (pptyId: string) => {
    if (confirm('Are you sure you want this ad to go live?')) {
      updateStatus(pptyId, 'approved')
    }
  }
  const handleDecline = (pptyId: string) => {
    if (confirm('Are you sure you want to reject this ad?')) {
      updateStatus(pptyId, 'declined')
    }
  }
  const handleDelete = (pptyId: string) => {
    if (confirm('Are you sure you want this ad to go live?')) {

      axiosInstance.delete(joinToBaseURL(`users/${user?.userId}/properties/${pptyId}`))
        .then(() => {
          getPptys()
        })
    }
  }


  return (
    <div className="mb-10" id="featured">
      {title && <ViewTitle title={title} className="mt-10 mb-6" />}
      <div className="grid w-full grid-cols-2 gap-y-6 md:grid-cols-3 lg:grid-cols-4 ">
        {
          pptys.map((ppty) => (
            <span key={ppty.id}>
              <PropertyCard
                key={ppty.id}
                id={ppty.id}
                category={ppty.category}
                imageURLs={ppty.images}
                title={ppty.title}
                price={`${ppty.price}`}
                state={ppty.state}
                username={ppty.username}
                status={ppty.status}
                squeeze={squeeze}
                isAdminAccount={isAdminAccount}
                isUserAccount={isUserAccount}
                handleApprove={handleApprove}
                handleDecline={handleDecline}
                handleDelete={handleDelete}
              />
            </span>
          ))
        }


      </div>
    </div>
  )
}

export default AllProperties