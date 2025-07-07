export interface PromptPrimitive {
  id: string;
  name: string;
  template: string;
  description?: string;
  version: number;
  isDefault: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
