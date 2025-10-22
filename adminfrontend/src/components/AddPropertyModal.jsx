// import React, { useState } from 'react'
// import { Stepper } from '@mantine/core'
// import { Container,Modal } from '@mantine/core'
// import AddLocation from './AddLocation'
// // import {useAuth0} from "@auth0/auth0-react"
// import UploadImage from './UploadImage'
// import BasicDetails from './BasicDetails'
// import Facilities from './Facilities'

// const AddPropertyModal = () => {
//     const [active, setActive] = useState(0)
//     // const {user} = useAuth0()
//     const [propertyDetails, setPropertyDetails] = useState({
//         title:"",
//         description:"",
//         price:0,
//         address:"",
//         img:null,
//         facilities:{
//             bedrooms:0,
//             bathrooms:0,
//             parkings:0
//         },
//         // userEmail: user?.email
//     })
//     const nextStep = () => {
//         setActive((current) => (current < 4 ? current + 1 : current))
//     }
//     const prevStep = () => {
//         setActive((current) => (current > 0 ? current - 1 : current))
//     }
//     return (
//          <Modal
//         //     opened={opened}
//         //     onClose={() => setOpened(false)}
//         //     closeOnClickOutside
//         //     size={"90rem"}
//          >
//             <Container h={"34rem"} w={"100%"} >
//                 <>
//                     <Stepper active={active} onStepClick={setActive}>
//                         <Stepper.Step label="Location" description="Location Details">
//                             <AddLocation
//                             nextStep={nextStep}
//                             propertyDetails={propertyDetails}
//                             setPropertyDetails={setPropertyDetails}
//                             />
//                         </Stepper.Step>
//                         <Stepper.Step label="Image" description="Upload">
//                             <UploadImage
//                             prevStep={prevStep}
//                             nextStep={nextStep}
//                             propertyDetails={propertyDetails}
//                             setPropertyDetails={setPropertyDetails}
//                             />
//                         </Stepper.Step>
//                         <Stepper.Step label="Basic" description="Details">
//                             <BasicDetails
//                             prevStep={prevStep}
//                             nextStep={nextStep}
//                             propertyDetails={propertyDetails}
//                             setPropertyDetails={setPropertyDetails}
//                             />
//                         </Stepper.Step>
//                         <Stepper.Step label="Facilities" description="Details">
//                             <Facilities
//                             prevStep={prevStep}
//                             propertyDetails={propertyDetails}
//                             setPropertyDetails={setPropertyDetails}
//                             // setOpened={setOpened}
//                             setActiveStep={setActive}
//                             />
//                         </Stepper.Step>
//                     </Stepper>
//                 </>
//             </Container>
//         </Modal>
//     )
// }
// export default AddPropertyModal;


import React, { useState } from 'react'
import { Stepper, Container } from '@mantine/core'
import AddLocation from './AddLocation'
import UploadImage from './UploadImage'
import BasicDetails from './BasicDetails'
import Facilities from './Facilities'

const AddPropertyModal = () => {
  const [active, setActive] = useState(0)
  
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    address: "",
    img: null,
    facilities: {
      bedrooms: 0,
      bathrooms: 0,
      parkings: 0
    },
  })

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <Container h={"34rem"} w={"100%"} mt="100px" pt="lg">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Location" description="Location Details">
          <AddLocation
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Image" description="Upload">
          <UploadImage
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Basic" description="Details">
          <BasicDetails
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Facilities" description="Details">
          <Facilities
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            setActiveStep={setActive}
          />
        </Stepper.Step>
      </Stepper>
    </Container>
  )
}

export default AddPropertyModal;