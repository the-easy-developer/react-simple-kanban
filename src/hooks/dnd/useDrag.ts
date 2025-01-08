import { useEffect, useRef } from "react";

import type { DnDTransferData } from "../../types";


// this is to some extent inspired from react-dnd
export default function useDrag(name: string, data: DnDTransferData) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.draggable = true;
      
      ref.current.ondragstart = (e: DragEvent) => {
        e.dataTransfer?.setData(name, JSON.stringify(data));
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, data.title, data.tag]);

  return ref;
}
