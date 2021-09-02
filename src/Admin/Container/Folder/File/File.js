import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage,faVideo,faVolumeUp,faTrash,faShare} from '@fortawesome/free-solid-svg-icons'
import {storage} from '../../../../firebase'

import styles from './File.module.css'
import {useContext} from "react";
import AuthContext from "../../../../context/auth";
import {useDispatch, useSelector} from "react-redux";
import {folderActions} from "../../../../store/folder";
import Share from "./Share/Share";
import {helperActions} from "../../../../store/helper";

let serverUrl ='https://assignment-serv.herokuapp.com'

const File = (props) => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const showShare = useSelector(state => state.helper.showShare)

    let icon ;

    if(props.file.format === 'video'){
        console.log(props.file.format === 'video')
        icon = faVideo
    }else if(props.file.format === 'image'){
        icon = faImage
    }else if(props.file.format === 'audio'){
        icon = faVolumeUp
    }

    const deleteFileHandler = () => {
        console.log('Clicked')
        const fileRef = storage.refFromURL(props.file.fileUrl)
        fileRef.delete().then(()=> {
            fetch(`${serverUrl}/admin/deleteFile?userID=${authCtx.userID}&&fileID=${props.file._id}`,{
                method:'DELETE',
                headers: {
                    Authorization: 'Bearer ' + authCtx.token
                }
            }).then(()=>{
                dispatch(folderActions.deleteFileHandler({_id:props.file._id}))
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=> {
            console.log(err)
        })
    }

    return (
        <div className={styles.fileContainer} key={props.file.key}>
            {showShare && <Share link={props.file.fileUrl}/>}
            <FontAwesomeIcon  icon={icon} size="2x" color="#ee4c74"/>
            <p style={{color:'gray'}}>{props.file.fileName}</p>
            <div className={styles.fileAction}>
                <FontAwesomeIcon onClick={deleteFileHandler} icon={faTrash} size="2x" color="#ee4c74" />
                <FontAwesomeIcon onClick={()=> {
                    dispatch(helperActions.shareLinkHandler(props.file.fileUrl))
                    dispatch(helperActions.showShareHandler())
                }} icon={faShare}  size="2x" color="#ee4c74" />
            </div>
        </div>
    )
}

export default File;
