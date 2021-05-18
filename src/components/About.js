import { Button } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import Tags from "./Tags.js";

const About = () => {
  const [openTag, setOpenTag] = React.useState(false);
  const [addTag, setAddTag] = useState([]);

  const handleOpen = () => {
    setOpenTag(true);
  };

  return (
    <Fragment>
      <h1>About</h1>
      <Tags
        openTag={openTag}
        setOpenTag={setOpenTag}
        addTag={addTag}
        setAddTag={setAddTag}
      />
      <div style={{ margin: "200px" }}>
        <Button onClick={handleOpen} color="primary">
          Add Tag
        </Button>
      </div>
    </Fragment>
  );
};

export default About;
