type GenerateAdminModuleFn = () => void;

type RmAdminModuleFn = () => void;

type AdminOtionsActions = {
  g: GenerateAdminModuleFn;
  Rm: RmAdminModuleFn;
};

type AdminFormContainer = "modal" | "drawer" | undefined;
