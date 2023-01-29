export const addUserAction = (user) => {
    return {type : "Add_User", payload : user }
}
export const updateUserAction = (user) => {
    return {type : "Update_User", payload : user }
}
export const deleteUserAction = (id) => {
    return {type : "Delete_User", payload : id }
}
export const filterUserAction = (idVill) => {
    return {type : "Filter_User", payload : idVill }
}
export const clearFilterUserAction = () => {
    return {type : "Clear_Filter_User" }
}
