import { FaSpinner } from "react-icons/fa6";
import styles from "./Spinner.module.css"
export function Spinner(){
    return(
        <p className="spinner">
            <FaSpinner className={styles.icono}/>
        </p>
)}