import type { ELibraryName } from "@/components/libraryPanel/types";

export interface IEditableInstancedLibraryComponentData {
  uuid: string;
  libraryName: ELibraryName;
  componentName: string;
}
