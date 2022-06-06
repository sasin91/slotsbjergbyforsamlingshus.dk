import type { FunctionComponent, HTMLAttributes } from "react";
import { AppName } from "~/config";
import smileyImage from "~/images/1Smiley.png";

export const Smiley: FunctionComponent<HTMLAttributes<HTMLImageElement>> = (
  props: HTMLAttributes<HTMLImageElement>
) => {
  return <img {...props} src={smileyImage} alt={AppName} />;
};

export default Smiley;
