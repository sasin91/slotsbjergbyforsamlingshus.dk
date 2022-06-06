import type { FunctionComponent, HTMLAttributes } from "react";
import { AppName } from "~/config";
import logoImage from "~/images/Slotsbjergby-festhus-final.jpg";

export const Logo: FunctionComponent<HTMLAttributes<HTMLImageElement>> = (
  props: HTMLAttributes<HTMLImageElement>
) => {
  return <img {...props} src={logoImage} alt={AppName} />;
};

export default Logo;
