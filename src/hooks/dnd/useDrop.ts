import { useEffect, useRef } from "react";


// this is to some extent inspired from react-dnd
export default function useDrop(name: string, dropHandler: (jsonStr: string) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.ondragover = (e: DragEvent) => {
        e.preventDefault();
      };

      ref.current.ondrop = (e: DragEvent) => {
        e.preventDefault();
        dropHandler(e.dataTransfer?.getData(name) ?? "");
      };
    }
  }, [name, dropHandler]);

  return ref;
}
