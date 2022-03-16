import "./style.css";

export default function TabNav(props) {
  return (
    <div>
      <div className="nav nav-tabs">
        {props.tabs.map((tab) => {
          const activeSelect = tab === props.selected ? "activeSelect" : "";
          return (
            <li className="nav-item" key={tab}>
              <div
                className={"tab-link " + activeSelect}
                onClick={() => props.SelectTab(tab)}
              >
                {tab}
              </div>
            </li>
          );
        })}
      </div>
      {props.children}
    </div>
  );
}
