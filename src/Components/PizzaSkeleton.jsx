import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = () => (
    <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="120" r="121" /> 
    <rect x="0" y="295" rx="10" ry="10" width="280" height="80" /> 
    <rect x="0" y="401" rx="15" ry="15" width="95" height="30" /> 
    <rect x="133" y="396" rx="15" ry="15" width="144" height="45" /> 
    <rect x="0" y="254" rx="10" ry="10" width="280" height="22" />
  </ContentLoader>
)

export default PizzaSkeleton;