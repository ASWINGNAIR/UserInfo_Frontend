import { commonApi } from "./commonApi"
import {serverUrl} from './serverUrl'

// api for user registration

export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/usersReg`,reqBody)
}

// api to get data

export const getDataApi = async()=>{
    return await commonApi('GET',`${serverUrl}/usersReg`,"")
}

// api to delete data

export const deleteDataApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/usersReg/${id}`,{})
}

// api to edit data

export const editDataApi = async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/usersReg/${id}`,reqBody)
}