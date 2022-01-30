import saveUiSettings from "../utils/saveUiSettings";

const changeImportantBtnsIds = (btnid, isExpanded) => {
  return {
    type: isExpanded ? "changeImportantBtnsIdsExpanded" : "changeImportantBtnsIds",
    payload: btnid,
  };
};

export default changeImportantBtnsIds;
