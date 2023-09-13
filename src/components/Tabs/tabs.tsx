import { useState } from "react";
import styles from "./tabs.module.scss";

export const Tabs = () => {  

  const [activeTab, setActiveTab]=useState<string>("Description")

  const toggleTabVisibility = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.tabs}>
      <ul>
        <li         
          onClick={() => toggleTabVisibility("Description")}
          className={activeTab === "Description" ? styles.active_tab : styles.not_active_tab}
        >
          Description          
        </li>
        <li         
          onClick={() => toggleTabVisibility("Authors")}
          className={activeTab === "Authors" ? styles.active_tab : styles.not_active_tab}
        >
          Authors
        </li>
        <li          
          onClick={() => toggleTabVisibility("Rewiews")}
          className={activeTab === "Rewiews" ? styles.active_tab : styles.not_active_tab}
        >
          Rewiews          
        </li>        
      </ul>
      <div id={styles.line}></div>
    </div>
  );
};