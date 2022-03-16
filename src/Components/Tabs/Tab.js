export default function Tab(props) {
  if (props.isSelected) {
    return <div className="tab">{props.children}</div>;
  }
  return null;
}
