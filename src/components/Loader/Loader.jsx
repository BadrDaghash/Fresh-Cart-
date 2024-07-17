import React from 'react'
import { Grid } from 'react-loader-spinner'; 

export default function Loader() {
  return (
    <>
       <div className="flex justify-center items-center h-screen">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#7234fa"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
    </>
  )
}
