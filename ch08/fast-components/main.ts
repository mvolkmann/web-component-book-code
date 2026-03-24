import {
  provideFASTDesignSystem,
  fastCombobox,
  fastOption,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(fastCombobox(), fastOption());
