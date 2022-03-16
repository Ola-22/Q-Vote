import "./style.css";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

export default function SkeletonArticle() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-article">
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <div style={{ display: "flex" }}>
          <SkeletonElement type="avatar" />
          <div style={{ width: "100%", marginRight: "5px" }}>
            <SkeletonElement type="titlesk" />
            <SkeletonElement type="titlesk" />
          </div>
        </div>
      </div>
      <Shimmer />
    </div>
  );
}
