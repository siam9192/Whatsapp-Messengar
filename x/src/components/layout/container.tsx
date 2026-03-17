import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Container({ children }: Props) {
  return <div className="container mx-auto">{children}</div>;
}

export default Container;
