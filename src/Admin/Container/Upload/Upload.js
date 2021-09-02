import {useContext, useRef, useState} from "react";
import styles from './Upload.module.css';
import {storage} from '../../../firebase'
import AuthContext from "../../../context/auth";
import {useDispatch} from "react-redux";
import {folderActions} from "../../../store/folder";

let serverUrl ='https://assignment-serv.herokuapp.com'

const Upload = () => {
    const [file, setFile] = useState();
    const [fileType, setFileType] = useState();

    const authCtx = useContext(AuthContext)
    const fileRef = useRef();
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(0)


    const uploadFileHandler = () => {
        if (file) {
            console.log(file.name)
            let uploadFile = storage.ref(`${authCtx.username}/${file.name}`).put(file)
            uploadFile.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                    setProgress(progress)
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref(`${authCtx.username}`)
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            throw fetch(`${serverUrl}/admin/upload`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + authCtx.token
                                },
                                body: JSON.stringify({
                                    fileName: file.name,
                                    fileType: fileType,
                                    fileUrl: url,
                                    token: authCtx.token,
                                    userID: authCtx.userID
                                })
                            }).then(res=>{
                                return res.json()
                            }).then(result=>{
                                console.log(result)

                                     dispatch(folderActions.addFileHandler({
                                         _id:result.file._id,
                                         format:result.file.format,
                                         fileUrl:result.file.fileUrl,
                                         fileName:result.file.fileName
                                     }))
                                    console.log(result.file)

                                console.log('upload response', result)
                                })

                        })
                })
        }else {
            console.log('nofile')
        }
    }

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.browseContainer}>
                <button onClick={() => fileRef.current.click()}> Choose</button>
                {file && <p >{file.name}</p>}
            </div>
            <input accept='audio/*, video/*, image/*' ref={fileRef} style={{display: 'none'}} type="file"
                   onChange={event => {
                       setFile(event.target.files[0])
                       if(event.target.files[0].type){
                           setFileType(event.target.files[0].type.substr(0,5))
                       }
                   }}/>
            {(progress !== 0 && progress !== 100) && <p>Uploading... {progress}%</p>}
            <button onClick={()=>uploadFileHandler()}>Upload</button>
        </div>
    )
};


export default Upload;
