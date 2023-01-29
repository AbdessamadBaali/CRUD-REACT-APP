import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUserAction, updateUserAction, clearFilterUserAction,deleteUserAction
,filterUserAction} from "./config/action";
import { useState } from 'react';

function App() { 
  const users = useSelector(state=> state.users)
  const usersFilter = useSelector(state=> state.usersFilter)
  const villes = useSelector(state=> state.villes)
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedValueFilter, setSelectedValueFilter] = useState(1);
  const [id, setId] = useState(0);
  function handlerAddUser() {
    const userAdd = {
      id : users.length + 1,
      nom : nom,
      prenom: prenom,
      ville: parseInt(selectedValue)
    }
    dispatch(addUserAction(userAdd))

  }
  function handlerUpdateUser() {
    dispatch(updateUserAction( {
      id : id,
      nom : nom,
      prenom: prenom,
      ville: parseInt(selectedValue)
    }))
    handlerClear()
    setId(0)

  }

  function handlerClear() {
      setNom("")
      setPrenom("")
      setSelectedValue(1)
  }

  function handlerModifier(id) {
      let user = users.find( u => u.id === parseInt(id))
      setNom(user.nom)
      setPrenom(user.prenom)
      setSelectedValue(user.ville)
      setId(user.id)
  }
  function handlerFilter() {

      if(selectedValueFilter) {

        dispatch(filterUserAction({idVille:selectedValueFilter}));
      } 
  }


  return ( 
    <div className='border p-4 shadow  m-auto'>
      <h1>crud react redux app</h1>

      <div className="my-2">
        <label htmlFor="nom">Nom</label>
        <input value={nom} onChange={(e)=> setNom(e.target.value)} className='form-control' type="text" id='nom'/>
      </div>

      <div className="my-2">
        <label htmlFor="prenom">Prenom</label>
        <input value={prenom} onChange={(e)=> setPrenom(e.target.value)} className='form-control' type="text" id='prenom'/>
      </div>

      <div className="my-2">
        <label htmlFor="ville">Ville</label>
        <select  value={selectedValue} onChange={(e)=> setSelectedValue(e.target.value)} className='form-select'  id="ville">
          {
            villes.map((v,i) =>
              <option key={i} value={v.id}>{v.nom}</option>
              )
            }
        </select >
      </div>

      <div className="my-2 btn-group">
        {
          (id !== 0) ? <button onClick={handlerUpdateUser} className='btn btn-dark'>update </button>
          : <button onClick={handlerAddUser} className='btn btn-dark'>save </button>
        }
        
        <button onClick={handlerClear} className='btn btn-dark'>clear </button>
      </div>

      <div className="my-2">
        <label htmlFor="villef">filter par Ville : </label>
        <select onChange={(e) => setSelectedValueFilter(e.target.value)} className='form-select w-25 d-inline' name="" id="villef">
          {
            villes.map( (v,i) =>
              <option key={i} value={v.id}>{v.nom}</option>
              )
            }
        </select>
        <div className="mx-2 btn-group  d-inline">
          <button onClick={handlerFilter}  className='btn btn-dark'>filter </button>
          <button onClick={()=>dispatch(clearFilterUserAction())}  className='btn btn-dark'>clear </button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>id</th>
            <th>nom</th>
            <th>prenom</th>
            <th>ville</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            (usersFilter !== null) ?
            usersFilter.map((u,i) => {
                let vl = villes.find(elem => elem.id === u.ville)
                return <tr key={i}>
                  <td>{u.id}</td>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{vl.nom}</td>
                  <td className='btn-group' >
                    <button onClick={()=>handlerModifier(u.id)}  className='btn btn-success'>modifier </button>
                    <button onClick={()=>dispatch(deleteUserAction(u.id))}   className='btn btn-danger'>supprimer </button>
                  </td>
                </tr>
              } )
            : users.map((u,i) => {
              let vl = villes.find(elem => elem.id === u.ville)
              return <tr key={i}>
                <td>{u.id}</td>
                <td>{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{vl.nom}</td>
                <td className='btn-group' >
                  <button onClick={()=>handlerModifier(u.id)}  className='btn btn-success'>modifier </button>
                  <button onClick={()=>dispatch(deleteUserAction(u.id))}   className='btn btn-danger'>supprimer </button>
                </td>
              </tr>
            } )
           
          }
          
        </tbody>
      </table>

    </div>
  );
} 

export default App;
