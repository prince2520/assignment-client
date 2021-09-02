import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/auth";
import {useDispatch, useSelector} from "react-redux";
import {folderActions} from "../../../store/folder";
import File from "./File/File";
import styles from './Folder.module.css'
import NoFile from "./NoFile/NoFile";

let serverUrl ='https://assignment-serv.herokuapp.com'

const Folder = () => {
    const authCtx = useContext(AuthContext);
    const folderData = useSelector(state=>state.folder.fileUrl);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchFile = async () =>{
            setIsLoading(true)
            fetch(`${serverUrl}/admin/folder?userID=${authCtx.userID}`)
                .then(res=>res.json())
                .then(result=> {
                    setIsLoading(false)

                    return result.drive.folder.map(file => {
                        return dispatch(folderActions.addFileHandler({
                            _id:file._id,
                            format:file.format,
                            fileUrl:file.fileUrl,
                            fileName:file.fileName
                        }));
                    })
                })
                .catch(err=>console.log(err))
        }
        if(folderData.length === 0){
            fetchFile()
        }

    },[authCtx.userID,dispatch,folderData.length]);

    return(
            <div className={styles.folderContainer}>
                {isLoading && <p>Loading...</p>}
                {folderData.length === 0 && !isLoading && <NoFile/>}
                {folderData.map(file=>{
                    return <File file={file}/>
                })}
            </div>
    )
}
export default Folder;
