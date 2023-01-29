const initialstate = {
    villes : [
      {id: 1, nom: "azrou"},
      {id: 2, nom: "ifrane"},
      {id: 3, nom: "marakech"}
    ],
    users : [
      {id:1, nom: "baali",prenom: "abdessamad", ville: 1},
      {id:2, nom: "baali",prenom: "ahmaed", ville: 2},
    ],
    usersFilter : null
  }

export const reducteur = (state = initialstate, action) => {
    switch(action.type) {
        case "Add_User":
            return {...state, users:[...state.users, action.payload]}
        case "Update_User":
            const user = state.users.find(u => u.id === action.payload.id)
            if(user) {
                user.nom = action.payload.nom;
                user.prenom = action.payload.prenom;
                user.ville = action.payload.ville;
            }
            return state;
        case "Delete_User":
            return {...state, users: [...state.users.filter(u => u.id !== parseInt(action.payload))]}

        case "Filter_User":
            return {...state, usersFilter: [...state.users.filter(u => u.ville === parseInt(action.payload.idVille))]}

        case "Clear_Filter_User":
            return {...state, usersFilter: null}

        default:
            return state
    }
}
  