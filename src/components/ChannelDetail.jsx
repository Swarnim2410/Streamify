import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { fetchFromApi } from '../utils/fetchFromApi'
import {Videos,ChannelCard} from './'

const ChannelDetail = () => {

  const [channelDetail,setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const {id} = useParams();
  useEffect(() => {

    fetchFromApi(`channels?part=snippet&id=${id}`).
    then((data)=> setChannelDetail(data?.items[0]));

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).
    then((data)=> setVideos(data?.items));
  }, [id])
  
  return (
    <Box minHeight='95vh'>
    <Box>
      <div style = {{
        background:'linear-gradient(90deg, rgba(0,17,36,1) 0%, rgba(9,17,121,0.7148984593837535) 35%, rgba(0,35,255,0.6280637254901961) 100%)',
        zIndex:10,
        height:'300px'
      }} 
      />
      <ChannelCard channelDetail={channelDetail}
        marginTop='-110px' />
    </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos ={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail