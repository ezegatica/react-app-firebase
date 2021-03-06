
export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorUUID = getState().firebase.auth.uid;
        firestore.collection('proyectos').add({
            ...project,
            autorNombre: profile.nombre,
            autorApellido: profile.apellido,
            autorUUID: autorUUID,
            createdAt: new Date(),
            autorAdmin: profile.isAdmin
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'CREATE_PROJECT_ERROR', err})
        })
        
    }
};

export const editProject = (project) =>{
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        // console.log("dispatched: ", project)
        // console.log("titulo nuevo: ", project.title)
        // console.log("contenido nuevo: ", project.content)
        // console.log("id proyecto a editar: ", project.id)
        firestore.collection('proyectos').doc(project.id).update({
            title: project.title,
            content: project.content
        }).then(() => {
            dispatch({type:'EDIT_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'EDIT_PROJECT_ERROR', err})
        })
    }
}
