import React from 'react'
import CreateBlogContainer from "../../containers/CreateBlogContainer/CreateBlogContainer";

const CreateElementsPage = () => (
  <div className="df-column padding-20">
    <CreateBlogContainer />
  </div>
)

export default React.memo(CreateElementsPage)
