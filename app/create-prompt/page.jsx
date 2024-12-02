'use client'
import { useSession } from 'next-auth/react'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () =>{
    const [submitting,setSubmitting] = useState(false) //* to check are we currently submitting the form
    const [post,setPost] = useState({
        prompt:'',
        tag:'',
    })

    const createPrompt = async (e) =>{

    }
    return(
       <Form
       type="Create"
       post={post}
       setPost = {setPost}
       submitting={submitting}
       handleSubmit = {createPrompt}
       
       />
    )
}

export default CreatePrompt