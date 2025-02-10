import { useNavigate } from "react-router-dom";
import styles from './initial.module.css'
function Initial() {
    const navigate = useNavigate();
    return (<div className={styles.outer_initial} >
        <div className={styles.Initial_page}>
        <h1 className={styles.title}>VOXIFY</h1>
        <div className={styles.break}></div>
        <div className={styles.button}>
            <button className={styles.button_to_signup} onClick={() => { navigate("./signup") }}>Sign Up</button>
            <button className={styles.button_to_login} onClick={() => { navigate("./login") }}>Login</button>
        </div>
        </div>
        </div>)
};
export default Initial;