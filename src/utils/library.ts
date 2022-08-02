import { v4 as uuidv4 } from "uuid";
import type { ILibraryComponent } from "@/library/types";
import type { IEditableInstancedLibraryComponentData } from "@/components/editPanel/types";

export const uuid = uuidv4;

export function createEditableInstancedLibraryComponentData(
  com: ILibraryComponent
): IEditableInstancedLibraryComponentData {
  return {
    uuid: uuidv4(),
    componentName: com.name,
    libraryName: com.libraryName,
  };
}
