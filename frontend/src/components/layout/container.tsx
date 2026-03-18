import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Container({ children }: Props) {
  return <div className="container mx-auto px-2">{children}</div>;
}

export default Container;
