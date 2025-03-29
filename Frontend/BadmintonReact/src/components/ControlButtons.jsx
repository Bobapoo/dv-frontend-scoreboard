import styles from "../styles/scoreboard.module.css";

export const ControlButtons = ({ reset, handleToggleTheme, darkMode }) => {
    return (
    <>
        <button onClick={reset} className={styles.resetButton}>Reset Match</button>
        <button onClick={handleToggleTheme} className={styles.toggleButton}>
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    </>
    );
};

export default ControlButtons;