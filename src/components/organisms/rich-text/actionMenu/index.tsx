import styles from "./styles.module.scss";
import TrashIcon from "~/images/trash.svg";

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

interface Position {
  x: number;
  y: number;
}

interface Actions {
  turnInto: () => void;
  deleteBlock: () => void;
}

const ActionMenu: React.FC<{ position: Position; actions: Actions }> = ({ position, actions }) => {
  const x: number = position.x - MENU_WIDTH / 2;
  const y: number = position.y - MENU_HEIGHT - 10;
  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: y,
        left: x,
      }}
    >
      <div className={styles.menu}>
        <span
          id="turn-into"
          className={styles.menuItem}
          role="button"
          tabIndex={0}
          onClick={() => actions.turnInto()}
        >
          Turn into
        </span>
        <span
          id="delete"
          className={styles.menuItem}
          role="button"
          tabIndex={0}
          onClick={() => actions.deleteBlock()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, @next/next/no-img-element, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */}
          <img src={TrashIcon.src} alt="Trash Icon" />
        </span>
      </div>
    </div>
  );
};

export default ActionMenu;


