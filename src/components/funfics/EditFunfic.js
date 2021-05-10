import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FunficEditor from "./FunficEditor";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import { fetchFunficById, update } from "../../api/funficsApi";
import { AuthContext } from "../../contexts/AuthContext";

function EditFunfic() {
  const { id } = useParams();
  const [fetchedFunfic, setFetchedFunfic] = useState(undefined);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchFunficById(id)
      .then((funfic) => setFetchedFunfic(funfic))
      .catch(console.log);
  }, [id]);

  function withId(funfic) {
    funfic.id = id;
    return funfic;
  }

  function saveEditedFunfic(funfic) {
    if (auth.isAuthenticated) {
      update(withId(funfic), auth.token)
        .then((updatedFunfic) => console.log(`Updated funfic ${updatedFunfic.name}`))
        .catch(console.log);
    } else {
      console.log("Unauthenticated");
    }
  }

  function withTagsAsString(funfic) {
    return { ...funfic, tags: funfic.tags.join(" ") };
  }

  return fetchedFunfic ? (
    <FunficEditor
      onSaveFunfic={saveEditedFunfic}
      defaultFunficData={withTagsAsString(fetchedFunfic)}
    />
  ) : (
    <CustomSpinner />
  );
}

export default EditFunfic;
