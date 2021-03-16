import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import FunficEditor from "./FunficEditor";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import {fetchFunficById, update} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";

function EditFunfic() {
  const {id} = useParams();
  const [fetchedFunfic, setFetchedFunfic] = useState(undefined);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchFunficById(id,
      funfic => setFetchedFunfic(funfic),
      error => console.log(error))
  }, [id])

  function withId(funfic) {
    funfic.id = id;
    return funfic;
  }

  function saveEditedFunfic(funfic) {
    if (auth.isAuthenticated) {
      update(withId(funfic),
        auth.token,
        () => console.log("Updated"),
        error => console.log(error))
    } else {
      console.log("Unauthenticated")
    }
  }

  function withTagsAsString(funfic) {
    return {...funfic, tags: funfic.tags.join(' ')};
  }

  return fetchedFunfic
    ? <FunficEditor onSaveFunfic={saveEditedFunfic}
                    defaultFunficData={withTagsAsString(fetchedFunfic)}/>
    : <CustomSpinner/>;
}

export default EditFunfic;