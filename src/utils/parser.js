import { EmptyDataError } from "./Errors";

const result = [];

const parseBtnBlock = (btntxt) => {
  const normalizedStr = btntxt
    .split("\n")
    .map((el) => {
      const withoutCommentsEl = el.match(/^(.*?)\/\//gm);
      return withoutCommentsEl ? withoutCommentsEl[0].slice(0, -2) : el;
    })
    .join("\n");

  const parseActions = (actionsArr) =>
    actionsArr
      .map((el) => el.trim())
      .reduce(
        (acc, el) => {
          const prefix = el.substring(0, 3);
          if (prefix === "{A}") {
            const [setName, actionName] = el
              .slice(4)
              .split("|")
              .map((el) => el.trim());
            acc.actions.push({ setName, actionName });
          }
          if (prefix === "{S}") {
            const script = el.slice(4).trim();
            acc.scripts.push(script);
          }

          return acc;
        },
        { actions: [], scripts: [] }
      );

  const [btnName, btnColor] = normalizedStr.match(/(?<=\[).+?(?=\])/gm);
  const btnDescription = normalizedStr
    .match(/[^\]]*$/gm)
    .join()
    .split("%standart%")[0]
    .trim();

  const standartActionsArr = normalizedStr
    .match(/%standart%([\s\S]*?)%expanded%/gm)[0]
    .split("\n")
    .slice(1, -1);
  const standartActions = parseActions(standartActionsArr);

  const expandedActionsArr = normalizedStr
    .match(/%expanded%([\s\S])*$/gm)[0]
    .split("\n")
    .slice(1);

  const expandedActions = parseActions(expandedActionsArr);

  return {
    id: `${btnName}${btnColor}`,
    name: btnName,
    color: btnColor,
    description: btnDescription,
    standartActions,
    expandedActions,
  };
};

const parse = (str) => {
  if (str.length === 0) {
    throw new EmptyDataError("Data is empty");
  }

  const trimmedStr = str
    .split("\n")
    .map((el) => el.trim())
    .join("\n");
  const buttonsArr = trimmedStr
    .split(/^(\[|\/\/\/)/gm)
    .reduce(
      (acc, el, index, arr) =>
        el === "[" || el === "///" ? [...acc, `${el}${arr[index + 1]}`] : acc,
      []
    )
    .map((el) => el.trim())
    .filter((el) => el.slice(0, 3) !== "///");

  buttonsArr.forEach((el) => {
    const parsedElement = parseBtnBlock(el);
    const alreadyExist = result.find(
      (curElId) => curElId.id === parsedElement.id
    );
    if (!alreadyExist) result.push(parsedElement);
  });

  return result;
};

export default parse;
